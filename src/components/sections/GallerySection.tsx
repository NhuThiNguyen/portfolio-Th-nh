import React, { useState, useMemo } from 'react';
import { Image as ImageIcon, Eye, Filter } from 'lucide-react';
import { MediaItem } from '../../types';
import { CadDimensionLine } from '../common/CadDecorations';
import { Lightbox } from '../common/Lightbox';

interface GallerySectionProps {
  mediaList: MediaItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ mediaList }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    mediaList.forEach((m) => {
      if (m.category) set.add(m.category);
    });
    return ['All', ...Array.from(set)];
  }, [mediaList]);

  const filtered = useMemo(() => {
    if (selectedCategory === 'All') return mediaList;
    return mediaList.filter((m) => m.category === selectedCategory);
  }, [mediaList, selectedCategory]);

  const currentMedia = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 relative scroll-mt-10">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-2">
          <CadDimensionLine label="08 // PHOTOGRAPHY & MEDIA" />
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-pastel-text tracking-tight">
                Thư Viện Ảnh & Khoảnh Khắc
              </h2>
              <p className="text-pastel-subtext text-base max-w-2xl mt-1">
                Lưu giữ những góc làm việc kỹ thuật, bản vẽ CAD, kỷ niệm học tập và nhịp sống thường ngày.
              </p>
            </div>
            <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-pastel-light/60 text-pastel-deep border border-pastel-primary/50 self-start sm:self-auto">
              TOTAL: {mediaList.length} ITEMS
            </span>
          </div>
        </div>

        {/* Categories Tab */}
        {categories.length > 1 && (
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="w-4 h-4 text-pastel-subtext mr-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-pastel-deep text-white font-semibold shadow-xs'
                    : 'bg-white border border-pastel-border text-pastel-text hover:bg-pastel-light/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Masonry / Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(index)}
              className="group glass-card rounded-2xl overflow-hidden border border-pastel-border cursor-pointer relative hover:border-pastel-primary transition-all duration-300"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-pastel-light/30">
                <img
                  src={item.file_url}
                  alt={item.caption || item.file_name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-pastel-deep/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-4 text-center">
                  <Eye className="w-6 h-6 mb-2 text-pastel-primary" />
                  <span className="text-xs font-medium line-clamp-2">
                    {item.caption || item.file_name}
                  </span>
                </div>
              </div>

              {item.caption && (
                <div className="p-3.5 border-t border-pastel-border/60 bg-white/80">
                  <p className="text-xs text-pastel-text line-clamp-1 font-medium">{item.caption}</p>
                  <span className="text-[10px] font-mono text-pastel-subtext uppercase">
                    {item.category || 'General'}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {currentMedia && (
        <Lightbox
          isOpen={lightboxIndex !== null}
          onClose={() => setLightboxIndex(null)}
          mediaUrl={currentMedia.file_url}
          mediaType={currentMedia.file_type}
          caption={currentMedia.caption}
          onPrev={() =>
            setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filtered.length - 1))
          }
          onNext={() =>
            setLightboxIndex((prev) => (prev !== null && prev < filtered.length - 1 ? prev + 1 : 0))
          }
        />
      )}
    </section>
  );
};
