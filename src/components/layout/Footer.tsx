import React from 'react';
import { ArrowUp, Heart, Terminal, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mt-20 border-t border-pastel-border bg-white/70 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1 */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-pastel-deep text-white flex items-center justify-center font-bold text-xs">
                TT
              </div>
              <span className="font-extrabold text-base text-pastel-text">Cao Đức Tiến Thành</span>
            </div>
            <p className="text-sm text-pastel-subtext max-w-md leading-relaxed">
              Engineering Mindset. Technical Skills. Continuous Growth.
              Hồ sơ năng lực cá nhân, các công cụ tự phát triển, chứng chỉ và nhật ký công nghệ.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-pastel-accent">
              <Terminal className="w-3.5 h-3.5" />
              <span>Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam</span>
            </div>
          </div>

          {/* Col 2: Education & Verified Highlights */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-pastel-text uppercase tracking-wider font-mono">
              Học vấn & Chứng chỉ
            </h4>
            <ul className="text-xs text-pastel-subtext space-y-1.5">
              <li>• ĐH Bách khoa – ĐHQG TP.HCM</li>
              <li>• THPT chuyên Nguyễn Hữu Huân</li>
              <li>• Chứng chỉ TOEIC 600</li>
              <li>• Kỹ năng AutoCAD & Tools</li>
            </ul>
          </div>

          {/* Col 3: Portal Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-pastel-text uppercase tracking-wider font-mono">
              Hệ thống & CMS
            </h4>
            <ul className="text-xs space-y-1.5">
              <li>
                <Link to="/admin/login" className="text-pastel-subtext hover:text-pastel-deep flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-pastel-accent" />
                  <span>Cổng quản trị CMS</span>
                </Link>
              </li>
              <li>
                <a href="#memories" className="text-pastel-subtext hover:text-pastel-deep">
                  • Album & Kỷ niệm bảo mật
                </a>
              </li>
              <li>
                <a href="#tools" className="text-pastel-subtext hover:text-pastel-deep">
                  • Kho công cụ tự phát triển
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-pastel-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-pastel-subtext">
          <p>© {new Date().getFullYear()} Cao Đức Tiến Thành. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 font-mono text-[11px]">
              Tối ưu cho hiệu năng và bảo mật <Heart className="w-3 h-3 text-rose-400 fill-rose-400 inline" />
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-pastel-light/60 text-pastel-deep hover:bg-pastel-accent/30 transition-colors"
              aria-label="Về đầu trang"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
