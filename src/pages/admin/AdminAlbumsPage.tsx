import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, FolderLock, Lock, Globe, Shield, KeyRound, Eye } from 'lucide-react';
import { DataStore } from '../../lib/dataStore';
import { Album, AlbumVisibility } from '../../types';
import { showToast } from '../../lib/utils';

export const AdminAlbumsPage: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [editingItem, setEditingItem] = useState<Album | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<Album>>({
    title: '',
    description: '',
    cover_image_url: '',
    visibility: 'PUBLIC',
    sort_order: 1,
  });
  const [albumPassword, setAlbumPassword] = useState('');

  const loadData = async () => {
    const list = await DataStore.getAlbums(true);
    setAlbums(list);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStartCreate = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      description: '',
      cover_image_url: '',
      visibility: 'PUBLIC',
      sort_order: albums.length + 1,
    });
    setAlbumPassword('');
    setIsCreating(true);
  };

  const handleStartEdit = (album: Album) => {
    setIsCreating(false);
    setEditingItem(album);
    setFormData({ ...album });
    setAlbumPassword('');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim()) {
      showToast('Vui lòng nhập tên album.', 'error');
      return;
    }

    if (formData.visibility === 'PASSWORD_PROTECTED' && isCreating && !albumPassword.trim()) {
      showToast('Vui lòng nhập mật khẩu bảo vệ cho album.', 'error');
      return;
    }

    try {
      if (isCreating) {
        await DataStore.addAlbum(formData as Omit<Album, 'id'>, albumPassword.trim() || undefined);
        showToast('Đã tạo album mới!', 'success');
      } else if (editingItem) {
        await DataStore.updateAlbum(editingItem.id, formData, albumPassword.trim() || undefined);
        showToast('Đã cập nhật album!', 'success');
      }
      setIsCreating(false);
      setEditingItem(null);
      loadData();
    } catch {
      showToast('Lỗi khi lưu album.', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa album này?')) {
      await DataStore.deleteAlbum(id);
      showToast('Đã xóa album.', 'info');
      loadData();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-pastel-text">Quản Lý Album & Kỷ Niệm Bảo Mật</h1>
          <p className="text-xs text-pastel-subtext mt-0.5">
            Cấu hình quyền riêng tư cho từng album: Công khai, Mật khẩu chia sẻ (không cần tài khoản) hoặc Chỉ dành cho Admin.
          </p>
        </div>
        <button
          onClick={handleStartCreate}
          className="px-4 py-2.5 rounded-xl bg-pastel-deep text-white text-xs font-bold hover:bg-pastel-text transition-colors flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Tạo album mới</span>
        </button>
      </div>

      {/* Editor Modal / Form */}
      {(isCreating || editingItem) && (
        <form onSubmit={handleSave} className="p-6 rounded-3xl bg-white border-2 border-pastel-accent/40 shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b border-pastel-border/60 pb-3">
            <h3 className="font-bold text-sm text-pastel-text">
              {isCreating ? 'Tạo album kỷ niệm mới' : 'Cập nhật cấu hình album'}
            </h3>
            <button
              type="button"
              onClick={() => {
                setIsCreating(false);
                setEditingItem(null);
              }}
              className="p-1 rounded-lg hover:bg-pastel-bg text-pastel-subtext"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
                Tên album *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="VD: Kỷ niệm Bách Khoa / Bản vẽ dự án"
                className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
                Chế độ hiển thị (Visibility) *
              </label>
              <select
                value={formData.visibility}
                onChange={(e) => setFormData({ ...formData, visibility: e.target.value as AlbumVisibility })}
                className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40 font-medium"
              >
                <option value="PUBLIC">PUBLIC — Công khai cho tất cả người xem</option>
                <option value="PASSWORD_PROTECTED">PASSWORD_PROTECTED — Yêu cầu mật khẩu độc lập</option>
                <option value="ADMIN_ONLY">ADMIN_ONLY — Chỉ dành riêng cho Quản trị viên</option>
              </select>
            </div>
          </div>

          {formData.visibility === 'PASSWORD_PROTECTED' && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
              <label className="block text-xs font-bold text-amber-900 uppercase font-mono">
                {isCreating ? 'Mật khẩu bảo vệ album *' : 'Đổi mật khẩu mới cho album (để trống nếu không đổi)'}
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-amber-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={albumPassword}
                  onChange={(e) => setAlbumPassword(e.target.value)}
                  placeholder="Nhập mật khẩu cho album (ví dụ: 123456)"
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-amber-300 text-xs bg-white text-pastel-text font-mono"
                />
              </div>
              <p className="text-[11px] text-amber-800">
                Lưu ý: Thay đổi mật khẩu sẽ tự động hủy toàn bộ phiên truy cập cũ của người xem.
              </p>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
              Ảnh bìa album (Cover Image URL)
            </label>
            <input
              type="text"
              value={formData.cover_image_url || ''}
              onChange={(e) => setFormData({ ...formData, cover_image_url: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
              Mô tả nội dung album
            </label>
            <textarea
              rows={2}
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40 resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-pastel-border/60">
            <button
              type="button"
              onClick={() => {
                setIsCreating(false);
                setEditingItem(null);
              }}
              className="px-4 py-2 rounded-xl border border-pastel-border text-xs font-semibold hover:bg-pastel-bg"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-pastel-deep text-white text-xs font-bold hover:bg-pastel-text flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Lưu album</span>
            </button>
          </div>
        </form>
      )}

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {albums.map((album) => (
          <div
            key={album.id}
            className="p-5 rounded-2xl bg-white border border-pastel-border shadow-xs flex flex-col justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-pastel-light/60 text-pastel-deep uppercase">
                  {album.visibility}
                </span>
                {album.visibility === 'PASSWORD_PROTECTED' && (
                  <span className="p-1 rounded-full bg-amber-100 text-amber-700" title="Password Protected">
                    <Lock className="w-3.5 h-3.5" />
                  </span>
                )}
                {album.visibility === 'ADMIN_ONLY' && (
                  <span className="p-1 rounded-full bg-rose-100 text-rose-700" title="Admin Only">
                    <Shield className="w-3.5 h-3.5" />
                  </span>
                )}
                {album.visibility === 'PUBLIC' && (
                  <span className="p-1 rounded-full bg-emerald-100 text-emerald-700" title="Public">
                    <Globe className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>

              <h3 className="font-bold text-base text-pastel-text">{album.title}</h3>
              <p className="text-xs text-pastel-subtext line-clamp-2">{album.description}</p>
            </div>

            <div className="pt-3 border-t border-pastel-border/60 flex items-center justify-between text-xs font-mono text-pastel-subtext">
              <span>{album.media_count || 0} tệp</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleStartEdit(album)}
                  className="p-2 rounded-xl bg-pastel-bg hover:bg-pastel-light/60 text-pastel-deep transition-colors"
                  title="Sửa"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(album.id)}
                  className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors"
                  title="Xóa"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
