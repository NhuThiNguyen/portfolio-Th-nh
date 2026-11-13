import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Heart, Activity, Music, Compass } from 'lucide-react';
import { DataStore } from '../../lib/dataStore';
import { Interest } from '../../types';
import { showToast } from '../../lib/utils';

export const AdminInterestsPage: React.FC = () => {
  const [interests, setInterests] = useState<Interest[]>([]);
  const [editingItem, setEditingItem] = useState<Interest | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<Interest>>({
    title: '',
    category: 'sports',
    description: '',
    image_url: '',
    tags: [],
    sort_order: 1,
  });
  const [tagsInput, setTagsInput] = useState('');

  const loadData = async () => {
    const list = await DataStore.getInterests();
    setInterests(list);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStartCreate = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      category: 'sports',
      description: '',
      image_url: '',
      tags: [],
      sort_order: interests.length + 1,
    });
    setTagsInput('');
    setIsCreating(true);
  };

  const handleStartEdit = (item: Interest) => {
    setIsCreating(false);
    setEditingItem(item);
    setFormData({ ...item });
    setTagsInput(item.tags?.join(', ') || '');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim()) {
      showToast('Vui lòng nhập tiêu đề sở thích.', 'error');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const payload = { ...formData, tags };

    try {
      if (isCreating) {
        await DataStore.addInterest(payload as Omit<Interest, 'id'>);
        showToast('Đã thêm sở thích mới!', 'success');
      } else if (editingItem) {
        await DataStore.updateInterest(editingItem.id, payload);
        showToast('Đã cập nhật sở thích!', 'success');
      }
      setIsCreating(false);
      setEditingItem(null);
      loadData();
    } catch {
      showToast('Lỗi khi lưu sở thích.', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa mục sở thích này?')) {
      await DataStore.deleteInterest(id);
      showToast('Đã xóa sở thích.', 'info');
      loadData();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-pastel-text">Quản Lý Sở Thích & Phong Cách Sống</h1>
          <p className="text-xs text-pastel-subtext mt-0.5">
            Quản lý các mục Thể thao (Sports), Âm nhạc (Music), Học hỏi liên tục (Continuous Learning) và Khám phá công nghệ.
          </p>
        </div>
        <button
          onClick={handleStartCreate}
          className="px-4 py-2.5 rounded-xl bg-pastel-deep text-white text-xs font-bold hover:bg-pastel-text transition-colors flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm sở thích mới</span>
        </button>
      </div>

      {/* Editor Modal / Form */}
      {(isCreating || editingItem) && (
        <form onSubmit={handleSave} className="p-6 rounded-3xl bg-white border-2 border-pastel-accent/40 shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b border-pastel-border/60 pb-3">
            <h3 className="font-bold text-sm text-pastel-text">
              {isCreating ? 'Thêm mới sở thích' : 'Chỉnh sửa sở thích'}
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
                Tiêu đề *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="VD: Sports & Physical Activity"
                className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
                Phân loại
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40"
              >
                <option value="sports">Thể thao (Sports)</option>
                <option value="music">Âm nhạc (Music)</option>
                <option value="learning">Học hỏi liên tục (Continuous Learning)</option>
                <option value="technology">Công nghệ (Technology)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
                Đường dẫn hình ảnh (Image URL)
              </label>
              <input
                type="text"
                value={formData.image_url || ''}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
                Tags (Cách nhau bằng dấu phẩy)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Thể thao, Kỷ luật, Bền bỉ"
                className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
              Mô tả chi tiết
            </label>
            <textarea
              rows={3}
              value={formData.description}
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
              <span>Lưu</span>
            </button>
          </div>
        </form>
      )}

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {interests.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-white border border-pastel-border shadow-xs flex flex-col justify-between gap-4"
          >
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-pastel-light/60 text-pastel-deep uppercase">
                {item.category}
              </span>
              <h3 className="font-bold text-base text-pastel-text">{item.title}</h3>
              <p className="text-xs text-pastel-subtext line-clamp-3">{item.description}</p>
            </div>

            <div className="pt-3 border-t border-pastel-border/60 flex items-center justify-end gap-2">
              <button
                onClick={() => handleStartEdit(item)}
                className="p-2 rounded-xl bg-pastel-bg hover:bg-pastel-light/60 text-pastel-deep transition-colors"
                title="Sửa"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors"
                title="Xóa"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
