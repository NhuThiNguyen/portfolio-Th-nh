import React, { useState } from 'react';
import { Cpu, ExternalLink, Download, ArrowRight, CheckCircle, Code, Layers, X, Eye } from 'lucide-react';
import { Tool } from '../../types';
import { CadDimensionLine, CadCorner } from '../common/CadDecorations';

interface ToolsSectionProps {
  tools: Tool[];
}

export const ToolsSection: React.FC<ToolsSectionProps> = ({ tools }) => {
  const [activeModalTool, setActiveModalTool] = useState<Tool | null>(null);

  return (
    <section id="tools" className="py-20 px-4 sm:px-6 relative scroll-mt-10">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-2">
          <CadDimensionLine label="04 // SELF-DEVELOPED WORK TOOLS" />
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-pastel-text tracking-tight">
                Công Cụ Tự Phát Triển
              </h2>
              <p className="text-pastel-subtext text-base max-w-2xl mt-1">
                Các giải pháp tiện ích do tác giả độc lập thiết kế nhằm tự động hóa tác vụ, cải thiện độ chuẩn xác và nâng cao hiệu suất làm việc.
              </p>
            </div>
            <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-pastel-light/60 text-pastel-deep border border-pastel-primary/50 self-start sm:self-auto">
              TOTAL: {tools.length} TOOLS
            </span>
          </div>
        </div>

        {/* Tools Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="glass-card rounded-3xl overflow-hidden border border-pastel-border flex flex-col justify-between group hover:border-pastel-primary transition-all duration-300"
            >
              <div>
                {/* Thumbnail Image */}
                <div className="relative aspect-16/9 overflow-hidden bg-pastel-light/40 border-b border-pastel-border/60">
                  <img
                    src={tool.thumbnail_url || 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=800'}
                    alt={tool.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-white/90 backdrop-blur-md text-pastel-deep border border-white/60 shadow-xs">
                      {tool.category || 'Work Utility'}
                    </span>
                  </div>
                  {tool.dev_date && (
                    <div className="absolute bottom-3 right-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-pastel-deep/75 text-white backdrop-blur-xs">
                        {tool.dev_date}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7 space-y-4">
                  <h3 className="text-xl font-bold text-pastel-text group-hover:text-pastel-deep transition-colors">
                    {tool.name}
                  </h3>

                  <p className="text-sm text-pastel-subtext leading-relaxed line-clamp-3">
                    {tool.description}
                  </p>

                  {/* Solves */}
                  {tool.problem_solved && (
                    <div className="p-3 rounded-xl bg-pastel-bg/80 border border-pastel-border/60 text-xs space-y-1">
                      <span className="font-semibold text-pastel-deep block">Vấn đề giải quyết:</span>
                      <p className="text-pastel-subtext leading-relaxed line-clamp-2">{tool.problem_solved}</p>
                    </div>
                  )}

                  {/* Technologies tags */}
                  {tool.technologies && tool.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {tool.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-pastel-light/40 text-pastel-deep border border-pastel-border"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 pt-0 border-t border-pastel-border/40 mt-2 flex items-center justify-between">
                <button
                  onClick={() => setActiveModalTool(tool)}
                  className="text-xs font-semibold text-pastel-deep hover:text-pastel-accent flex items-center gap-1.5 transition-colors py-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>Chi tiết & Tính năng</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center gap-2">
                  {tool.demo_url && (
                    <a
                      href={tool.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-pastel-light/60 text-pastel-deep hover:bg-pastel-accent/20 transition-colors"
                      title="Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {tool.download_url && (
                    <a
                      href={tool.download_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-pastel-light/60 text-pastel-deep hover:bg-pastel-accent/20 transition-colors"
                      title="Tải về"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tool Detail Modal */}
      {activeModalTool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-pastel-deep/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-pastel-border animate-in zoom-in-95 duration-200 space-y-6">
            <button
              onClick={() => setActiveModalTool(null)}
              className="absolute top-5 right-5 text-pastel-subtext hover:text-pastel-deep p-2 rounded-xl bg-pastel-bg hover:bg-pastel-light transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2 pr-8">
              <span className="px-3 py-1 rounded-md text-xs font-mono font-bold bg-pastel-light text-pastel-deep border border-pastel-primary/60 inline-block">
                {activeModalTool.category || 'Engineering Tool'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-pastel-text">
                {activeModalTool.name}
              </h3>
            </div>

            {/* Screenshots Gallery */}
            {activeModalTool.screenshots && activeModalTool.screenshots.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-mono font-semibold text-pastel-accent uppercase">
                  Hình ảnh giao diện & bản vẽ công cụ
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeModalTool.screenshots.map((s, i) => (
                    <img
                      key={i}
                      src={s}
                      alt={`Screenshot ${i + 1}`}
                      className="rounded-xl border border-pastel-border object-cover w-full h-48"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Purpose & Problem Solved */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-pastel-bg/80 border border-pastel-border/60 space-y-1.5">
                <span className="text-xs font-bold text-pastel-deep uppercase font-mono">Mục đích:</span>
                <p className="text-sm text-pastel-text leading-relaxed">{activeModalTool.purpose}</p>
              </div>
              <div className="p-4 rounded-2xl bg-pastel-bg/80 border border-pastel-border/60 space-y-1.5">
                <span className="text-xs font-bold text-pastel-deep uppercase font-mono">Bài toán giải quyết:</span>
                <p className="text-sm text-pastel-text leading-relaxed">{activeModalTool.problem_solved}</p>
              </div>
            </div>

            {/* Main Features */}
            {activeModalTool.main_features && activeModalTool.main_features.length > 0 && (
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold text-pastel-accent uppercase">
                  Tính năng chính
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeModalTool.main_features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-pastel-text">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies */}
            {activeModalTool.technologies && activeModalTool.technologies.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-pastel-border/60">
                <span className="text-xs font-mono font-semibold text-pastel-subtext uppercase">
                  Công nghệ & Môi trường:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeModalTool.technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-pastel-light/60 text-pastel-deep border border-pastel-primary/50"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Bottom Actions */}
            <div className="pt-4 border-t border-pastel-border/60 flex items-center justify-between">
              <div className="text-xs font-mono text-pastel-subtext">
                DEV STATUS: INDEPENDENT PRODUCTION
              </div>
              <button
                onClick={() => setActiveModalTool(null)}
                className="px-5 py-2.5 rounded-xl bg-pastel-deep text-white text-xs font-semibold hover:bg-pastel-text transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
