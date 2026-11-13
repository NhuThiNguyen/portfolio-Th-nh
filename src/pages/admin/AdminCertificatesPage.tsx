import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Award, ShieldCheck } from 'lucide-react';
import { DataStore } from '../../lib/dataStore';
import { Certificate } from '../../types';
import { showToast } from '../../lib/utils';

export const AdminCertificatesPage: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [editingItem, setEditingItem] = useState<Certificate | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<Certificate>>({
    title: '',
    issuing_org: '',
    score: '',
    issue_date: '',
    description: '',
    image_url: '',
    credential_url: '',
    sort_order: 1,
  });

  const loadData = async () => {
    const list = await DataStore.getCertificates();
    setCertificates(list);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStartCreate = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      issuing_org: 'ETS',
      score: '600',
      issue_date: 'Verified',
      description: '',
      image_url: '',
      credential_url: '',
      sort_order: certificates.length + 1,
    });
    setIsCreating(true);
  };

  const handleStartEdit = (cert: Certificate) => {
    setIsCreating(false);
    setEditingItem(cert);
    setFormData({ ...cert });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim()) {
      showToast('Vui lòng nhập tên chứng chỉ.', 'error');
      return;
    }

    try {
      if (isCreating) {
        await DataStore.addCertificate(formData as Omit<Certificate, 'id'>);
        showToast('Đã thêm chứng chỉ mới!', 'success');
      } else if (editingItem) {
        await DataStore.updateCertificate(editingItem.id, formData);
        showToast('Đã cập nhật chứng chỉ!', 'success');
      }
      setIsCreating(false);
      setEditingItem(null);
      loadData();
    } catch {
      showToast('Lỗi khi lưu chứng chỉ.', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa chứng chỉ này?')) {
      await DataStore.deleteCertificate(id);
      showToast('Đã xóa chứng chỉ.', 'info');
      loadData();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-pastel-text">Quản Lý Chứng Chỉ & Văn Bằng</h1>
          <p className="text-xs text-pastel-subtext mt-0.5">
            Quản lý chứng chỉ TOEIC 600 và các chứng nhận chuyên môn của Cao Đức Tiến Thành.
          </p>
        </div>
        <button
          onClick={handleStartCreate}
          className="px-4 py-2.5 rounded-xl bg-pastel-deep text-white text-xs font-bold hover:bg-pastel-text transition-colors flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm chứng chỉ mới</span>
        </button>
      </div>

      {/* Editor Modal / Form */}
      {(isCreating || editingItem) && (
        <form onSubmit={handleSave} className="p-6 rounded-3xl bg-white border-2 border-pastel-accent/40 shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b border-pastel-border/60 pb-3">
            <h3 className="font-bold text-sm text-pastel-text">
              {isCreating ? 'Thêm chứng chỉ mới' : 'Chỉnh sửa chứng chỉ'}
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
                Tên chứng chỉ *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="VD: TOEIC Listening & Reading"
                className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
                Tổ chức cấp (Issuing Org)
              </label>
              <input
                type="text"
                value={formData.issuing_org || ''}
                onChange={(e) => setFormData({ ...formData, issuing_org: e.target.value })}
                placeholder="ETS"
                className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
                Điểm số / Xếp loại (Score)
              </label>
              <input
                type="text"
                value={formData.score || ''}
                onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                placeholder="600"
                className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
                Ngày cấp / Trạng thái
              </label>
              <input
                type="text"
                value={formData.issue_date || ''}
                onChange={(e) => setFormData({ ...formData, issue_date: e.target.value })}
                placeholder="Verified"
                className="w-full px-3 py-2 rounded-xl border border-pastel-border text-xs bg-pastel-bg/40"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-pastel-text uppercase font-mono mb-1">
              Ảnh bản chụp chứng chỉ (Image URL)
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
              Mô tả chi tiết
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
              <span>Lưu chứng chỉ</span>
            </button>
          </div>
        </form>
      )}

      {/* List */}
      <div className="space-y-3">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="p-5 rounded-2xl bg-white border border-pastel-border shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-pastel-accent uppercase">
                    {cert.issuing_org || 'ORGANIZATION'}
                  </span>
                  {cert.score && (
                    <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                      SCORE: {cert.score}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-base text-pastel-text">{cert.title}</h3>
                <p className="text-xs text-pastel-subtext max-w-xl">{cert.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                onClick={() => handleStartEdit(cert)}
                className="p-2 rounded-xl bg-pastel-bg hover:bg-pastel-light/60 text-pastel-deep transition-colors"
                title="Sửa"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(cert.id)}
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
