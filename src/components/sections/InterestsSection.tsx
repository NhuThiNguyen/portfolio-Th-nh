import React from 'react';
import { Activity, Music, Compass, Sparkles, Heart } from 'lucide-react';
import { Interest } from '../../types';
import { CadDimensionLine, CadCorner } from '../common/CadDecorations';

interface InterestsSectionProps {
  interests: Interest[];
}

export const InterestsSection: React.FC<InterestsSectionProps> = ({ interests }) => {
  const getIcon = (cat: string) => {
    switch (cat) {
      case 'sports':
        return <Activity className="w-5 h-5 text-pastel-accent" />;
      case 'music':
        return <Music className="w-5 h-5 text-pastel-accent" />;
      default:
        return <Compass className="w-5 h-5 text-pastel-accent" />;
    }
  };

  return (
    <section id="interests" className="py-20 px-4 sm:px-6 relative scroll-mt-10">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-2">
          <CadDimensionLine label="06 // LIFESTYLE & PERSONALITY" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-pastel-text tracking-tight">
            Sở Thích & Đời Sống Cá Nhân
          </h2>
          <p className="text-pastel-subtext text-base max-w-2xl">
            Sự cân bằng giữa thể lực, cảm hứng âm nhạc và tinh thần tự học không ngừng là động lực giúp tôi bền bỉ phát triển.
          </p>
        </div>

        {/* Interests Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {interests.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-3xl overflow-hidden border border-pastel-border flex flex-col justify-between group hover:border-pastel-primary transition-all duration-300"
            >
              <div>
                {/* Visual Image */}
                {item.image_url && (
                  <div className="relative aspect-4/3 overflow-hidden bg-pastel-light/40">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-pastel-deep/60 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center text-pastel-deep shadow-xs">
                      {getIcon(item.category)}
                    </div>
                  </div>
                )}

                <div className="p-6 space-y-3">
                  <span className="text-[10px] font-mono font-bold text-pastel-accent uppercase tracking-wider block">
                    {item.category.toUpperCase()}
                  </span>
                  <h3 className="text-xl font-bold text-pastel-text group-hover:text-pastel-deep transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-pastel-subtext leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Tags */}
              {item.tags && item.tags.length > 0 && (
                <div className="p-6 pt-0 flex flex-wrap gap-1.5">
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-pastel-bg text-pastel-deep border border-pastel-border"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
