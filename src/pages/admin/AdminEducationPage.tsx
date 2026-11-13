import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, GraduationCap, School, Check } from 'lucide-react';
import { DataStore } from '../../lib/dataStore';
import { Education } from '../../types';
import { showToast } from '../../lib/utils';

export const AdminEducationPage: React.FC = () => {
  const [educationList, setEducationList] = useState<Education[]>([]);
  const [editingItem, setEditingItem] = useState<Education | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<Education>>({
    institution: '',
    level: 'University',
    status: 'Graduated',
    timeline: 'Graduated',
    description: '',
    logo_url: '',
    sort_order: 1,
  });

  const loadData = async () => {
    const list = await DataStore.getEducation();
    setEducationList(list);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStartCreate = () => {
    setEditingItem(null);
    setFormData({
      institution: '',
      level: 'University',
      status: 'Graduated',
      timeline: 'Graduated',
      description: '',
      logo_url: '',
      sort_order: educationList.length + 1,
    });
    setIsCreating(true);
  };

  const handleStartEdit = (item: Education) => {
    setIsCreating(false);
    setEditingItem(item);
    setFormData({ ...item });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.institution?.trim()) {
      showToast('Vui lòng nhập tên trường / cơ sở đào tạo.', 'error');
      return;
    }

    try {
      if (isCreating) {
        await DataStore.addEducation(formData as Omit<Education, 'id'>);
        showToast('Đã thêm mục học vấn mới!', 'success');
      } else if (editingItem) {
        await DataStore.updateEducation(editingItem.id, formData);
        showToast('Đã cập nhật mục học vấn!', 'success');
      }
      setIsCreating(false);
      setEditingItem(null);
      loadData();
    } catch {
      showToast('Lỗi khi lưu thông tin học vấn.', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa mục học vấn này?')) {
      await DataStore.deleteEducation(id);
      showToast('Đã xóa mục học vấn.', 'info');
      loadData();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-pastel-text">Quản Lý Học Vấn & Bằng Cấp</h1>
          <p className="text-xs text-pastel-subtext mt-0.5">
            Quản lý dòng thời gian đào tạo: THPT chuyên Nguyễn Hữu Huân & ĐH Bách khoa ĐHQG TP.HCM.
          </p>
        </div>
        <button
          onClick={handleStartCreate}
          className="px-4 py-2.5 rounded-xl bg-pastel-deep text-white text-xs font-bold hover:bg-pastel-text transition-colors flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm học vấn</span>
        </button>
      </div>

      {/* Editor Modal / Form */}
      {(isCreating || editingItem) && (
        <form onSubmit={handleSave} className="p-6 rounded-3xl bg-white border-2 border-pastel-accent/40 shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b border-pastel-border/60 pb-3">
            <h3 className="font-bold text-sm text-pastel-text">
              {isCreating ? 'Thêm mới cơ sở đào tạo' : 'Chỉnh sửa cơ sở đào tạo'}
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
                Tên trường / Học viện *
              </label>
              <input
                type="text"
                required
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
                Cấp bậc đào tạo
              </label>
              <input
                type="text"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                placeholder="High School / University"
                className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
                Trạng thái tốt nghiệp
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40"
              >
                <option value="Graduated">Graduated (Đã tốt nghiệp)</option>
                <option value="Studying">Studying (Đang học)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
                Thời gian hiển thị (Timeline)
              </label>
              <input
                type="text"
                value={formData.timeline}
                onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                placeholder="Graduated"
                className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
                Thứ tự sắp xếp
              </label>
              <input
                type="number"
                value={formData.sort_order}
                onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 1 })}
                className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
              Mô tả chi tiết & Nền tảng học thuật
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40"
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
              <span>Lưu</span>
            </button>
          </div>
        </form>
      )}

      {/* List */}
      <div className="space-y-3">
        {educationList.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-white border border-pastel-border shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-pastel-light/60 flex items-center justify-center text-pastel-deep shrink-0 mt-0.5">
                <GraduationCap className="w-5 h-5 text-pastel-accent" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-pastel-bg text-pastel-deep uppercase">
                    {item.level}
                  </span>
                  <span className="text-xs font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                    {item.status}
                  </span>
                </div>
                <h3 className="font-bold text-base text-pastel-text">{item.institution}</h3>
                <p className="text-xs text-pastel-subtext max-w-xl">{item.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                onClick={() => handleStartEdit(item)}
                className="p-2 rounded-xl bg-pastel-bg hover:bg-pastel-light/60 text-pastel-deep transition-colors"
                title="Chỉnh sửa"
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
