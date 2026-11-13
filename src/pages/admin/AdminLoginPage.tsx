import React, { useState } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowLeft, KeyRound, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ToastContainer } from '../../components/common/Toast';

export const AdminLoginPage: React.FC = () => {
  const { isAdmin, login, isLoading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (isAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleFillDemo = () => {
    setEmail('admin@caoductienthanh.com');
    setPassword('admin123456');
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Vui lòng nhập email và mật khẩu.');
      return;
    }

    setSubmitting(true);
    setError('');

    const res = await login(email.trim(), password.trim());
    if (res.success) {
      navigate('/admin/dashboard');
    } else {
      setError(res.error || 'Đăng nhập không thành công.');
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-pastel-bg flex items-center justify-center p-4 relative">
      <ToastContainer />

      {/* Background blueprint details */}
      <div className="absolute inset-0 blueprint-grid opacity-40 pointer-events-none" />

      <div className="relative w-full max-w-md bg-white rounded-3xl p-7 sm:p-9 shadow-soft-lg border border-pastel-border space-y-6">
        
        {/* Top Back Link */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-pastel-subtext hover:text-pastel-deep transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Về Portfolio</span>
          </Link>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-pastel-light/60 text-pastel-deep font-bold">
            CMS v2.0
          </span>
        </div>

        {/* Header */}
        <div className="space-y-2 text-center">
          <div className="w-14 h-14 rounded-2xl bg-pastel-deep text-white flex items-center justify-center mx-auto shadow-soft">
            <Shield className="w-7 h-7 text-pastel-primary" />
          </div>
          <h1 className="text-2xl font-black text-pastel-text tracking-tight">
            Đăng Nhập Quản Trị Viên
          </h1>
          <p className="text-xs text-pastel-subtext max-w-xs mx-auto">
            Quản lý toàn bộ nội dung, công cụ, chứng chỉ và album bảo mật của Cao Đức Tiến Thành
          </p>
        </div>

        {/* Demo Fast Login Helper */}
        <div className="p-3.5 rounded-2xl bg-pastel-light/40 border border-pastel-primary/40 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-pastel-deep font-bold">Tài khoản mặc định:</span>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-pastel-accent hover:underline font-semibold text-[11px]"
            >
              Nhấn để điền nhanh
            </button>
          </div>
          <p className="text-[11px] font-mono text-pastel-text">
            Email: <code className="bg-white px-1.5 py-0.5 rounded text-pastel-deep">admin@caoductienthanh.com</code><br/>
            Pass: <code className="bg-white px-1.5 py-0.5 rounded text-pastel-deep">admin123456</code>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-pastel-text uppercase tracking-wide font-mono mb-1">
              Email Quản trị
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-pastel-subtext absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder="admin@caoductienthanh.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-pastel-border focus:border-pastel-accent outline-none text-sm bg-pastel-bg/50 text-pastel-text"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-pastel-text uppercase tracking-wide font-mono mb-1">
              Mật khẩu
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-pastel-subtext absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-pastel-border focus:border-pastel-accent outline-none text-sm bg-pastel-bg/50 text-pastel-text"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting || isLoading}
            className="w-full py-3.5 rounded-xl bg-pastel-deep text-white text-sm font-semibold hover:bg-pastel-text transition-all duration-200 shadow-soft flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <KeyRound className="w-4 h-4" />
            <span>{submitting ? 'Đang xác thực...' : 'Đăng nhập vào CMS'}</span>
          </button>
        </form>

        <p className="text-center text-[11px] text-pastel-subtext">
          Hệ thống xác thực hỗ trợ cả Supabase Auth và Local Storage Offline Session
        </p>
      </div>
    </div>
  );
};
