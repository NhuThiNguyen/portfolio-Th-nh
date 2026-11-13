import React from 'react';
import { User, Calendar, MapPin, GraduationCap, Compass, Lightbulb, Target, Sparkles, CheckCircle2 } from 'lucide-react';
import { Profile } from '../../types';
import { CadDimensionLine, CadCorner } from '../common/CadDecorations';

interface AboutSectionProps {
  profile: Profile;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 relative scroll-mt-10">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-2">
          <CadDimensionLine label="01 // BACKGROUND & IDENTITY" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-pastel-text tracking-tight">
            Về Tôi — Cao Đức Tiến Thành
          </h2>
          <p className="text-pastel-subtext text-base max-w-2xl">
            Tư duy kỹ thuật, định hướng giải pháp thực tế và tinh thần tự học không ngừng.
          </p>
        </div>

        {/* Profile Card & Detailed Identity Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Col 1: Verified Identity Card */}
          <div className="glass-card rounded-2xl p-6 space-y-5 border border-pastel-border relative">
            <CadCorner className="top-2 right-2 rotate-90" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-pastel-light/70 flex items-center justify-center text-pastel-deep">
                <User className="w-5 h-5 text-pastel-accent" />
              </div>
              <h3 className="font-bold text-pastel-text text-base">Thông tin xác thực</h3>
            </div>

            <div className="space-y-3.5 text-sm">
              <div className="flex items-start gap-3">
                <User className="w-4 h-4 text-pastel-accent shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-pastel-subtext block">Họ và tên</span>
                  <span className="font-semibold text-pastel-text">{profile.full_name || 'Cao Đức Tiến Thành'}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-pastel-accent shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-pastel-subtext block">Ngày sinh</span>
                  <span className="font-semibold text-pastel-text">10/12/2002</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-pastel-accent shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-pastel-subtext block">Nơi sinh sống</span>
                  <span className="font-semibold text-pastel-text">Thủ Đức, TP. Hồ Chí Minh</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <GraduationCap className="w-4 h-4 text-pastel-accent shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-pastel-subtext block">Nền tảng học vấn</span>
                  <span className="font-semibold text-pastel-text">ĐH Bách khoa ĐHQG TP.HCM</span>
                  <span className="text-xs text-pastel-subtext block">THPT chuyên Nguyễn Hữu Huân</span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 2 & 3: Detailed Biography, Mindset & Aspirations */}
          <div className="md:col-span-2 glass-card rounded-2xl p-6 sm:p-8 space-y-6 border border-pastel-border flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs text-pastel-accent uppercase tracking-wider">
                <Compass className="w-4 h-4" />
                <span>Engineering Mindset & Approach</span>
              </div>
              <p className="text-pastel-text text-base sm:text-lg leading-relaxed font-normal">
                Tôi là một người yêu thích công nghệ với tư duy kỹ thuật rõ ràng. Trong quá trình học tập và làm việc, tôi đặc biệt chú trọng vào tính chính xác, khả năng làm việc với AutoCAD và chủ động tự xây dựng các công cụ nhỏ nhằm hỗ trợ công việc, giúp tối ưu hóa thời gian và quy trình xử lý.
              </p>
              <p className="text-pastel-subtext text-sm sm:text-base leading-relaxed">
                Tôi luôn duy trì sự tò mò đối với những công nghệ mới, thích tự tay giải quyết những bài toán phát sinh từ thực tế và không ngừng trau dồi cả về mặt chuyên môn kỹ thuật lẫn tư duy phân tích.
              </p>
            </div>

            {/* Core Strengths Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-pastel-border/60">
              <div className="p-3 rounded-xl bg-pastel-bg/60 border border-pastel-border/60">
                <div className="flex items-center gap-2 text-pastel-deep font-semibold text-xs mb-1">
                  <Lightbulb className="w-3.5 h-3.5 text-pastel-accent" />
                  <span>Tự học & Nghiên cứu</span>
                </div>
                <p className="text-xs text-pastel-subtext">Khả năng tự tìm tòi tài liệu, làm chủ công cụ và thích ứng công nghệ mới.</p>
              </div>

              <div className="p-3 rounded-xl bg-pastel-bg/60 border border-pastel-border/60">
                <div className="flex items-center gap-2 text-pastel-deep font-semibold text-xs mb-1">
                  <Target className="w-3.5 h-3.5 text-pastel-accent" />
                  <span>Giải pháp Thực tế</span>
                </div>
                <p className="text-xs text-pastel-subtext">Tập trung tạo ra công cụ giải quyết đúng điểm nghẽn trong công việc.</p>
              </div>

              <div className="p-3 rounded-xl bg-pastel-bg/60 border border-pastel-border/60">
                <div className="flex items-center gap-2 text-pastel-deep font-semibold text-xs mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-pastel-accent" />
                  <span>Trách nhiệm cao</span>
                </div>
                <p className="text-xs text-pastel-subtext">Độc lập, tỉ mỉ và kiên trì trong từng sản phẩm và bản vẽ kỹ thuật.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
