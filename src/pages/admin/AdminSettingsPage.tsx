import React, { useState, useEffect } from 'react';
import { Mail, Check, Trash2, Shield, Database, CheckCircle2, Clock, Activity, AlertCircle } from 'lucide-react';
import { DataStore } from '../../lib/dataStore';
import { ContactMessage, ActivityLog } from '../../types';
import { isSupabaseConfigured } from '../../lib/supabase';
import { showToast, formatDate } from '../../lib/utils';
import { useAuth } from '../../context/AuthContext';

export const AdminSettingsPage: React.FC = () => {
  const { adminEmail } = useAuth();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [activeTab, setActiveTab] = useState<'messages' | 'system' | 'logs'>('messages');

  const loadData = async () => {
    const [msgs, l] = await Promise.all([
      DataStore.getContactMessages(),
      DataStore.getActivityLogs(),
    ]);
    setMessages(msgs);
    setLogs(l);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleMarkRead = async (id: string) => {
    await DataStore.markMessageAsRead(id);
    showToast('Đã đánh dấu đã đọc.', 'info');
    loadData();
  };

  const handleDeleteMessage = async (id: string) => {
    if (confirm('Xóa tin nhắn này?')) {
      await DataStore.deleteContactMessage(id);
      showToast('Đã xóa tin nhắn.', 'info');
      loadData();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-pastel-text">Hộp Thư Tin Nhắn & Cài Đặt Hệ Thống</h1>
        <p className="text-xs text-pastel-subtext mt-0.5">
          Quản lý tin nhắn liên hệ từ khách truy cập website, kiểm tra trạng thái Supabase và nhật ký hệ thống.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-pastel-border gap-2">
        <button
          onClick={() => setActiveTab('messages')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'messages'
              ? 'border-pastel-deep text-pastel-deep'
              : 'border-transparent text-pastel-subtext hover:text-pastel-text'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Hòm thư liên hệ ({messages.filter((m) => !m.is_read).length} chưa đọc)</span>
        </button>

        <button
          onClick={() => setActiveTab('system')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'system'
              ? 'border-pastel-deep text-pastel-deep'
              : 'border-transparent text-pastel-subtext hover:text-pastel-text'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Cấu hình Backend & Supabase</span>
        </button>

        <button
          onClick={() => setActiveTab('logs')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'logs'
              ? 'border-pastel-deep text-pastel-deep'
              : 'border-transparent text-pastel-subtext hover:text-pastel-text'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Toàn bộ nhật ký ({logs.length})</span>
        </button>
      </div>

      {/* TAB 1: MESSAGES */}
      {activeTab === 'messages' && (
        <div className="space-y-3">
          {messages.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-white border border-pastel-border text-pastel-subtext text-xs">
              Chưa có tin nhắn nào được gửi đến.
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-5 rounded-2xl bg-white border transition-all space-y-3 ${
                  msg.is_read ? 'border-pastel-border opacity-90' : 'border-pastel-accent shadow-xs'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                        msg.is_read
                          ? 'bg-pastel-bg text-pastel-subtext'
                          : 'bg-pastel-light text-pastel-deep'
                      }`}
                    >
                      {msg.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-pastel-text">{msg.name}</h3>
                        {!msg.is_read && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-pastel-accent text-white">
                            MỚI
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-pastel-subtext font-mono">
                        {msg.email} {msg.phone ? `• SĐT: ${msg.phone}` : ''}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <span className="text-[11px] font-mono text-pastel-subtext mr-2">
                      {formatDate(msg.created_at)}
                    </span>
                    {!msg.is_read && (
                      <button
                        onClick={() => handleMarkRead(msg.id)}
                        className="px-3 py-1.5 rounded-xl bg-pastel-bg hover:bg-pastel-light/60 text-pastel-deep text-xs font-semibold flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Đã đọc</span>
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteMessage(msg.id)}
                      className="p-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {msg.subject && (
                  <div className="text-xs font-semibold text-pastel-deep bg-pastel-bg/60 px-3 py-1.5 rounded-xl">
                    Chủ đề: {msg.subject}
                  </div>
                )}

                <p className="text-xs text-pastel-text leading-relaxed whitespace-pre-line p-3 rounded-xl bg-pastel-bg/30 border border-pastel-border/40">
                  {msg.message}
                </p>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 2: SYSTEM CONFIG */}
      {activeTab === 'system' && (
        <div className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-pastel-border shadow-soft">
          <div className="space-y-2">
            <h3 className="font-bold text-base text-pastel-text">Trạng Thái Kết Nối Backend</h3>
            <p className="text-xs text-pastel-subtext">
              Hệ thống được thiết kế với kiến trúc kép: hỗ trợ kết nối trực tiếp Supabase Cloud PostgreSQL và cơ chế lưu trữ cục bộ bảo đảm hoạt động 100% không gián đoạn.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-pastel-bg/60 border border-pastel-border space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-pastel-deep uppercase font-mono">
                KẾT NỐI SUPABASE
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold font-mono ${
                  isSupabaseConfigured
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {isSupabaseConfigured ? 'CONNECTED' : 'LOCAL PERSISTENCE / FALLBACK READY'}
              </span>
            </div>

            <p className="text-xs text-pastel-subtext">
              {isSupabaseConfigured
                ? 'Đã cấu hình URL và API Key Supabase thành công. Toàn bộ dữ liệu được đồng bộ hóa với cơ sở dữ liệu đám mây.'
                : 'Hiện đang sử dụng bộ nhớ cục bộ đồng bộ hóa đầy đủ CRUD (Local DataStore). Để kết nối Supabase, bạn chỉ cần điền VITE_SUPABASE_URL và VITE_SUPABASE_ANON_KEY trong file .env và chạy supabase/schema.sql.'}
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-pastel-border/60">
            <span className="text-xs font-bold text-pastel-text font-mono uppercase block">
              Tài khoản quản trị hiện tại:
            </span>
            <div className="p-3 rounded-xl bg-pastel-bg/40 border border-pastel-border font-mono text-xs text-pastel-deep">
              {adminEmail || 'admin@caoductienthanh.com'}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ACTIVITY LOGS */}
      {activeTab === 'logs' && (
        <div className="space-y-3">
          {logs.map((log) => (
            <div
              key={log.id}
              className="p-4 rounded-2xl bg-white border border-pastel-border text-xs flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] font-bold text-pastel-accent uppercase px-2 py-0.5 rounded bg-pastel-light/60">
                  {log.entity_type}
                </span>
                <span className="font-medium text-pastel-text">{log.action}</span>
              </div>
              <span className="text-[11px] font-mono text-pastel-subtext shrink-0">
                {formatDate(log.created_at)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
