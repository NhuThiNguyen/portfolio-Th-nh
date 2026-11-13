import React, { useState, useEffect } from 'react';
import {
  FileText,
  Image as ImageIcon,
  Cpu,
  Award,
  FolderLock,
  Mail,
  Activity,
  ArrowRight,
  Plus,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { DataStore } from '../../lib/dataStore';
import { DashboardStats, ActivityLog } from '../../types';
import { formatDate } from '../../lib/utils';

export const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [s, l] = await Promise.all([
          DataStore.getDashboardStats(),
          DataStore.getActivityLogs(),
        ]);
        setStats(s);
        setLogs(l);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  if (loading || !stats) {
    return (
      <div className="py-12 flex justify-center text-pastel-subtext text-sm font-mono">
        Đang tải dữ liệu thống kê hệ thống...
      </div>
    );
  }

  const statCards = [
    { title: 'Bài viết (Journal)', count: stats.totalPosts, icon: FileText, to: '/admin/posts', color: 'bg-pastel-light/60 text-pastel-deep' },
    { title: 'Tệp Media', count: stats.totalMedia, icon: ImageIcon, to: '/admin/media', color: 'bg-emerald-50 text-emerald-700' },
    { title: 'Công cụ phát triển', count: stats.totalTools, icon: Cpu, to: '/admin/tools', color: 'bg-sky-50 text-sky-700' },
    { title: 'Chứng chỉ (TOEIC 600)', count: stats.totalCertificates, icon: Award, to: '/admin/certificates', color: 'bg-amber-50 text-amber-700' },
    { title: 'Album kỷ niệm', count: stats.totalAlbums, icon: FolderLock, to: '/admin/albums', color: 'bg-purple-50 text-purple-700' },
    { title: 'Tin nhắn liên hệ', count: stats.totalMessages, icon: Mail, to: '/admin/settings', color: 'bg-rose-50 text-rose-700', badge: stats.unreadMessages > 0 ? `${stats.unreadMessages} mới` : undefined },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white border border-pastel-border shadow-soft">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-pastel-accent uppercase">
            <span>BẢNG ĐIỀU KHIỂN HỆ THỐNG</span>
            <span>•</span>
            <span>CAO ĐỨC TIẾN THÀNH</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-pastel-text">
            Chào mừng trở lại, Quản trị viên
          </h1>
          <p className="text-xs sm:text-sm text-pastel-subtext">
            Toàn bộ thông tin cá nhân, học vấn, kỹ năng, công cụ và album kỷ niệm đều có thể cập nhật trực tiếp tại đây mà không cần sửa mã nguồn.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            target="_blank"
            className="px-4 py-2.5 rounded-xl border border-pastel-border bg-pastel-bg text-pastel-deep hover:bg-pastel-light/50 text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <span>Mở website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Real Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              to={card.to}
              className="p-6 rounded-2xl bg-white border border-pastel-border hover:border-pastel-primary shadow-xs transition-all group hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                {card.badge && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white animate-pulse">
                    {card.badge}
                  </span>
                )}
              </div>

              <div className="mt-4">
                <span className="text-3xl font-black text-pastel-text block font-mono">
                  {card.count}
                </span>
                <span className="text-xs font-medium text-pastel-subtext mt-1 block">
                  {card.title}
                </span>
              </div>

              <div className="mt-3 pt-3 border-t border-pastel-border/60 flex items-center justify-between text-xs font-semibold text-pastel-deep group-hover:text-pastel-accent">
                <span>Quản lý</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* 2-Column: Quick Action Links & Activity Log */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Quick Management Links (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-pastel-border shadow-xs space-y-4">
          <h2 className="text-base font-bold text-pastel-text flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-pastel-accent" />
            <span>Thao tác nhanh</span>
          </h2>

          <div className="space-y-2">
            <Link
              to="/admin/posts"
              className="flex items-center justify-between p-3 rounded-xl bg-pastel-bg/60 hover:bg-pastel-light/40 transition-colors text-xs font-semibold text-pastel-text"
            >
              <span className="flex items-center gap-2">
                <Plus className="w-4 h-4 text-pastel-accent" />
                Viết bài mới cho Journal
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-pastel-subtext" />
            </Link>

            <Link
              to="/admin/tools"
              className="flex items-center justify-between p-3 rounded-xl bg-pastel-bg/60 hover:bg-pastel-light/40 transition-colors text-xs font-semibold text-pastel-text"
            >
              <span className="flex items-center gap-2">
                <Plus className="w-4 h-4 text-pastel-accent" />
                Thêm công cụ tự phát triển mới
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-pastel-subtext" />
            </Link>

            <Link
              to="/admin/albums"
              className="flex items-center justify-between p-3 rounded-xl bg-pastel-bg/60 hover:bg-pastel-light/40 transition-colors text-xs font-semibold text-pastel-text"
            >
              <span className="flex items-center gap-2">
                <FolderLock className="w-4 h-4 text-pastel-accent" />
                Tạo Album có mật khẩu bảo vệ
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-pastel-subtext" />
            </Link>

            <Link
              to="/admin/profile"
              className="flex items-center justify-between p-3 rounded-xl bg-pastel-bg/60 hover:bg-pastel-light/40 transition-colors text-xs font-semibold text-pastel-text"
            >
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-pastel-accent" />
                Cập nhật thông tin liên hệ & Giới thiệu
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-pastel-subtext" />
            </Link>
          </div>
        </div>

        {/* Activity Logs (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white border border-pastel-border shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-pastel-text flex items-center gap-2">
              <Activity className="w-4 h-4 text-pastel-accent" />
              <span>Nhật ký cập nhật gần đây</span>
            </h2>
            <span className="text-[11px] font-mono text-pastel-subtext">
              {logs.length} bản ghi
            </span>
          </div>

          <div className="space-y-3">
            {logs.slice(0, 8).map((log) => (
              <div
                key={log.id}
                className="flex items-start justify-between gap-3 p-3 rounded-xl bg-pastel-bg/50 border border-pastel-border/60 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-pastel-accent uppercase px-1.5 py-0.5 rounded bg-white">
                      {log.entity_type}
                    </span>
                    <span className="font-medium text-pastel-text">{log.action}</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-pastel-subtext shrink-0 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatDate(log.created_at)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
