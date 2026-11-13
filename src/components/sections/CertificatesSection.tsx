import React, { useState } from 'react';
import { Award, CheckCircle, ExternalLink, Eye, ShieldCheck } from 'lucide-react';
import { Certificate } from '../../types';
import { CadDimensionLine, CadCorner } from '../common/CadDecorations';
import { Lightbox } from '../common/Lightbox';

interface CertificatesSectionProps {
  certificates: Certificate[];
}

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({ certificates }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="certificates" className="py-20 px-4 sm:px-6 relative scroll-mt-10">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-2">
          <CadDimensionLine label="05 // CREDENTIALS & CERTIFICATIONS" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-pastel-text tracking-tight">
            Chứng Chỉ & Văn Bằng
          </h2>
          <p className="text-pastel-subtext text-base max-w-2xl">
            Các chứng chỉ chuẩn hóa chứng minh năng lực ngôn ngữ và trình độ kỹ thuật phục vụ công việc.
          </p>
        </div>

        {/* Certificate Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="glass-card rounded-3xl p-6 sm:p-8 border border-pastel-border relative space-y-6 flex flex-col justify-between"
            >
              <CadCorner className="top-2 right-2 rotate-90" />

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200 shadow-xs">
                    <Award className="w-6 h-6" />
                  </div>
                  {cert.score && (
                    <div className="text-right">
                      <span className="text-[10px] font-mono text-pastel-subtext block uppercase">ĐIỂM ĐẠT ĐƯỢC</span>
                      <span className="text-xl font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200 inline-block font-mono">
                        {cert.score}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-pastel-accent font-semibold uppercase">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{cert.issuing_org || 'Tổ chức cấp chứng chỉ'}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-pastel-text mt-1">
                    {cert.title}
                  </h3>
                </div>

                <p className="text-sm text-pastel-subtext leading-relaxed">
                  {cert.description}
                </p>

                {/* Certificate Preview Image */}
                {cert.image_url && (
                  <div
                    onClick={() => setSelectedImage(cert.image_url || null)}
                    className="group relative aspect-16/9 rounded-2xl overflow-hidden bg-pastel-light/40 border border-pastel-border cursor-pointer shadow-xs"
                  >
                    <img
                      src={cert.image_url}
                      alt={cert.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-pastel-deep/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-2 text-xs font-medium">
                      <Eye className="w-4 h-4" />
                      <span>Xem ảnh chứng chỉ gốc</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Meta */}
              <div className="pt-4 border-t border-pastel-border/60 flex items-center justify-between text-xs font-mono text-pastel-subtext">
                <span>TRẠNG THÁI: XÁC THỰC</span>
                <span className="text-pastel-deep font-semibold">TOEIC 600</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Lightbox
        isOpen={Boolean(selectedImage)}
        onClose={() => setSelectedImage(null)}
        mediaUrl={selectedImage || ''}
        caption="Bản chụp chứng chỉ xác thực"
      />
    </section>
  );
};
