import React, { useState, useMemo } from 'react';
import { BookOpen, Search, Calendar, Eye, ArrowRight, Tag, X } from 'lucide-react';
import { Post } from '../../types';
import { formatDate } from '../../lib/utils';
import { CadDimensionLine, CadCorner } from '../common/CadDecorations';

interface JournalSectionProps {
  posts: Post[];
}

export const JournalSection: React.FC<JournalSectionProps> = ({ posts }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [activeArticle, setActiveArticle] = useState<Post | null>(null);

  // Collect all unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags?.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [posts]);

  // Filtered posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchTag = selectedTag ? post.tags?.includes(selectedTag) : true;

      return matchSearch && matchTag;
    });
  }, [posts, searchQuery, selectedTag]);

  return (
    <section id="journal" className="py-20 px-4 sm:px-6 relative scroll-mt-10">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-2">
          <CadDimensionLine label="07 // JOURNAL & ARTICLES" />
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-pastel-text tracking-tight">
                Nhật Ký & Chia Sẻ Kỹ Thuật
              </h2>
              <p className="text-pastel-subtext text-base max-w-2xl mt-1">
                Ghi chép về tư duy tối ưu hóa quy trình, bài học kinh nghiệm và kiến thức công nghệ thực tế.
              </p>
            </div>
          </div>
        </div>

        {/* Search & Tag Filter Bar */}
        <div className="glass-card rounded-2xl p-4 sm:p-5 border border-pastel-border space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-pastel-subtext absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm kiếm bài viết theo từ khóa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-pastel-border focus:border-pastel-accent outline-none text-sm bg-white"
              />
            </div>
            {selectedTag && (
              <button
                onClick={() => setSelectedTag(null)}
                className="px-3.5 py-2 rounded-xl bg-pastel-light/60 text-pastel-deep text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto hover:bg-pastel-accent/20 transition-colors"
              >
                <span>Đang lọc: #{selectedTag}</span>
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {allTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-xs font-mono text-pastel-subtext mr-1">Tags:</span>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    selectedTag === tag
                      ? 'bg-pastel-deep text-white font-semibold'
                      : 'bg-pastel-bg text-pastel-text hover:bg-pastel-light/60'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Articles List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setActiveArticle(post)}
              className="glass-card rounded-3xl overflow-hidden border border-pastel-border flex flex-col justify-between group cursor-pointer hover:border-pastel-primary transition-all duration-300"
            >
              <div>
                {/* Cover Image */}
                {post.cover_image_url && (
                  <div className="relative aspect-16/9 overflow-hidden bg-pastel-light/40">
                    <img
                      src={post.cover_image_url}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-white/90 backdrop-blur-md text-pastel-deep shadow-xs">
                        {post.category_name || 'Kỹ thuật'}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-6 sm:p-7 space-y-3">
                  <div className="flex items-center gap-3 text-xs font-mono text-pastel-subtext">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-pastel-accent" />
                      {formatDate(post.published_at)}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {post.views_count} lượt đọc
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-pastel-text group-hover:text-pastel-deep transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-sm text-pastel-subtext leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-pastel-border/40 mt-2 flex items-center justify-between text-xs font-semibold text-pastel-deep">
                <span className="group-hover:text-pastel-accent flex items-center gap-1 transition-colors">
                  Đọc toàn bộ bài viết
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-pastel-subtext font-mono text-[11px]">Cao Đức Tiến Thành</span>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="p-12 text-center rounded-3xl bg-white/60 border border-pastel-border">
            <BookOpen className="w-10 h-10 text-pastel-accent mx-auto mb-3 opacity-60" />
            <p className="text-sm text-pastel-subtext font-medium">Không tìm thấy bài viết nào phù hợp với bộ lọc.</p>
          </div>
        )}
      </div>

      {/* Article Detail Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-pastel-deep/75 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-pastel-border animate-in zoom-in-95 duration-200 space-y-6">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-6 right-6 text-pastel-subtext hover:text-pastel-deep p-2 rounded-xl bg-pastel-bg hover:bg-pastel-light transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Meta */}
            <div className="space-y-3 pr-10">
              <span className="px-3 py-1 rounded-md text-xs font-mono font-bold bg-pastel-light text-pastel-deep inline-block">
                {activeArticle.category_name || 'Kỹ thuật'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-pastel-text leading-tight">
                {activeArticle.title}
              </h2>
              <div className="flex items-center gap-4 text-xs font-mono text-pastel-subtext pt-1">
                <span>Tác giả: Cao Đức Tiến Thành</span>
                <span>•</span>
                <span>{formatDate(activeArticle.published_at)}</span>
              </div>
            </div>

            {/* Cover */}
            {activeArticle.cover_image_url && (
              <img
                src={activeArticle.cover_image_url}
                alt={activeArticle.title}
                className="w-full max-h-80 object-cover rounded-2xl border border-pastel-border"
              />
            )}

            {/* Content Body */}
            <div className="prose max-w-none text-pastel-text text-sm sm:text-base leading-relaxed whitespace-pre-line border-t border-pastel-border/60 pt-6">
              {activeArticle.content}
            </div>

            {/* Tags */}
            {activeArticle.tags && activeArticle.tags.length > 0 && (
              <div className="pt-4 border-t border-pastel-border/60 flex flex-wrap gap-2">
                {activeArticle.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs font-mono bg-pastel-bg text-pastel-deep border border-pastel-border"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
