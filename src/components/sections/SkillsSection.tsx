import React, { useState } from 'react';
import { Wrench, Award, CheckCircle2, Cpu, Eye, Image as ImageIcon, ChevronRight } from 'lucide-react';
import { Skill } from '../../types';
import { CadDimensionLine, CadCorner } from '../common/CadDecorations';
import { Lightbox } from '../common/Lightbox';

interface SkillsSectionProps {
  skills: Skill[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const autocadSkill = skills.find(s => s.name.toLowerCase().includes('autocad')) || skills[0];
  const toolsSkill = skills.find(s => s.name.toLowerCase().includes('tool')) || skills[1];
  const englishSkill = skills.find(s => s.name.toLowerCase().includes('toeic')) || skills[2];
  const softSkills = skills.filter(s => s.category === 'soft_skills');
  const otherSkills = skills.filter(s => s !== autocadSkill && s !== toolsSkill && s !== englishSkill && s.category !== 'soft_skills');

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 relative scroll-mt-10">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-2">
          <CadDimensionLine label="03 // COMPETENCY & EXPERTISE" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-pastel-text tracking-tight">
            Kỹ Năng & Năng Lực Kỹ Thuật
          </h2>
          <p className="text-pastel-subtext text-base max-w-2xl">
            Tập trung vào tính ứng dụng thực tế: thành thạo AutoCAD, tự xây dựng giải pháp hỗ trợ công việc và năng lực ngoại ngữ chuẩn mực.
          </p>
        </div>

        {/* Featured Skill: AutoCAD (Full Card Showcase) */}
        {autocadSkill && (
          <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-pastel-primary/60 relative overflow-hidden space-y-6">
            <CadCorner className="top-3 left-3" />
            <CadCorner className="bottom-3 right-3 rotate-180" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-pastel-light flex items-center justify-center text-pastel-deep border border-pastel-primary/50 shadow-soft">
                  <Wrench className="w-7 h-7 text-pastel-accent" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono bg-pastel-accent/15 text-pastel-deep uppercase border border-pastel-accent/30">
                      Primary Skill
                    </span>
                    <span className="text-xs font-mono text-pastel-subtext">EXPERIENCED</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-pastel-text mt-1">
                    {autocadSkill.name}
                  </h3>
                </div>
              </div>
            </div>

            <p className="text-sm sm:text-base text-pastel-text leading-relaxed font-normal max-w-3xl">
              {autocadSkill.description ||
                'Kinh nghiệm sử dụng AutoCAD trong đọc hiểu, thiết kế và tối ưu bản vẽ kỹ thuật, đảm bảo độ chuẩn xác và tiêu chuẩn kỹ thuật cao.'}
            </p>

            {/* AutoCAD Work Screenshots Preview */}
            {autocadSkill.screenshots && autocadSkill.screenshots.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-mono text-pastel-accent font-semibold uppercase">
                  <ImageIcon className="w-4 h-4" />
                  <span>Hình ảnh minh họa thực tế bản vẽ CAD</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {autocadSkill.screenshots.map((imgUrl, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedImage(imgUrl)}
                      className="group relative aspect-16/9 rounded-xl overflow-hidden bg-pastel-light/40 border border-pastel-border cursor-pointer shadow-xs"
                    >
                      <img
                        src={imgUrl}
                        alt={`AutoCAD work screenshot ${i + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-pastel-deep/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-2 font-medium text-xs">
                        <Eye className="w-4 h-4" />
                        <span>Xem chi tiết phóng to</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2-Column Grid: Self-developed Tools Experience & TOEIC 600 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Box 1: Self-developed Tools */}
          {toolsSkill && (
            <div className="glass-card rounded-2xl p-6 sm:p-7 border border-pastel-border space-y-4 relative flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-pastel-light/60 flex items-center justify-center text-pastel-deep">
                    <Cpu className="w-5 h-5 text-pastel-accent" />
                  </div>
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-pastel-accent/15 text-pastel-deep border border-pastel-accent/30">
                    Practical Solution
                  </span>
                </div>
                <h3 className="text-xl font-bold text-pastel-text">{toolsSkill.name}</h3>
                <p className="text-sm text-pastel-subtext leading-relaxed">
                  {toolsSkill.description ||
                    'Độc lập phát triển các công cụ hỗ trợ quy trình công việc, tự động hóa tác vụ lặp đi lặp lại nhằm nâng cao năng suất và độ chính xác.'}
                </p>
              </div>

              <div className="pt-4 border-t border-pastel-border/60 space-y-2 text-xs font-medium text-pastel-deep">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-pastel-accent shrink-0" />
                  <span>Chủ động nhận diện điểm nghẽn trong quy trình thực tế</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-pastel-accent shrink-0" />
                  <span>Xây dựng script/utility hỗ trợ công việc chuẩn xác</span>
                </div>
              </div>
            </div>
          )}

          {/* Box 2: English TOEIC 600 */}
          {englishSkill && (
            <div className="glass-card rounded-2xl p-6 sm:p-7 border border-pastel-border space-y-4 relative flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                    SCORE: 600
                  </span>
                </div>
                <h3 className="text-xl font-bold text-pastel-text">Tiếng Anh — {englishSkill.name}</h3>
                <p className="text-sm text-pastel-subtext leading-relaxed">
                  {englishSkill.description ||
                    'Chứng chỉ tiếng Anh quốc tế TOEIC đạt 600 điểm, tự tin đọc hiểu tài liệu kỹ thuật chuyên ngành và giao tiếp công việc.'}
                </p>
              </div>

              <div className="pt-4 border-t border-pastel-border/60 flex items-center justify-between text-xs font-mono text-pastel-subtext">
                <span>ETS VERIFIED CERTIFICATE</span>
                <span className="text-pastel-accent font-semibold">TOEIC 600</span>
              </div>
            </div>
          )}
        </div>

        {/* Soft Skills & Working Mindset */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-pastel-border space-y-5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-pastel-accent font-bold uppercase tracking-wider">
              Tư Duy & Kỹ Năng Bổ Trợ
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {softSkills.map((skill) => (
              <div
                key={skill.id}
                className="p-4 rounded-xl bg-pastel-bg/50 border border-pastel-border/70 space-y-2 hover:border-pastel-primary transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-pastel-accent" />
                  <h4 className="font-bold text-sm text-pastel-text">{skill.name}</h4>
                </div>
                <p className="text-xs text-pastel-subtext leading-relaxed">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Lightbox Modal for Screenshots */}
      <Lightbox
        isOpen={Boolean(selectedImage)}
        onClose={() => setSelectedImage(null)}
        mediaUrl={selectedImage || ''}
        caption="Ảnh thực tế minh họa kỹ năng bản vẽ AutoCAD"
      />
    </section>
  );
};
