import React, { useState } from 'react';
import { Mail, Phone, MapPin, Copy, Check, Send, Sparkles, MessageSquare, AlertCircle } from 'lucide-react';
import { Profile } from '../../types';
import { DataStore } from '../../lib/dataStore';
import { showToast } from '../../lib/utils';
import { CadDimensionLine, CadCorner } from '../common/CadDecorations';

interface ContactSectionProps {
  profile: Profile;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const phoneNumber = profile.phone || '0972456724';
  const emailAddress = profile.email || '';

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopiedPhone(true);
    showToast('Đã sao chép số điện thoại!', 'success');
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleCopyEmail = () => {
    if (!emailAddress) return;
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    showToast('Đã sao chép email!', 'success');
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Vui lòng điền đầy đủ họ tên, email và nội dung tin nhắn.');
      return;
    }

    // Basic email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Định dạng email không hợp lệ.');
      return;
    }

    setError('');
    setSubmitting(true);

    try {
      await DataStore.submitContactMessage({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        subject: subject.trim() || undefined,
        message: message.trim(),
      });

      setSubmitted(true);
      showToast('Gửi tin nhắn liên hệ thành công!', 'success');
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    } catch {
      setError('Không thể gửi tin nhắn lúc này. Vui lòng thử lại sau.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 relative scroll-mt-10">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-2">
          <CadDimensionLine label="10 // DIRECT CONNECTION & INQUIRIES" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-pastel-text tracking-tight">
            Liên Hệ & Kết Nối Công Việc
          </h2>
          <p className="text-pastel-subtext text-base max-w-2xl">
            Tôi luôn sẵn sàng đón nhận những cơ hội hợp tác, trao đổi kỹ thuật hoặc các bài toán phát triển giải pháp thực tế.
          </p>
        </div>

        {/* 2-Column Layout: Direct Details + Contact Form */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Direct Details (5 cols) */}
          <div className="md:col-span-5 glass-card rounded-3xl p-6 sm:p-8 border border-pastel-border space-y-6 relative">
            <CadCorner className="top-2 left-2" />
            
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-pastel-accent uppercase tracking-wider">
                THÔNG TIN TRỰC TIẾP
              </span>
              <h3 className="text-xl font-bold text-pastel-text">
                {profile.full_name || 'Cao Đức Tiến Thành'}
              </h3>
              <p className="text-xs text-pastel-subtext leading-relaxed">
                Bạn có thể gọi điện trực tiếp, gửi tin nhắn hoặc để lại lời nhắn qua biểu mẫu bên cạnh.
              </p>
            </div>

            <div className="space-y-4 pt-2 border-t border-pastel-border/60 text-sm">
              {/* Phone */}
              <div className="p-4 rounded-2xl bg-pastel-bg/80 border border-pastel-border/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-pastel-subtext uppercase">SỐ ĐIỆN THOẠI</span>
                  <button
                    onClick={handleCopyPhone}
                    className="text-xs font-medium text-pastel-deep hover:text-pastel-accent flex items-center gap-1 transition-colors"
                  >
                    {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPhone ? 'Đã chép' : 'Sao chép'}</span>
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-pastel-light flex items-center justify-center text-pastel-deep shrink-0">
                    <Phone className="w-4 h-4 text-pastel-accent" />
                  </div>
                  <a
                    href={`tel:${phoneNumber}`}
                    className="font-bold text-base text-pastel-text hover:text-pastel-accent transition-colors"
                  >
                    {phoneNumber}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="p-4 rounded-2xl bg-pastel-bg/80 border border-pastel-border/60 space-y-2">
                <span className="text-xs font-mono text-pastel-subtext uppercase block">ĐỊA CHỈ KHU VỰC</span>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-pastel-light flex items-center justify-center text-pastel-deep shrink-0">
                    <MapPin className="w-4 h-4 text-pastel-accent" />
                  </div>
                  <span className="font-medium text-sm text-pastel-text">
                    {profile.location || 'Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam'}
                  </span>
                </div>
              </div>

              {/* Email (Editable through Admin) */}
              {emailAddress ? (
                <div className="p-4 rounded-2xl bg-pastel-bg/80 border border-pastel-border/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-pastel-subtext uppercase">EMAIL LIÊN HỆ</span>
                    <button
                      onClick={handleCopyEmail}
                      className="text-xs font-medium text-pastel-deep hover:text-pastel-accent flex items-center gap-1 transition-colors"
                    >
                      {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedEmail ? 'Đã chép' : 'Sao chép'}</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-pastel-light flex items-center justify-center text-pastel-deep shrink-0">
                      <Mail className="w-4 h-4 text-pastel-accent" />
                    </div>
                    <a
                      href={`mailto:${emailAddress}`}
                      className="font-bold text-sm text-pastel-text hover:text-pastel-accent transition-colors break-all"
                    >
                      {emailAddress}
                    </a>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-pastel-bg/60 border border-pastel-border/40 text-xs text-pastel-subtext">
                  Email cá nhân có thể cập nhật linh hoạt thông qua trang quản trị CMS.
                </div>
              )}
            </div>
          </div>

          {/* Contact Form (7 cols) */}
          <div className="md:col-span-7 glass-card rounded-3xl p-6 sm:p-8 border border-pastel-border space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-pastel-light/60 flex items-center justify-center text-pastel-deep">
                <MessageSquare className="w-5 h-5 text-pastel-accent" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-pastel-text">Gửi tin nhắn trực tuyến</h3>
                <p className="text-xs text-pastel-subtext">Biểu mẫu xác thực và lưu trữ tin nhắn an toàn</p>
              </div>
            </div>

            {submitted ? (
              <div className="p-8 text-center rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-base text-emerald-900">Cảm ơn bạn đã liên hệ!</h4>
                <p className="text-xs text-emerald-700 max-w-md mx-auto">
                  Tin nhắn của bạn đã được chuyển đến hòm thư quản trị viên của Cao Đức Tiến Thành. Tôi sẽ phản hồi sớm nhất có thể.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 px-4 py-2 rounded-xl bg-white border border-emerald-300 text-emerald-800 text-xs font-semibold hover:bg-emerald-100 transition-colors"
                >
                  Gửi tin nhắn khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-pastel-text mb-1 uppercase font-mono">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-pastel-border focus:border-pastel-accent outline-none text-sm bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-pastel-text mb-1 uppercase font-mono">
                      Email của bạn *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-pastel-border focus:border-pastel-accent outline-none text-sm bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-pastel-text mb-1 uppercase font-mono">
                      Số điện thoại (tùy chọn)
                    </label>
                    <input
                      type="tel"
                      placeholder="09xx xxx xxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-pastel-border focus:border-pastel-accent outline-none text-sm bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-pastel-text mb-1 uppercase font-mono">
                      Chủ đề
                    </label>
                    <input
                      type="text"
                      placeholder="Trao đổi kỹ thuật, dự án..."
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-pastel-border focus:border-pastel-accent outline-none text-sm bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-pastel-text mb-1 uppercase font-mono">
                    Nội dung tin nhắn *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Viết nội dung tin nhắn hoặc câu hỏi của bạn tại đây..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-pastel-border focus:border-pastel-accent outline-none text-sm bg-white resize-none"
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl bg-pastel-deep text-white font-semibold text-sm hover:bg-pastel-text transition-all duration-200 shadow-soft flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Đang gửi...' : 'Gửi lời nhắn ngay'}</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
