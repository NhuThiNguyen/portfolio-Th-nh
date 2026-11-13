import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck, AlertCircle, X } from 'lucide-react';
import { DataStore } from '../../lib/dataStore';
import { showToast } from '../../lib/utils';

interface UnlockAlbumModalProps {
  isOpen: boolean;
  onClose: () => void;
  albumId: string;
  albumTitle: string;
  onSuccess: () => void;
}

export const UnlockAlbumModal: React.FC<UnlockAlbumModalProps> = ({
  isOpen,
  onClose,
  albumId,
  albumTitle,
  onSuccess,
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setErrorMessage('Vui lòng nhập mật khẩu truy cập.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const res = await DataStore.unlockAlbum(albumId, password.trim());
      if (res.success) {
        showToast('Mở khóa album thành công!', 'success');
        setPassword('');
        onSuccess();
        onClose();
      } else {
        setErrorMessage(res.message || 'Mật khẩu không chính xác.');
      }
    } catch {
      setErrorMessage('Đã xảy ra lỗi khi xác thực mật khẩu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-pastel-deep/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-pastel-border animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-pastel-subtext hover:text-pastel-deep p-1.5 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-pastel-light/60 flex items-center justify-center text-pastel-deep">
            <Lock className="w-6 h-6 text-pastel-accent" />
          </div>
          <div>
            <span className="text-xs font-mono font-medium text-pastel-accent uppercase tracking-wider">
              Bảo mật riêng tư
            </span>
            <h3 className="text-lg font-bold text-pastel-text line-clamp-1">{albumTitle}</h3>
          </div>
        </div>

        <p className="text-sm text-pastel-subtext mb-6">
          Album này được bảo vệ bằng mật khẩu riêng. Bạn không cần tài khoản, chỉ cần nhập mật khẩu được cung cấp bởi chủ sở hữu.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-pastel-text mb-1.5 uppercase tracking-wide">
              Mật khẩu album
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMessage('');
                }}
                placeholder="Nhập mật khẩu (ví dụ demo: 123456)"
                className="w-full px-4 py-3 rounded-xl border border-pastel-border focus:border-pastel-accent focus:ring-2 focus:ring-pastel-accent/20 outline-none text-sm bg-pastel-bg/50 transition-all text-pastel-text placeholder:text-pastel-subtext/60"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-pastel-subtext hover:text-pastel-deep p-1"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {errorMessage && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-pastel-border text-pastel-text text-sm font-medium hover:bg-pastel-bg transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 rounded-xl bg-pastel-deep text-white text-sm font-medium hover:bg-pastel-text transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
            >
              <ShieldCheck className="w-4 h-4" />
              {loading ? 'Đang xác thực...' : 'Mở khóa'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
