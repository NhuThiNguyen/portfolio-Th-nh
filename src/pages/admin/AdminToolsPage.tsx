import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Cpu, Eye, EyeOff, ExternalLink, Download } from 'lucide-react';
import { DataStore } from '../../lib/dataStore';
import { Tool } from '../../types';
import { showToast } from '../../lib/utils';

export const AdminToolsPage: React.FC = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [editingItem, setEditingItem] = useState<Tool | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<Tool>>({
    name: '',
    category: 'Engineering & CAD Utility',
    thumbnail_url: '',
    description: '',
    purpose: '',
    problem_solved: '',
    main_features: [],
    technologies: [],
    screenshots: [],
    demo_url: '',
    download_url: '',
    dev_date: '',
    is_published: true,
    sort_order: 1,
  });

  const [featuresInput, setFeaturesInput] = useState('');
  const [techInput, setTechInput] = useState('');
  const [screenshotsInput, setScreenshotsInput] = useState('');

  const loadData = async () => {
    const list = await DataStore.getTools(false);
    setTools(list);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStartCreate = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      category: 'Engineering & CAD Utility',
      thumbnail_url: '',
      description: '',
      purpose: '',
      problem_solved: '',
      main_features: [],
      technologies: [],
      screenshots: [],
      demo_url: '',
      download_url: '',
      dev_date: '',
      is_published: true,
      sort_order: tools.length + 1,
    });
    setFeaturesInput('');
    setTechInput('');
    setScreenshotsInput('');
    setIsCreating(true);
  };

  const handleStartEdit = (tool: Tool) => {
    setIsCreating(false);
    setEditingItem(tool);
    setFormData({ ...tool });
    setFeaturesInput(tool.main_features?.join('\n') || '');
    setTechInput(tool.technologies?.join(', ') || '');
    setScreenshotsInput(tool.screenshots?.join('\n') || '');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) {
      showToast('Vui lòng nhập tên công cụ.', 'error');
      return;
    }

    const main_features = featuresInput
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const technologies = techInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const screenshots = screenshotsInput
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const payload = {
      ...formData,
      main_features,
      technologies,
      screenshots,
    };

    try {
      if (isCreating) {
        await DataStore.addTool(payload as Omit<Tool, 'id'>);
        showToast('Đã thêm công cụ mới!', 'success');
      } else if (editingItem) {
        await DataStore.updateTool(editingItem.id, payload);
        showToast('Đã cập nhật công cụ!', 'success');
      }
      setIsCreating(false);
      setEditingItem(null);
      loadData();
    } catch {
      showToast('Lỗi khi lưu công cụ.', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa công cụ này?')) {
      await DataStore.deleteTool(id);
      showToast('Đã xóa công cụ.', 'info');
      loadData();
    }
  };

  const handleTogglePublish = async (tool: Tool) => {
    await DataStore.updateTool(tool.id, { is_published: !tool.is_published });
    showToast(`Đã ${!tool.is_published ? 'hiển thị' : 'ẩn'} công cụ trên website.`, 'info');
    loadData();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-pastel-text">Quản Lý Công Cụ Tự Phát Triển</h1>
          <p className="text-xs text-pastel-subtext mt-0.5">
            Quản lý kho công cụ độc lập phục vụ quy trình công việc, tự động hóa và tăng năng suất.
          </p>
        </div>
        <button
          onClick={handleStartCreate}
          className="px-4 py-2.5 rounded-xl bg-pastel-deep text-white text-xs font-bold hover:bg-pastel-text transition-colors flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm công cụ mới</span>
        </button>
      </div>

      {/* Editor Modal / Form */}
      {(isCreating || editingItem) && (
        <form onSubmit={handleSave} className="p-6 rounded-3xl bg-white border-2 border-pastel-accent/40 shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b border-pastel-border/60 pb-3">
            <h3 className="font-bold text-sm text-pastel-text">
              {isCreating ? 'Thêm công cụ tự phát triển' : 'Chỉnh sửa chi tiết công cụ'}
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
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
                Tên công cụ *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
                Phân loại
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="VD: Engineering & CAD Utility"
                className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
                Đường dẫn ảnh Thumbnail
              </label>
              <input
                type="text"
                value={formData.thumbnail_url || ''}
                onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
                Thời gian phát triển (Dev Date)
              </label>
              <input
                type="text"
                value={formData.dev_date || ''}
                onChange={(e) => setFormData({ ...formData, dev_date: e.target.value })}
                placeholder="VD: Q3/2026 hoặc Hoàn thiện"
                className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
              Mô tả ngắn gọn về công cụ
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
                Mục đích xây dựng
              </label>
              <textarea
                rows={2}
                value={formData.purpose || ''}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
                Bài toán giải quyết
              </label>
              <textarea
                rows={2}
                value={formData.problem_solved || ''}
                onChange={(e) => setFormData({ ...formData, problem_solved: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40 resize-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
                Tính năng chính (Mỗi dòng 1 tính năng)
              </label>
              <textarea
                rows={3}
                value={featuresInput}
                onChange={(e) => setFeaturesInput(e.target.value)}
                placeholder="Tự động hóa xử lý dữ liệu..."
                className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
                Công nghệ sử dụng (Cách nhau bằng dấu phẩy)
              </label>
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="AutoCAD Scripting, Python, Automation Utility"
                className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
              Ảnh chụp màn hình minh họa (Mỗi link 1 dòng)
            </label>
            <textarea
              rows={2}
              value={screenshotsInput}
              onChange={(e) => setScreenshotsInput(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40 font-mono"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
                Demo URL (Tùy chọn)
              </label>
              <input
                type="text"
                value={formData.demo_url || ''}
                onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
                placeholder="https://..."
                className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
                Download URL (Tùy chọn)
              </label>
              <input
                type="text"
                value={formData.download_url || ''}
                onChange={(e) => setFormData({ ...formData, download_url: e.target.value })}
                placeholder="https://..."
                className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="is_pub"
              checked={formData.is_published}
              onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
              className="rounded"
            />
            <label htmlFor="is_pub" className="text-xs text-pastel-text font-medium select-none">
              Hiển thị công khai trên portfolio
            </label>
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
              <span>Lưu công cụ</span>
            </button>
          </div>
        </form>
      )}

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className="p-5 rounded-2xl bg-white border border-pastel-border shadow-xs flex flex-col justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-pastel-light/60 text-pastel-deep uppercase">
                  {tool.category || 'Utility'}
                </span>
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    tool.is_published ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {tool.is_published ? 'PUBLIC' : 'DRAFT/HIDDEN'}
                </span>
              </div>
              <h3 className="font-bold text-base text-pastel-text">{tool.name}</h3>
              <p className="text-xs text-pastel-subtext line-clamp-2">{tool.description}</p>
            </div>

            <div className="pt-3 border-t border-pastel-border/60 flex items-center justify-between">
              <button
                onClick={() => handleTogglePublish(tool)}
                className="text-xs font-medium text-pastel-subtext hover:text-pastel-deep flex items-center gap-1"
              >
                {tool.is_published ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{tool.is_published ? 'Ẩn' : 'Hiện'}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleStartEdit(tool)}
                  className="p-2 rounded-xl bg-pastel-bg hover:bg-pastel-light/60 text-pastel-deep transition-colors"
                  title="Sửa"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(tool.id)}
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
