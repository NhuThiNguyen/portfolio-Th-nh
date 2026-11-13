import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { showToast } from '../lib/utils';

interface AuthContextType {
  isAdmin: boolean;
  isLoading: boolean;
  adminEmail: string | null;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isAdmin: false,
  isLoading: true,
  adminEmail: null,
  login: async () => ({ success: false }),
  logout: async () => {},
});

const DEFAULT_ADMIN_EMAIL = import.meta.env.VITE_ADMIN_DEFAULT_EMAIL || 'admin@caoductienthanh.com';
const DEFAULT_ADMIN_PASS = import.meta.env.VITE_ADMIN_DEFAULT_PASSWORD || 'admin123456';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        if (isSupabaseConfigured && supabase) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            setIsAdmin(true);
            setAdminEmail(session.user.email || null);
          } else {
            // Check local fallback
            checkLocalAdminSession();
          }

          supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
              setIsAdmin(true);
              setAdminEmail(session.user.email || null);
            } else {
              checkLocalAdminSession();
            }
          });
        } else {
          checkLocalAdminSession();
        }
      } catch (err) {
        console.error('Auth verification error:', err);
        checkLocalAdminSession();
      } finally {
        setIsLoading(false);
      }
    }

    function checkLocalAdminSession() {
      const stored = localStorage.getItem('thanh_admin_session');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.email) {
            setIsAdmin(true);
            setAdminEmail(parsed.email);
            return;
          }
        } catch {
          localStorage.removeItem('thanh_admin_session');
        }
      }
      setIsAdmin(false);
      setAdminEmail(null);
    }

    checkAuth();
  }, []);

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password: pass,
        });

        if (error) {
          // If Supabase rejects, try local fallback for development ease
          if (email === DEFAULT_ADMIN_EMAIL && pass === DEFAULT_ADMIN_PASS) {
            localStorage.setItem('thanh_admin_session', JSON.stringify({ email, loggedInAt: Date.now() }));
            setIsAdmin(true);
            setAdminEmail(email);
            showToast('Đăng nhập Quản trị viên thành công (chế độ dự phòng)', 'success');
            return { success: true };
          }
          return { success: false, error: error.message };
        }

        if (data.user) {
          setIsAdmin(true);
          setAdminEmail(data.user.email || null);
          showToast('Đăng nhập Quản trị viên thành công', 'success');
          return { success: true };
        }
      } else {
        // Fallback local authentication
        if (email === DEFAULT_ADMIN_EMAIL && pass === DEFAULT_ADMIN_PASS) {
          localStorage.setItem('thanh_admin_session', JSON.stringify({ email, loggedInAt: Date.now() }));
          setIsAdmin(true);
          setAdminEmail(email);
          showToast('Đăng nhập Quản trị viên thành công', 'success');
          return { success: true };
        } else {
          return { success: false, error: 'Email hoặc mật khẩu quản trị viên không chính xác.' };
        }
      }
      return { success: false, error: 'Thông tin đăng nhập không hợp lệ.' };
    } catch (e: any) {
      return { success: false, error: e.message || 'Lỗi đăng nhập.' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        await supabase.auth.signOut();
      }
      localStorage.removeItem('thanh_admin_session');
      setIsAdmin(false);
      setAdminEmail(null);
      showToast('Đã đăng xuất khỏi phiên quản trị', 'info');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAdmin, isLoading, adminEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
