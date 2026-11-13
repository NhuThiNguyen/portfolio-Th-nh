import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  mediaUrl: string;
  mediaType?: 'image' | 'video';
  caption?: string;
  onPrev?: () => void;
  onNext?: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  onClose,
  mediaUrl,
  mediaType = 'image',
  caption,
  onPrev,
  onNext,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-pastel-deep/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 p-2.5 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Navigation buttons */}
      {onPrev && (
        <button
          onClick={onPrev}
          className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors hidden sm:block"
          aria-label="Previous"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {onNext && (
        <button
          onClick={onNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors hidden sm:block"
          aria-label="Next"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Media container */}
      <div className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center">
        {mediaType === 'video' ? (
          <video
            src={mediaUrl}
            controls
            autoPlay
            className="max-h-[75vh] max-w-full rounded-2xl shadow-2xl"
          />
        ) : (
          <img
            src={mediaUrl}
            alt={caption || 'Preview'}
            className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl"
          />
        )}

        {caption && (
          <div className="mt-4 px-6 py-2.5 rounded-full bg-white/20 backdrop-blur-md text-white text-sm text-center max-w-xl">
            {caption}
          </div>
        )}
      </div>
    </div>
  );
};
