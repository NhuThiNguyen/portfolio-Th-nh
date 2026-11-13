import React, { useState } from 'react';
import { Navigate, Outlet, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AdminSidebar } from '../../components/layout/AdminSidebar';
import { ToastContainer } from '../../components/common/Toast';
import { Menu, X, ArrowLeft, Shield } from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { isAdmin, isLoading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-pastel-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-pastel-deep text-white flex items-center justify-center font-bold text-sm animate-pulse">
            TT
          </div>
          <span className="font-mono text-xs text-pastel-subtext">Đang kiểm tra quyền quản trị...</span>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-pastel-bg text-pastel-text">
      <ToastContainer />

      {/* Mobile Top Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 h-16 bg-white border-b border-pastel-border px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-xl text-pastel-text hover:bg-pastel-bg"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <span className="font-bold text-sm text-pastel-text">CMS Dashboard</span>
        </div>
        <Link
          to="/"
          className="text-xs font-semibold text-pastel-deep flex items-center gap-1 bg-pastel-light/60 px-2.5 py-1.5 rounded-lg"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Trang chủ</span>
        </Link>
      </div>

      {/* Admin Sidebar */}
      <AdminSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-pastel-deep/40 backdrop-blur-xs"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Admin Content Area */}
      <main className="lg:pl-64 pt-16 lg:pt-0 min-h-screen">
        <div className="p-4 sm:p-8 max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
