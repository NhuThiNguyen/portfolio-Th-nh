import React, { useState, useEffect } from 'react';
import { Upload, Trash2, Search, Filter, Eye, Image as ImageIcon, Video, X, Lock, Globe } from 'lucide-react';
import { DataStore } from '../../lib/dataStore';
import { MediaItem } from '../../types';
import { showToast, formatFileSize } from '../../lib/utils';
import { Lightbox } from '../../components/common/Lightbox';

export const AdminMediaPage: React.FC = () => {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'image' | 'video'>('all');
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  // New Upload Form state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [fileUrl, setFileUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState<'image' | 'video'>('image');
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState('CAD & Engineering');
  const [isPrivate, setIsPrivate] = useState(false);

  const loadData = async () => {
    const list = await DataStore.getMedia(true);
    setMediaList(list);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileUrl.trim()) {
      showToast('Vui lòng nhập đường dẫn tệp (URL).', 'error');
      return;
    }

    const name = fileName.trim() || `media-${Date.now()}.${fileType === 'video' ? 'mp4' : 'jpg'}`;

    try {
      await DataStore.addMedia({
        file_name: name,
        file_url: fileUrl.trim(),
        file_type: fileType,
        size_bytes: 450000,
        caption: caption.trim() || undefined,
        category: category.trim() || 'General',
        is_private: isPrivate,
      });

      showToast('Đã thêm tệp media mới vào thư viện!', 'success');
      setShowUploadModal(false);
      setFileUrl('');
      setFileName('');
      setCaption('');
      loadData();
    } catch {
      showToast('Lỗi khi thêm media.', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Bạn có chắc muốn xóa tệp này khỏi thư viện?')) {
      await DataStore.deleteMedia(id);
      showToast('Đã xóa tệp media.', 'info');
      loadData();
    }
  };

  const filtered = mediaList.filter((m) => {
    const matchSearch =
      m.file_name.toLowerCase().includes(search.toLowerCase()) ||
      (m.caption && m.caption.toLowerCase().includes(search.toLowerCase())) ||
      (m.category && m.category.toLowerCase().includes(search.toLowerCase()));

    const matchType = filterType === 'all' ? true : m.file_type === filterType;

    return matchSearch && matchType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-pastel-text">Thư Viện Media & Tệp Tin</h1>
          <p className="text-xs text-pastel-subtext mt-0.5">
            Quản lý toàn bộ hình ảnh bản vẽ CAD, ảnh hoạt động thể thao, âm nhạc và video cá nhân.
          </p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="px-4 py-2.5 rounded-xl bg-pastel-deep text-white text-xs font-bold hover:bg-pastel-text transition-colors flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
        >
          <Upload className="w-4 h-4" />
          <span>Thêm Media mới</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-pastel-subtext absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm kiếm tệp theo tên, ghi chú, danh mục..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-pastel-border text-xs bg-white focus:border-pastel-accent outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          {(['all', 'image', 'video'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize transition-colors ${
                filterType === t
                  ? 'bg-pastel-deep text-white'
                  : 'bg-white border border-pastel-border text-pastel-text hover:bg-pastel-light/40'
              }`}
            >
              {t === 'all' ? 'Tất cả' : t === 'image' ? 'Hình ảnh' : 'Video'}
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="group rounded-2xl bg-white border border-pastel-border overflow-hidden shadow-xs hover:border-pastel-primary transition-all flex flex-col justify-between"
          >
            <div className="relative aspect-4/3 bg-pastel-light/30 overflow-hidden">
              {item.file_type === 'video' ? (
                <div className="w-full h-full flex items-center justify-center bg-pastel-deep/10 text-pastel-deep">
                  <Video className="w-8 h-8" />
                </div>
              ) : (
                <img
                  src={item.file_url}
                  alt={item.caption || item.file_name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}

              {/* Private / Public Badge */}
              <div className="absolute top-2 left-2">
                {item.is_private ? (
                  <span className="p-1 rounded bg-rose-500/80 text-white block" title="Private">
                    <Lock className="w-3 h-3" />
                  </span>
                ) : (
                  <span className="p-1 rounded bg-emerald-500/80 text-white block" title="Public">
                    <Globe className="w-3 h-3" />
                  </span>
                )}
              </div>

              {/* Actions Overlay */}
              <div className="absolute inset-0 bg-pastel-deep/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => setLightboxUrl(item.file_url)}
                  className="p-2 rounded-xl bg-white/90 text-pastel-deep hover:bg-white"
                  title="Xem phóng to"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 rounded-xl bg-rose-500 text-white hover:bg-rose-600"
                  title="Xóa"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-3 space-y-1">
              <p className="text-xs font-semibold text-pastel-text truncate">{item.file_name}</p>
              {item.caption && <p className="text-[11px] text-pastel-subtext truncate">{item.caption}</p>}
              <div className="flex items-center justify-between text-[10px] font-mono text-pastel-subtext pt-1 border-t border-pastel-border/60">
                <span>{item.category || 'General'}</span>
                <span>{formatFileSize(item.size_bytes)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Media Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-pastel-deep/70 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-pastel-border space-y-5">
            <button
              onClick={() => setShowUploadModal(false)}
              className="absolute top-5 right-5 text-pastel-subtext hover:text-pastel-deep p-1.5 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-bold text-lg text-pastel-text">Thêm Tệp Media Mới</h3>

            <form onSubmit={handleCreateMedia} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
                  Đường dẫn tệp (URL hình ảnh hoặc video) *
                </label>
                <input
                  type="text"
                  required
                  value={fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2.5 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40 font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
                    Tên tệp (File Name)
                  </label>
                  <input
                    type="text"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    placeholder="autocad-drawing.jpg"
                    className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
                    Loại tệp
                  </label>
                  <select
                    value={fileType}
                    onChange={(e) => setFileType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40"
                  >
                    <option value="image">Hình ảnh (Image)</option>
                    <option value="video">Video</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
                    Ghi chú / Chú thích (Caption)
                  </label>
                  <input
                    type="text"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Bản vẽ kỹ thuật chi tiết..."
                    className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
                    Chuyên mục
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="CAD & Engineering"
                    className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="is_priv"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="is_priv" className="text-xs text-pastel-text font-medium select-none">
                  Đánh dấu là tệp riêng tư (Chỉ hiển thị cho album bảo mật / Admin)
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-pastel-border/60">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl border border-pastel-border text-xs font-semibold hover:bg-pastel-bg"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-pastel-deep text-white text-xs font-bold hover:bg-pastel-text"
                >
                  Thêm tệp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lightbox for preview */}
      <Lightbox
        isOpen={Boolean(lightboxUrl)}
        onClose={() => setLightboxUrl(null)}
        mediaUrl={lightboxUrl || ''}
      />
    </div>
  );
};
