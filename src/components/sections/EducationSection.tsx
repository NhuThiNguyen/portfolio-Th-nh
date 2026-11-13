import React from 'react';
import { GraduationCap, CheckCircle, School, BookOpen } from 'lucide-react';
import { Education } from '../../types';
import { CadDimensionLine, CadCorner } from '../common/CadDecorations';

interface EducationSectionProps {
  educationList: Education[];
}

export const EducationSection: React.FC<EducationSectionProps> = ({ educationList }) => {
  return (
    <section id="education" className="py-20 px-4 sm:px-6 relative scroll-mt-10">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-2">
          <CadDimensionLine label="02 // ACADEMIC TIMELINE" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-pastel-text tracking-tight">
            Học Vấn & Quá Trình Đào Tạo
          </h2>
          <p className="text-pastel-subtext text-base max-w-2xl">
            Lộ trình học tập nền tảng tại các ngôi trường hàng đầu, tôi luyện tư duy logic và phong cách làm việc kỹ thuật chuẩn xác.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-pastel-primary/50 space-y-10 ml-2 sm:ml-4">
          {educationList.map((item, idx) => (
            <div key={item.id} className="relative group">
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-white border-2 border-pastel-accent flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                <span className="w-2 h-2 rounded-full bg-pastel-accent" />
              </div>

              {/* Card Container */}
              <div className="glass-card rounded-2xl p-6 sm:p-7 border border-pastel-border relative space-y-4">
                <CadCorner className="top-2 right-2 rotate-90" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-pastel-light/60 flex items-center justify-center text-pastel-deep shrink-0">
                      {item.level.toLowerCase().includes('university') ? (
                        <GraduationCap className="w-5 h-5 text-pastel-accent" />
                      ) : (
                        <School className="w-5 h-5 text-pastel-accent" />
                      )}
                    </div>
                    <div>
                      <span className="text-xs font-mono font-semibold text-pastel-accent uppercase tracking-wider block">
                        {item.level}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-pastel-text">
                        {item.institution}
                      </h3>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle className="w-3.5 h-3.5" />
                      {item.status}
                    </span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-pastel-subtext leading-relaxed">
                  {item.description}
                </p>

                {/* Additional verified highlights */}
                <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono text-pastel-subtext">
                  <span className="px-2.5 py-1 rounded-lg bg-pastel-bg border border-pastel-border/60">
                    STATUS: {item.status.toUpperCase()}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-pastel-bg border border-pastel-border/60">
                    VERIFIED INSTITUTION
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
