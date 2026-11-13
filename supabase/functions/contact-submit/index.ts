// Supabase Edge Function: contact-submit
// Handles contact message validation, sanitization, insertion, and activity logging

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { name, email, phone, subject, message } = await req.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return new Response(
        JSON.stringify({ success: false, message: "Họ tên, email và tin nhắn là bắt buộc." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return new Response(
        JSON.stringify({ success: false, message: "Địa chỉ email không hợp lệ." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert into contact_messages
    const { data, error } = await supabase
      .from("contact_messages")
      .insert({
        name: name.trim().slice(0, 100),
        email: email.trim().slice(0, 150),
        phone: phone ? phone.trim().slice(0, 30) : null,
        subject: subject ? subject.trim().slice(0, 200) : null,
        message: message.trim().slice(0, 3000),
        is_read: false,
      })
      .select()
      .single();

    if (error) {
      return new Response(
        JSON.stringify({ success: false, message: error.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Log activity
    await supabase.from("activity_logs").insert({
      action: `Tin nhắn mới từ ${data.name} (${data.email})`,
      entity_type: "Contact",
      entity_id: data.id,
      details: { subject: data.subject },
    });

    return new Response(
      JSON.stringify({ success: true, message: "Tin nhắn đã được gửi thành công!", id: data.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, message: err.message || "Lỗi xử lý yêu cầu." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
