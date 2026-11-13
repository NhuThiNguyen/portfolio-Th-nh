import React from 'react';
import {
  LayoutDashboard,
  UserCheck,
  GraduationCap,
  Wrench,
  Cpu,
  Award,
  Heart,
  FileText,
  Image as ImageIcon,
  FolderLock,
  Settings,
  ArrowLeft,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface AdminNavItem {
  to: string;
  label: string;
  icon: React.ElementType;
}

const ADMIN_NAV: AdminNavItem[] = [
  { to: '/admin/dashboard', label: 'Tổng quan (Dashboard)', icon: LayoutDashboard },
  { to: '/admin/profile', label: 'Hồ sơ cá nhân', icon: UserCheck },
  { to: '/admin/education', label: 'Học vấn & Bằng cấp', icon: GraduationCap },
  { to: '/admin/skills', label: 'Kỹ năng & AutoCAD', icon: Wrench },
  { to: '/admin/tools', label: 'Công cụ tự phát triển', icon: Cpu },
  { to: '/admin/certificates', label: 'Chứng chỉ (TOEIC 600)', icon: Award },
  { to: '/admin/interests', label: 'Sở thích & Đời sống', icon: Heart },
  { to: '/admin/posts', label: 'Bài viết (Journal)', icon: FileText },
  { to: '/admin/media', label: 'Thư viện Media', icon: ImageIcon },
  { to: '/admin/albums', label: 'Album & Kỷ niệm bảo mật', icon: FolderLock },
  { to: '/admin/settings', label: 'Tin nhắn & Cài đặt', icon: Settings },
];

export const AdminSidebar: React.FC<{ mobileOpen?: boolean; setMobileOpen?: (open: boolean) => void }> = ({
  mobileOpen = false,
  setMobileOpen,
}) => {
  const location = useLocation();
  const { logout, adminEmail } = useAuth();

  return (
    <aside
      className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-white border-r border-pastel-border flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div>
        {/* Top Header */}
        <div className="p-5 border-b border-pastel-border flex items-center justify-between">
          <Link to="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pastel-deep text-white flex items-center justify-center font-bold text-sm shadow-xs">
              TT
            </div>
            <div>
              <span className="font-extrabold text-sm text-pastel-text block leading-tight">
                CMS Quản Trị
              </span>
              <span className="text-[10px] font-mono text-pastel-accent font-semibold">
                CAO ĐỨC TIẾN THÀNH
              </span>
            </div>
          </Link>
        </div>

        {/* Back to main website link */}
        <div className="p-3">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-pastel-deep bg-pastel-light/40 hover:bg-pastel-light transition-colors border border-pastel-primary/30"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Xem trang Portfolio chính</span>
            <ExternalLink className="w-3 h-3 ml-auto text-pastel-subtext" />
          </Link>
        </div>

        {/* Nav Links */}
        <nav className="px-3 py-2 space-y-1 overflow-y-auto max-h-[calc(100vh-220px)]">
          {ADMIN_NAV.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to;

            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen && setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-pastel-deep text-white font-semibold shadow-xs'
                    : 'text-pastel-subtext hover:text-pastel-text hover:bg-pastel-bg'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-pastel-subtext'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Admin User & Logout */}
      <div className="p-4 border-t border-pastel-border bg-pastel-bg/50 space-y-2">
        <div className="text-[11px] font-mono text-pastel-subtext truncate">
          <span className="block text-[9px] uppercase font-bold text-pastel-accent">ĐÃ ĐĂNG NHẬP</span>
          <span className="truncate">{adminEmail || 'Quản trị viên'}</span>
        </div>
        <button
          onClick={logout}
          className="w-full py-2 px-3 rounded-xl border border-rose-200 text-rose-700 bg-rose-50/50 hover:bg-rose-100 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
};
