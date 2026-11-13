import React, { useState, useEffect } from 'react';
import { Save, UserCheck, Calendar, Phone, MapPin, Mail, Sparkles, Image as ImageIcon } from 'lucide-react';
import { DataStore } from '../../lib/dataStore';
import { Profile } from '../../types';
import { showToast } from '../../lib/utils';

export const AdminProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    DataStore.getProfile().then(setProfile);
  }, []);

  if (!profile) {
    return <div className="p-8 font-mono text-xs text-pastel-subtext">Đang tải hồ sơ...</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await DataStore.updateProfile(profile);
      setProfile(updated);
      showToast('Đã lưu thông tin hồ sơ thành công!', 'success');
    } catch {
      showToast('Lỗi khi lưu thông tin hồ sơ.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-pastel-text">Quản Lý Hồ Sơ Cá Nhân</h1>
          <p className="text-xs text-pastel-subtext mt-0.5">
            Cập nhật tên, tiểu sử, thông điệp nghề nghiệp, chân dung và thông tin liên hệ.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-pastel-border shadow-soft">
        
        {/* Basic Identifiers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
              Họ và tên *
            </label>
            <input
              type="text"
              required
              value={profile.full_name}
              onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-pastel-border focus:border-pastel-accent outline-none text-sm bg-pastel-bg/40 text-pastel-text font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
              Ngày sinh (YYYY-MM-DD)
            </label>
            <input
              type="text"
              value={profile.birthday}
              onChange={(e) => setProfile({ ...profile, birthday: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-pastel-border focus:border-pastel-accent outline-none text-sm bg-pastel-bg/40 text-pastel-text"
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
              Số điện thoại
            </label>
            <input
              type="text"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-pastel-border focus:border-pastel-accent outline-none text-sm bg-pastel-bg/40 text-pastel-text"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
              Địa chỉ / Khu vực hiển thị
            </label>
            <input
              type="text"
              value={profile.location}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-pastel-border focus:border-pastel-accent outline-none text-sm bg-pastel-bg/40 text-pastel-text"
            />
          </div>
        </div>

        {/* Professional Headline */}
        <div>
          <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
            Tiêu đề nghề nghiệp (Headline)
          </label>
          <input
            type="text"
            value={profile.headline}
            onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-pastel-border focus:border-pastel-accent outline-none text-sm bg-pastel-bg/40 text-pastel-text font-semibold"
          />
        </div>

        {/* Biography */}
        <div>
          <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
            Tiểu sử & Giới thiệu chi tiết
          </label>
          <textarea
            rows={4}
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-pastel-border focus:border-pastel-accent outline-none text-sm bg-pastel-bg/40 text-pastel-text resize-none"
          />
        </div>

        {/* Portrait & Hero Image URL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
              Đường dẫn ảnh chân dung (Portrait URL)
            </label>
            <input
              type="text"
              value={profile.portrait_url}
              onChange={(e) => setProfile({ ...profile, portrait_url: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-pastel-border focus:border-pastel-accent outline-none text-sm bg-pastel-bg/40 text-pastel-text"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
              Email liên hệ (Tùy chọn)
            </label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              placeholder="VD: contact@caoductienthanh.com"
              className="w-full px-4 py-2.5 rounded-xl border border-pastel-border focus:border-pastel-accent outline-none text-sm bg-pastel-bg/40 text-pastel-text"
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="pt-2 border-t border-pastel-border/60 space-y-3">
          <span className="text-xs font-bold text-pastel-deep uppercase font-mono block">
            Mạng xã hội & Kênh liên kết
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-mono text-pastel-subtext mb-1">GitHub URL</label>
              <input
                type="text"
                placeholder="https://github.com/..."
                value={profile.social_links.github || ''}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    social_links: { ...profile.social_links, github: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-pastel-subtext mb-1">LinkedIn URL</label>
              <input
                type="text"
                placeholder="https://linkedin.com/in/..."
                value={profile.social_links.linkedin || ''}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    social_links: { ...profile.social_links, linkedin: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-pastel-subtext mb-1">Zalo / SĐT</label>
              <input
                type="text"
                placeholder="0972456724"
                value={profile.social_links.zalo || ''}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    social_links: { ...profile.social_links, zalo: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-pastel-border/60 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-xl bg-pastel-deep text-white text-xs font-bold hover:bg-pastel-text transition-colors flex items-center gap-2 shadow-xs disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Đang lưu...' : 'Lưu thay đổi hồ sơ'}</span>
          </button>
        </div>

      </form>
    </div>
  );
};
