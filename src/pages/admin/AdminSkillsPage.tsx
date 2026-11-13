import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Wrench, Image as ImageIcon } from 'lucide-react';
import { DataStore } from '../../lib/dataStore';
import { Skill } from '../../types';
import { showToast } from '../../lib/utils';

export const AdminSkillsPage: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [editingItem, setEditingItem] = useState<Skill | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<Skill>>({
    name: '',
    category: 'technical',
    description: '',
    badge_text: '',
    screenshots: [],
    sort_order: 1,
  });
  const [screenshotInput, setScreenshotInput] = useState('');

  const loadData = async () => {
    const list = await DataStore.getSkills();
    setSkills(list);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStartCreate = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      category: 'technical',
      description: '',
      badge_text: '',
      screenshots: [],
      sort_order: skills.length + 1,
    });
    setScreenshotInput('');
    setIsCreating(true);
  };

  const handleStartEdit = (item: Skill) => {
    setIsCreating(false);
    setEditingItem(item);
    setFormData({ ...item });
    setScreenshotInput(item.screenshots?.join('\n') || '');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) {
      showToast('Vui lòng nhập tên kỹ năng.', 'error');
      return;
    }

    const screenshots = screenshotInput
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const payload = {
      ...formData,
      screenshots,
    };

    try {
      if (isCreating) {
        await DataStore.addSkill(payload as Omit<Skill, 'id'>);
        showToast('Đã thêm kỹ năng mới!', 'success');
      } else if (editingItem) {
        await DataStore.updateSkill(editingItem.id, payload);
        showToast('Đã cập nhật kỹ năng!', 'success');
      }
      setIsCreating(false);
      setEditingItem(null);
      loadData();
    } catch {
      showToast('Lỗi khi lưu kỹ năng.', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa kỹ năng này?')) {
      await DataStore.deleteSkill(id);
      showToast('Đã xóa kỹ năng.', 'info');
      loadData();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-pastel-text">Quản Lý Kỹ Năng & AutoCAD</h1>
          <p className="text-xs text-pastel-subtext mt-0.5">
            Quản lý kỹ năng chính (AutoCAD), giải pháp tự xây dựng, chứng chỉ ngoại ngữ và kỹ năng mềm.
          </p>
        </div>
        <button
          onClick={handleStartCreate}
          className="px-4 py-2.5 rounded-xl bg-pastel-deep text-white text-xs font-bold hover:bg-pastel-text transition-colors flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm kỹ năng mới</span>
        </button>
      </div>

      {/* Editor Modal / Form */}
      {(isCreating || editingItem) && (
        <form onSubmit={handleSave} className="p-6 rounded-3xl bg-white border-2 border-pastel-accent/40 shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b border-pastel-border/60 pb-3">
            <h3 className="font-bold text-sm text-pastel-text">
              {isCreating ? 'Thêm kỹ năng mới' : 'Chỉnh sửa kỹ năng'}
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
                Tên kỹ năng *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="VD: AutoCAD"
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
                <option value="technical">Kỹ thuật (Technical)</option>
                <option value="tools">Công cụ (Tools / Utilities)</option>
                <option value="languages">Ngoại ngữ (Languages)</option>
                <option value="soft_skills">Kỹ năng mềm (Soft Skills)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
                Huy hiệu nổi bật (Badge)
              </label>
              <input
                type="text"
                value={formData.badge_text || ''}
                onChange={(e) => setFormData({ ...formData, badge_text: e.target.value })}
                placeholder="VD: Primary Skill / Core Mindset"
                className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
              Mô tả chi tiết kỹ năng & Kinh nghiệm
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
              Ảnh chụp màn hình thực tế (mỗi link 1 dòng)
            </label>
            <textarea
              rows={2}
              value={screenshotInput}
              onChange={(e) => setScreenshotInput(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40 font-mono"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
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
              <span>Lưu kỹ năng</span>
            </button>
          </div>
        </form>
      )}

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="p-5 rounded-2xl bg-white border border-pastel-border shadow-xs flex flex-col justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-pastel-light/60 text-pastel-deep uppercase">
                  {skill.category}
                </span>
                {skill.badge_text && (
                  <span className="text-[10px] font-mono font-bold text-pastel-accent bg-pastel-bg px-2 py-0.5 rounded border border-pastel-border">
                    {skill.badge_text}
                  </span>
                )}
              </div>
              <h3 className="font-bold text-base text-pastel-text">{skill.name}</h3>
              <p className="text-xs text-pastel-subtext leading-relaxed line-clamp-3">
                {skill.description}
              </p>
              {skill.screenshots && skill.screenshots.length > 0 && (
                <div className="flex items-center gap-1 text-[11px] font-mono text-pastel-deep pt-1">
                  <ImageIcon className="w-3.5 h-3.5 text-pastel-accent" />
                  <span>{skill.screenshots.length} ảnh minh họa</span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-pastel-border/60 flex items-center justify-end gap-2">
              <button
                onClick={() => handleStartEdit(skill)}
                className="p-2 rounded-xl bg-pastel-bg hover:bg-pastel-light/60 text-pastel-deep transition-colors"
                title="Sửa"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(skill.id)}
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
