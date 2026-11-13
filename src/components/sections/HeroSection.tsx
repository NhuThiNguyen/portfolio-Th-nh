import React from 'react';
import { ArrowDown, Mail, Award, CheckCircle, Terminal, MapPin, Sparkles, Cpu } from 'lucide-react';
import { Profile } from '../../types';
import { TechnicalBadge, CadCorner } from '../common/CadDecorations';

interface HeroSectionProps {
  profile: Profile;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ profile }) => {
  const scrollToExplore = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-8 pb-16 px-4 sm:px-6">
      <div className="w-full max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Text & Hero Details (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <TechnicalBadge variant="blue">
                Engineering Mindset
              </TechnicalBadge>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                TOEIC 600 Certified
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-pastel-light/60 text-pastel-deep border border-pastel-primary/60">
                <Cpu className="w-3.5 h-3.5 text-pastel-accent" />
                AutoCAD & Work Tools
              </span>
            </div>

            {/* Main Name & Headline */}
            <div className="space-y-3">
              <div className="font-mono text-xs text-pastel-accent uppercase tracking-widest flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                <span>Personal Portfolio & Technical Showcase</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-pastel-text tracking-tight leading-[1.1]">
                {profile.full_name || 'Cao Đức Tiến Thành'}
              </h1>
              <p className="text-lg sm:text-xl font-semibold text-pastel-deep/90 leading-snug">
                "{profile.headline || 'Engineering Mindset. Technical Skills. Continuous Growth.'}"
              </p>
            </div>

            {/* Verified Introduction */}
            <p className="text-base sm:text-lg text-pastel-subtext leading-relaxed font-normal max-w-xl">
              {profile.bio ||
                'I am Cao Duc Tien Thanh, a technology-oriented individual with experience in AutoCAD and developing practical tools to support work processes. I enjoy exploring new technologies, solving problems, and continuously improving my skills.'}
            </p>

            {/* Quick Location & Education Tags */}
            <div className="pt-1 flex flex-col sm:flex-row sm:items-center gap-3 text-xs sm:text-sm text-pastel-text font-medium">
              <div className="flex items-center gap-2 text-pastel-deep bg-white/80 px-3 py-2 rounded-xl border border-pastel-border shadow-xs">
                <MapPin className="w-4 h-4 text-pastel-accent shrink-0" />
                <span>{profile.location || 'Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam'}</span>
              </div>
              <div className="flex items-center gap-2 text-pastel-deep bg-white/80 px-3 py-2 rounded-xl border border-pastel-border shadow-xs">
                <Award className="w-4 h-4 text-pastel-accent shrink-0" />
                <span>ĐHBK – ĐHQG TP.HCM & THPT Nguyễn Hữu Huân</span>
              </div>
            </div>

            {/* Call To Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <button
                onClick={scrollToExplore}
                className="px-6 py-3.5 rounded-xl bg-pastel-deep text-white font-semibold text-sm hover:bg-pastel-text transition-all duration-200 shadow-soft flex items-center gap-2 group"
              >
                <span>Khám phá Portfolio</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>
              <button
                onClick={scrollToContact}
                className="px-6 py-3.5 rounded-xl bg-white border border-pastel-border text-pastel-text font-semibold text-sm hover:bg-pastel-light/40 hover:border-pastel-primary transition-all duration-200 shadow-xs flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-pastel-accent" />
                <span>Liên hệ với tôi</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Portrait Card with CAD frame (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              <CadCorner className="top-2 left-2" />
              <CadCorner className="bottom-2 right-2 rotate-180" />

              {/* Decorative background glow */}
              <div className="absolute inset-4 rounded-3xl bg-gradient-to-tr from-pastel-primary/30 to-pastel-accent/20 blur-xl -z-10" />

              {/* Main Card */}
              <div className="glass-card rounded-3xl p-4 sm:p-5 border border-pastel-border shadow-soft-lg space-y-4">
                <div className="relative aspect-4/5 rounded-2xl overflow-hidden bg-pastel-light/40 border border-pastel-border/80">
                  <img
                    src={profile.portrait_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800'}
                    alt={profile.full_name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pastel-deep/70 via-transparent to-transparent" />

                  {/* On-image badge */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-white/90 backdrop-blur-md border border-white/60 shadow-xs flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-pastel-text">Cao Đức Tiến Thành</p>
                      <p className="text-[11px] font-mono text-pastel-accent">DOB: 10/12/2002</p>
                    </div>
                    <div className="px-2 py-1 rounded-md bg-pastel-light text-pastel-deep font-mono text-[10px] font-bold">
                      VERIFIED
                    </div>
                  </div>
                </div>

                {/* Sub-card specs */}
                <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-pastel-bg/80 border border-pastel-border/60">
                    <span className="text-pastel-subtext block text-[10px]">TIẾNG ANH</span>
                    <span className="font-bold text-pastel-deep text-sm">TOEIC 600</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-pastel-bg/80 border border-pastel-border/60">
                    <span className="text-pastel-subtext block text-[10px]">CHUYÊN MÔN</span>
                    <span className="font-bold text-pastel-deep text-sm">AutoCAD & Tools</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
