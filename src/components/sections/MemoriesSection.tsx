import React, { useState } from 'react';
import { FolderHeart, Lock, Globe, Shield, Eye, Images, Sparkles, X } from 'lucide-react';
import { Album, MediaItem } from '../../types';
import { DataStore } from '../../lib/dataStore';
import { useAuth } from '../../context/AuthContext';
import { CadDimensionLine, CadCorner } from '../common/CadDecorations';
import { UnlockAlbumModal } from '../common/UnlockAlbumModal';
import { Lightbox } from '../common/Lightbox';

interface MemoriesSectionProps {
  albums: Album[];
  onRefreshAlbums?: () => void;
}

export const MemoriesSection: React.FC<MemoriesSectionProps> = ({ albums, onRefreshAlbums }) => {
  const { isAdmin } = useAuth();
  const [unlockTarget, setUnlockTarget] = useState<Album | null>(null);
  const [viewingAlbum, setViewingAlbum] = useState<Album | null>(null);
  const [albumMedia, setAlbumMedia] = useState<MediaItem[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [loadingMedia, setLoadingMedia] = useState(false);

  const handleOpenAlbum = async (album: Album) => {
    // 1. If admin-only, must be logged in as admin
    if (album.visibility === 'ADMIN_ONLY' && !isAdmin) {
      alert('Album này chỉ dành riêng cho Quản trị viên đã đăng nhập.');
      return;
    }

    // 2. If password-protected and not unlocked yet, prompt password modal
    if (album.visibility === 'PASSWORD_PROTECTED' && !isAdmin) {
      const isUnlocked = DataStore.isAlbumUnlocked(album.id);
      if (!isUnlocked) {
        setUnlockTarget(album);
        return;
      }
    }

    // 3. Load album media
    loadAndShowAlbum(album);
  };

  const loadAndShowAlbum = async (album: Album) => {
    setLoadingMedia(true);
    try {
      const items = await DataStore.getAlbumMediaItems(album.id);
      setAlbumMedia(items);
      setViewingAlbum(album);
    } finally {
      setLoadingMedia(false);
    }
  };

  const getVisibilityBadge = (vis: string) => {
    switch (vis) {
      case 'PUBLIC':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
            <Globe className="w-3 h-3" />
            PUBLIC
          </span>
        );
      case 'PASSWORD_PROTECTED':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
            <Lock className="w-3 h-3" />
            PROTECTED
          </span>
        );
      case 'ADMIN_ONLY':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
            <Shield className="w-3 h-3" />
            ADMIN ONLY
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <section id="memories" className="py-20 px-4 sm:px-6 relative scroll-mt-10">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-2">
          <CadDimensionLine label="09 // PRIVATE MEMORIES & ALBUMS" />
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-pastel-text tracking-tight">
                Album Kỷ Niệm & Bảo Mật
              </h2>
              <p className="text-pastel-subtext text-base max-w-2xl mt-1">
                Hệ thống lưu trữ kỷ niệm cá nhân với cơ chế phân quyền đa lớp: Công khai, Mật khẩu bảo vệ (không cần tài khoản) và Quản trị viên.
              </p>
            </div>
            <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-pastel-light/60 text-pastel-deep border border-pastel-primary/50 self-start sm:self-auto">
              {albums.length} ALBUMS
            </span>
          </div>
        </div>

        {/* Album Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {albums.map((album) => {
            const isProtected = album.visibility === 'PASSWORD_PROTECTED';
            const isUnlocked = isProtected && DataStore.isAlbumUnlocked(album.id);

            return (
              <div
                key={album.id}
                onClick={() => handleOpenAlbum(album)}
                className="glass-card rounded-3xl overflow-hidden border border-pastel-border flex flex-col justify-between group cursor-pointer hover:border-pastel-primary transition-all duration-300"
              >
                <div>
                  {/* Cover */}
                  <div className="relative aspect-4/3 overflow-hidden bg-pastel-light/40">
                    <img
                      src={
                        album.cover_image_url ||
                        'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800'
                      }
                      alt={album.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      {getVisibilityBadge(album.visibility)}
                    </div>
                    {isProtected && !isUnlocked && (
                      <div className="absolute inset-0 bg-pastel-deep/40 backdrop-blur-xs flex items-center justify-center">
                        <div className="p-3 rounded-2xl bg-white/90 backdrop-blur-md shadow-lg flex items-center gap-2 text-pastel-deep font-semibold text-xs">
                          <Lock className="w-4 h-4 text-amber-600" />
                          <span>Yêu cầu mật khẩu</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-6 space-y-2.5">
                    <h3 className="text-lg font-bold text-pastel-text group-hover:text-pastel-deep transition-colors leading-snug">
                      {album.title}
                    </h3>
                    <p className="text-xs text-pastel-subtext leading-relaxed line-clamp-2">
                      {album.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-pastel-border/50 flex items-center justify-between text-xs font-semibold text-pastel-deep">
                  <span className="flex items-center gap-1.5">
                    <Images className="w-4 h-4 text-pastel-accent" />
                    <span>Xem album ảnh / video</span>
                  </span>
                  <span className="text-[11px] font-mono text-pastel-subtext">
                    {isUnlocked ? 'ĐÃ MỞ KHÓA' : 'CHI TIẾT'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Unlock Password Modal */}
      {unlockTarget && (
        <UnlockAlbumModal
          isOpen={Boolean(unlockTarget)}
          onClose={() => setUnlockTarget(null)}
          albumId={unlockTarget.id}
          albumTitle={unlockTarget.title}
          onSuccess={() => {
            loadAndShowAlbum(unlockTarget);
            setUnlockTarget(null);
            if (onRefreshAlbums) onRefreshAlbums();
          }}
        />
      )}

      {/* Album Contents Viewer Modal */}
      {viewingAlbum && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-pastel-deep/75 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-pastel-border animate-in zoom-in-95 duration-200 space-y-6">
            <button
              onClick={() => setViewingAlbum(null)}
              className="absolute top-5 right-5 text-pastel-subtext hover:text-pastel-deep p-2 rounded-xl bg-pastel-bg hover:bg-pastel-light transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-1.5 pr-10">
              <div className="flex items-center gap-2">
                {getVisibilityBadge(viewingAlbum.visibility)}
                <span className="text-xs font-mono text-pastel-subtext">
                  {albumMedia.length} TỆP ĐƯỢC BẢO VỆ
                </span>
              </div>
              <h3 className="text-2xl font-bold text-pastel-text">{viewingAlbum.title}</h3>
              <p className="text-sm text-pastel-subtext">{viewingAlbum.description}</p>
            </div>

            {/* Media Items Grid */}
            {albumMedia.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2 border-t border-pastel-border/60">
                {albumMedia.map((m, idx) => (
                  <div
                    key={m.id}
                    onClick={() => setLightboxIndex(idx)}
                    className="group relative aspect-4/3 rounded-xl overflow-hidden bg-pastel-light/40 border border-pastel-border cursor-pointer shadow-xs"
                  >
                    <img
                      src={m.file_url}
                      alt={m.caption || m.file_name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-pastel-deep/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-2 text-xs font-medium">
                      <Eye className="w-4 h-4" />
                      <span>Xem đầy đủ</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-10 text-center rounded-2xl bg-pastel-bg/50 border border-pastel-border text-pastel-subtext text-sm">
                Album hiện chưa có tệp media nào được gán.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Lightbox for album images */}
      {viewingAlbum && lightboxIndex !== null && albumMedia[lightboxIndex] && (
        <Lightbox
          isOpen={true}
          onClose={() => setLightboxIndex(null)}
          mediaUrl={albumMedia[lightboxIndex].file_url}
          mediaType={albumMedia[lightboxIndex].file_type}
          caption={albumMedia[lightboxIndex].caption}
          onPrev={() =>
            setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : albumMedia.length - 1))
          }
          onNext={() =>
            setLightboxIndex((prev) => (prev !== null && prev < albumMedia.length - 1 ? prev + 1 : 0))
          }
        />
      )}
    </section>
  );
};
