export interface Profile {
  id: string;
  full_name: string;
  birthday: string;
  phone: string;
  location: string;
  headline: string;
  bio: string;
  portrait_url: string;
  hero_image_url?: string;
  email: string;
  social_links: {
    github?: string;
    linkedin?: string;
    facebook?: string;
    zalo?: string;
  };
  created_at?: string;
  updated_at?: string;
}

export interface Education {
  id: string;
  institution: string;
  level: string;
  status: string; // 'Graduated' | 'Studying'
  timeline: string;
  description: string;
  logo_url?: string;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'tools' | 'languages' | 'soft_skills';
  description: string;
  icon_url?: string;
  badge_text?: string;
  screenshots?: string[];
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface Tool {
  id: string;
  name: string;
  thumbnail_url?: string;
  category: string;
  description: string;
  purpose: string;
  problem_solved: string;
  main_features: string[];
  technologies: string[];
  screenshots: string[];
  demo_url?: string;
  download_url?: string;
  dev_date?: string;
  is_published: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuing_org: string;
  score: string;
  issue_date: string;
  description: string;
  image_url?: string;
  credential_url?: string;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface Interest {
  id: string;
  title: string;
  category: 'sports' | 'music' | 'learning' | 'technology';
  description: string;
  image_url?: string;
  tags: string[];
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url?: string;
  category_id?: string;
  category_name?: string;
  tags: string[];
  status: 'published' | 'draft';
  views_count: number;
  published_at: string;
  created_at?: string;
  updated_at?: string;
}

export interface MediaItem {
  id: string;
  file_name: string;
  file_url: string;
  file_type: 'image' | 'video';
  size_bytes: number;
  caption?: string;
  category: string;
  is_private: boolean;
  created_at: string;
}

export type AlbumVisibility = 'PUBLIC' | 'PASSWORD_PROTECTED' | 'ADMIN_ONLY';

export interface Album {
  id: string;
  title: string;
  description: string;
  cover_image_url?: string;
  visibility: AlbumVisibility;
  password_hash?: string;
  salt?: string;
  sort_order: number;
  media_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface AlbumMedia {
  id: string;
  album_id: string;
  media_id: string;
  sort_order: number;
}

export interface AlbumAccessSession {
  id: string;
  album_id: string;
  session_token: string;
  expires_at: string;
  created_at?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  entity_type: string;
  entity_id?: string;
  details?: Record<string, any>;
  created_at: string;
}

export interface DashboardStats {
  totalPosts: number;
  totalMedia: number;
  totalTools: number;
  totalCertificates: number;
  totalAlbums: number;
  totalMessages: number;
  unreadMessages: number;
}
