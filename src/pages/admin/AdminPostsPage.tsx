import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, FileText, Eye, EyeOff, Calendar } from 'lucide-react';
import { DataStore } from '../../lib/dataStore';
import { Post } from '../../types';
import { showToast, formatDate } from '../../lib/utils';

export const AdminPostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingItem, setEditingItem] = useState<Post | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<Post>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    cover_image_url: '',
    category_name: 'Engineering & Workflow',
    tags: [],
    status: 'published',
  });
  const [tagsInput, setTagsInput] = useState('');

  const loadData = async () => {
    const list = await DataStore.getPosts(false);
    setPosts(list);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStartCreate = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      slug: `bai-viet-${Date.now()}`,
      excerpt: '',
      content: '',
      cover_image_url: '',
      category_name: 'Engineering & Workflow',
      tags: [],
      status: 'published',
    });
    setTagsInput('');
    setIsCreating(true);
  };

  const handleStartEdit = (post: Post) => {
    setIsCreating(false);
    setEditingItem(post);
    setFormData({ ...post });
    setTagsInput(post.tags?.join(', ') || '');
  };

  const handleTitleChange = (val: string) => {
    const slug = val
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');

    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: prev.slug && !isCreating ? prev.slug : slug,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim() || !formData.content?.trim()) {
      showToast('Vui lòng nhập tiêu đề và nội dung bài viết.', 'error');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const payload = {
      ...formData,
      tags,
      published_at: formData.published_at || new Date().toISOString(),
    };

    try {
      if (isCreating) {
        await DataStore.addPost(payload as Omit<Post, 'id' | 'views_count'>);
        showToast('Đã tạo bài viết mới!', 'success');
      } else if (editingItem) {
        await DataStore.updatePost(editingItem.id, payload);
        showToast('Đã cập nhật bài viết!', 'success');
      }
      setIsCreating(false);
      setEditingItem(null);
      loadData();
    } catch {
      showToast('Lỗi khi lưu bài viết.', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      await DataStore.deletePost(id);
      showToast('Đã xóa bài viết.', 'info');
      loadData();
    }
  };

  const handleTogglePublish = async (post: Post) => {
    const nextStatus = post.status === 'published' ? 'draft' : 'published';
    await DataStore.updatePost(post.id, { status: nextStatus });
    showToast(`Đã chuyển bài viết sang trạng thái: ${nextStatus.toUpperCase()}`, 'info');
    loadData();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-pastel-text">Quản Lý Bài Viết & Nhật Ký (Journal)</h1>
          <p className="text-xs text-pastel-subtext mt-0.5">
            Viết và biên tập bài viết chia sẻ về AutoCAD, kinh nghiệm tự phát triển công cụ và tư duy kỹ thuật.
          </p>
        </div>
        <button
          onClick={handleStartCreate}
          className="px-4 py-2.5 rounded-xl bg-pastel-deep text-white text-xs font-bold hover:bg-pastel-text transition-colors flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Tạo bài viết mới</span>
        </button>
      </div>

      {/* Editor Modal / Form */}
      {(isCreating || editingItem) && (
        <form onSubmit={handleSave} className="p-6 rounded-3xl bg-white border-2 border-pastel-accent/40 shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b border-pastel-border/60 pb-3">
            <h3 className="font-bold text-sm text-pastel-text">
              {isCreating ? 'Tạo bài viết mới' : 'Biên tập bài viết'}
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
                Tiêu đề bài viết *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Nhập tiêu đề bài viết..."
                className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
                Đường dẫn tĩnh (Slug)
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
                Chuyên mục
              </label>
              <input
                type="text"
                value={formData.category_name || ''}
                onChange={(e) => setFormData({ ...formData, category_name: e.target.value })}
                placeholder="Engineering & Workflow"
                className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
                Ảnh bìa bài viết (Cover URL)
              </label>
              <input
                type="text"
                value={formData.cover_image_url || ''}
                onChange={(e) => setFormData({ ...formData, cover_image_url: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
                Trạng thái xuất bản
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40 font-medium"
              >
                <option value="published">Xuất bản (Published)</option>
                <option value="draft">Bản nháp (Draft)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
              Đoạn tóm tắt (Excerpt)
            </label>
            <textarea
              rows={2}
              value={formData.excerpt || ''}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
              Nội dung bài viết * (Hỗ trợ xuống dòng và định dạng văn bản chi tiết)
            </label>
            <textarea
              rows={7}
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Soạn thảo nội dung bài viết..."
              className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40 font-mono"
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
              placeholder="AutoCAD, Tự động hóa, Tư duy kỹ thuật"
              className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40"
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
              <span>Lưu bài viết</span>
            </button>
          </div>
        </form>
      )}

      {/* List */}
      <div className="space-y-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-5 rounded-2xl bg-white border border-pastel-border shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-pastel-light/60 text-pastel-deep uppercase">
                  {post.category_name || 'Journal'}
                </span>
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    post.status === 'published' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {post.status.toUpperCase()}
                </span>
                <span className="text-xs font-mono text-pastel-subtext flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(post.published_at)}
                </span>
              </div>
              <h3 className="font-bold text-base text-pastel-text">{post.title}</h3>
              <p className="text-xs text-pastel-subtext line-clamp-2 max-w-2xl">{post.excerpt}</p>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                onClick={() => handleTogglePublish(post)}
                className="p-2 rounded-xl bg-pastel-bg hover:bg-pastel-light/60 text-pastel-deep transition-colors"
                title={post.status === 'published' ? 'Chuyển về nháp' : 'Xuất bản công khai'}
              >
                {post.status === 'published' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button
                onClick={() => handleStartEdit(post)}
                className="p-2 rounded-xl bg-pastel-bg hover:bg-pastel-light/60 text-pastel-deep transition-colors"
                title="Sửa"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(post.id)}
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
