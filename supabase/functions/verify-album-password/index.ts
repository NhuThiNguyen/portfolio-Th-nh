// Supabase Edge Function: verify-album-password
// Handles server-side password verification, rate limiting, and short-lived session token generation

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// In-memory rate limiting map (IP / Album key)
const rateLimits = new Map<string, { attempts: number; resetAt: number }>();

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { albumId, password } = await req.json();

    if (!albumId || !password) {
      return new Response(
        JSON.stringify({ success: false, message: "Album ID và mật khẩu là bắt buộc." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const clientIp = req.headers.get("x-forwarded-for") || "unknown";
    const rateKey = `${clientIp}_${albumId}`;
    const now = Date.now();
    const rateRecord = rateLimits.get(rateKey);

    // Rate Limiting: Max 5 failed attempts per 60 seconds
    if (rateRecord && rateRecord.resetAt > now && rateRecord.attempts >= 5) {
      const waitSeconds = Math.ceil((rateRecord.resetAt - now) / 1000);
      return new Response(
        JSON.stringify({
          success: false,
          message: `Quá nhiều lần thử sai. Vui lòng thử lại sau ${waitSeconds} giây.`,
        }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Call PostgreSQL stored procedure verify_album_password
    const { data, error } = await supabase.rpc("verify_album_password", {
      p_album_id: albumId,
      p_password: password,
    });

    if (error) {
      return new Response(
        JSON.stringify({ success: false, message: error.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!data.success) {
      // Record failed attempt
      const attempts = (rateRecord?.attempts || 0) + 1;
      rateLimits.set(rateKey, { attempts, resetAt: now + 60 * 1000 });

      return new Response(
        JSON.stringify({ success: false, message: data.message || "Mật khẩu không chính xác." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Reset rate limit on success
    rateLimits.delete(rateKey);

    return new Response(
      JSON.stringify({
        success: true,
        session_token: data.session_token,
        expires_at: data.expires_at,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, message: err.message || "Lỗi xử lý yêu cầu." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
