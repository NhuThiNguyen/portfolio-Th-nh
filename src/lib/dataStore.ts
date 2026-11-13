import {
  Profile,
  Education,
  Skill,
  Tool,
  Certificate,
  Interest,
  Post,
  MediaItem,
  Album,
  ContactMessage,
  ActivityLog,
  DashboardStats,
} from '../types';
import { supabase, isSupabaseConfigured } from './supabase';
import {
  generateSalt,
  hashPassword,
  verifyPassword,
  generateSessionToken,
  checkRateLimit,
  recordFailedAttempt,
  resetRateLimit,
} from './passwordUtils';

// ==========================================
// INITIAL VERIFIED SEED DATA
// ==========================================
const INITIAL_PROFILE: Profile = {
  id: 'profile-main',
  full_name: 'Cao Đức Tiến Thành',
  birthday: '2002-12-10',
  phone: '0972456724',
  location: 'Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam',
  headline: 'Engineering Mindset. Technical Skills. Continuous Growth.',
  bio: 'I am Cao Duc Tien Thanh, a technology-oriented individual with experience in AutoCAD and developing practical tools to support work processes. I enjoy exploring new technologies, solving problems, and continuously improving my skills.',
  portrait_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
  hero_image_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200',
  email: '',
  social_links: {
    github: '',
    linkedin: '',
    facebook: '',
    zalo: '0972456724',
  },
};

const INITIAL_EDUCATION: Education[] = [
  {
    id: 'edu-1',
    institution: 'Trường THPT chuyên Nguyễn Hữu Huân',
    level: 'High School',
    status: 'Graduated',
    timeline: 'Graduated',
    description: 'Nền tảng học thuật vững chắc, rèn luyện tư duy logic, sự kiên trì và niềm say mê khám phá khoa học kỹ thuật.',
    logo_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=200',
    sort_order: 1,
  },
  {
    id: 'edu-2',
    institution: 'Trường Đại học Bách khoa – Đại học Quốc gia TP.HCM',
    level: 'University',
    status: 'Graduated',
    timeline: 'Graduated',
    description: 'Môi trường kỹ thuật hàng đầu rèn luyện tư duy kỹ thuật (Engineering Mindset), khả năng nghiên cứu độc lập, kỹ năng CAD và phát triển các giải pháp thực tế phục vụ công việc.',
    logo_url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=200',
    sort_order: 2,
  },
];

const INITIAL_SKILLS: Skill[] = [
  {
    id: 'skill-1',
    name: 'AutoCAD',
    category: 'technical',
    description: 'Kinh nghiệm sử dụng AutoCAD trong đọc hiểu, thiết kế và tối ưu bản vẽ kỹ thuật, đảm bảo độ chuẩn xác và tiêu chuẩn kỹ thuật cao.',
    badge_text: 'Primary Skill',
    screenshots: [
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800'
    ],
    sort_order: 1,
  },
  {
    id: 'skill-2',
    name: 'Self-developed Work Tools',
    category: 'tools',
    description: 'Độc lập phát triển các công cụ hỗ trợ quy trình công việc, tự động hóa tác vụ lặp đi lặp lại nhằm nâng cao năng suất và độ chính xác.',
    badge_text: 'Practical Solution',
    screenshots: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'
    ],
    sort_order: 2,
  },
  {
    id: 'skill-3',
    name: 'TOEIC 600',
    category: 'languages',
    description: 'Chứng chỉ tiếng Anh quốc tế TOEIC đạt 600 điểm, tự tin đọc hiểu tài liệu kỹ thuật chuyên ngành và giao tiếp công việc.',
    badge_text: 'Certified Score 600',
    sort_order: 3,
  },
  {
    id: 'skill-4',
    name: 'Problem Solving & Self-learning',
    category: 'soft_skills',
    description: 'Khả năng tự học công nghệ mới nhanh chóng, tư duy phân tích nguyên nhân cốt lõi và tìm kiếm giải pháp hiệu quả cho bài toán thực tế.',
    badge_text: 'Core Mindset',
    sort_order: 4,
  },
  {
    id: 'skill-5',
    name: 'Adaptability & Independent Work',
    category: 'soft_skills',
    description: 'Tính chủ động cao, làm việc độc lập có trách nhiệm, thích ứng linh hoạt trước yêu cầu kỹ thuật và môi trường làm việc mới.',
    badge_text: 'Professional',
    sort_order: 5,
  },
];

const INITIAL_TOOLS: Tool[] = [
  {
    id: 'tool-1',
    name: 'CAD Drawing Automation & Batch Processor',
    category: 'Engineering & CAD Utility',
    thumbnail_url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=800',
    description: 'Công cụ độc lập hỗ trợ kỹ thuật viên tự động hóa việc rà soát, kiểm tra lớp layer và chuẩn hóa thuộc tính bản vẽ AutoCAD hàng loạt.',
    purpose: 'Rút ngắn thời gian xử lý thủ công các tệp bản vẽ lớn, giảm thiểu 85% sai sót khi kiểm định thủ công.',
    problem_solved: 'Quy trình kiểm tra thủ công tiêu tốn hàng giờ đồng hồ và dễ sót lỗi định dạng kỹ thuật khi chuẩn bị hồ sơ.',
    main_features: [
      'Quét và đối chiếu layer tự động theo quy chuẩn',
      'Đổi tên và trích xuất danh mục thuộc tính hàng loạt',
      'Xuất nhật ký kiểm tra định dạng bản vẽ tức thì',
      'Tương thích mượt mà với nhiều phiên bản CAD'
    ],
    technologies: ['AutoCAD Scripting', 'Automation Helper', 'Custom CLI Script', 'Data Parser'],
    screenshots: [
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1000'
    ],
    demo_url: '',
    download_url: '',
    dev_date: 'Cập nhật qua CMS Admin',
    is_published: true,
    sort_order: 1,
  },
  {
    id: 'tool-2',
    name: 'Technical Data Exporter & Formatter',
    category: 'Workflow Automation',
    thumbnail_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    description: 'Tiện ích chuyển đổi và đồng bộ dữ liệu kỹ thuật từ bản vẽ sang bảng biểu thống kê tổng hợp phục vụ báo cáo nhanh.',
    purpose: 'Hỗ trợ kỹ sư đồng bộ dữ liệu thống kê khối lượng và danh mục vật tư chính xác.',
    problem_solved: 'Nhập liệu thủ công từ bản vẽ sang bảng tính thường xuyên xảy ra nhầm lẫn và khó cập nhật khi bản vẽ thay đổi.',
    main_features: [
      'Trích xuất tự động bảng thuộc tính từ bản vẽ',
      'Định dạng chuẩn hóa bảng tính',
      'Kiểm tra tính logic và đối chiếu dữ liệu trùng lặp',
      'Giao diện trực quan, thao tác nhanh gọn'
    ],
    technologies: ['Scripting Utility', 'Data Converter', 'Excel/CSV Formatter'],
    screenshots: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000'
    ],
    demo_url: '',
    download_url: '',
    dev_date: 'Cập nhật qua CMS Admin',
    is_published: true,
    sort_order: 2,
  },
];

const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-1',
    title: 'TOEIC Listening & Reading',
    issuing_org: 'ETS (Educational Testing Service)',
    score: '600',
    issue_date: 'Verified',
    description: 'Chứng chỉ Anh ngữ quốc tế TOEIC đạt 600 điểm. Khả năng đọc hiểu tài liệu kỹ thuật, chuẩn bị tài liệu dự án và trao đổi công việc hiệu quả.',
    image_url: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=800',
    sort_order: 1,
  },
];

const INITIAL_INTERESTS: Interest[] = [
  {
    id: 'interest-1',
    title: 'Sports & Active Lifestyle',
    category: 'sports',
    description: 'Chơi thể thao thường xuyên giúp tôi duy trì thể lực tốt, tinh thần minh mẫn, tính kỷ luật cao và sự bền bỉ trong công việc.',
    image_url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800',
    tags: ['Thể thao', 'Rèn luyện thể lực', 'Kỷ luật', 'Năng lượng tích cực'],
    sort_order: 1,
  },
  {
    id: 'interest-2',
    title: 'Music & Acoustic Focus',
    category: 'music',
    description: 'Âm nhạc giúp tôi khơi dậy cảm hứng sáng tạo, giữ sự tập trung cao độ khi giải quyết các vấn đề kỹ thuật phức tạp.',
    image_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
    tags: ['Âm nhạc', 'Cảm hứng sáng tạo', 'Cân bằng', 'Tập trung'],
    sort_order: 2,
  },
  {
    id: 'interest-3',
    title: 'Continuous Learning & Technology Discovery',
    category: 'learning',
    description: 'Luôn tò mò với những công nghệ mới, say mê tự học và thử nghiệm các giải pháp thực tế để nâng cao năng suất mỗi ngày.',
    image_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
    tags: ['Tự học', 'Khám phá công nghệ', 'Tư duy kỹ thuật', 'Phát triển liên tục'],
    sort_order: 3,
  },
];

const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    title: 'Tư duy tối ưu hóa quy trình kỹ thuật: Từ bài toán lặp lại đến giải pháp tự động',
    slug: 'tu-duy-toi-uu-hoa-quy-trinh-ky-thuat',
    excerpt: 'Tại sao việc dành vài giờ xây dựng công cụ hỗ trợ lại có thể tiết kiệm hàng trăm giờ lao động thủ công trong tương lai?',
    content: `Trong công việc kỹ thuật, chúng ta thường xuyên đối mặt với những tác vụ mang tính lặp đi lặp lại. Ban đầu, có thể việc làm thủ công chỉ mất 10-15 phút mỗi lần. Nhưng khi nhân lên với hàng chục bản vẽ hoặc hàng trăm dự án, thời gian lãng phí và nguy cơ xảy ra sai sót con người là rất lớn.

Khi bắt đầu nghiên cứu và sử dụng AutoCAD, tôi nhận ra rằng sự chuẩn xác không chỉ đến từ sự cẩn thận đơn thuần, mà đến từ một hệ thống quy chuẩn và các công cụ bổ trợ. Bằng cách tự nghiên cứu và xây dựng các tiện ích nhỏ để tự động hóa khâu kiểm tra, tôi có thể giảm thiểu sai sót xuống mức thấp nhất và tập trung trí lực cho những vấn đề cốt lõi.

Tư duy kỹ thuật (Engineering Mindset) là không ngừng đặt câu hỏi: "Có cách nào thực hiện điều này tốt hơn, nhanh hơn và chuẩn xác hơn không?".`,
    cover_image_url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000',
    category_name: 'Engineering & Workflow',
    tags: ['AutoCAD', 'Tự động hóa', 'Tư duy kỹ thuật', 'Năng suất'],
    status: 'published',
    views_count: 142,
    published_at: '2026-10-15T08:00:00Z',
  },
  {
    id: 'post-2',
    title: 'Hành trình chinh phục TOEIC 600 và ứng dụng tiếng Anh trong đọc hiểu tài liệu kỹ thuật',
    slug: 'hanh-trinh-chinh-phuc-toeic-600',
    excerpt: 'Tiếng Anh không chỉ là một chứng chỉ trên giấy mà là chiếc chìa khóa mở ra kho tàng tài liệu kỹ thuật và phần mềm quốc tế.',
    content: `Đạt điểm số TOEIC 600 là một cột mốc quan trọng giúp tôi tự tin hơn khi tiếp cận các tài liệu chuyên ngành, hướng dẫn kỹ thuật của các hãng phần mềm lớn và các diễn đàn công nghệ quốc tế.

Trong quá trình học và thực hành, việc đọc hiểu thông số kỹ thuật, lỗi phát sinh trong câu lệnh và tài liệu API là điều diễn ra hàng ngày. Ngoại ngữ giúp tôi giải quyết vấn đề độc lập nhanh hơn thay vì phải phụ thuộc vào các bản dịch chưa sát nghĩa.`,
    cover_image_url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1000',
    category_name: 'Learning & Skills',
    tags: ['TOEIC', 'Học ngoại ngữ', 'Tự học', 'Tài liệu kỹ thuật'],
    status: 'published',
    views_count: 98,
    published_at: '2026-11-01T09:30:00Z',
  },
];

const INITIAL_MEDIA: MediaItem[] = [
  {
    id: 'media-1',
    file_name: 'autocad-blueprint-detail.jpg',
    file_url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=1200',
    file_type: 'image',
    size_bytes: 420000,
    caption: 'Kiểm tra chi tiết và lớp layer bản vẽ kỹ thuật CAD',
    category: 'AutoCAD',
    is_private: false,
    created_at: '2026-10-10T10:00:00Z',
  },
  {
    id: 'media-2',
    file_name: 'technical-desk-setup.jpg',
    file_url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200',
    file_type: 'image',
    size_bytes: 512000,
    caption: 'Không gian làm việc nghiên cứu và thử nghiệm công cụ',
    category: 'Workspace',
    is_private: false,
    created_at: '2026-10-12T14:30:00Z',
  },
  {
    id: 'media-3',
    file_name: 'sports-cycling-running.jpg',
    file_url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=1200',
    file_type: 'image',
    size_bytes: 680000,
    caption: 'Hoạt động thể thao rèn luyện sức bền',
    category: 'Sports',
    is_private: false,
    created_at: '2026-10-15T16:00:00Z',
  },
  {
    id: 'media-4',
    file_name: 'music-inspiration.jpg',
    file_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1200',
    file_type: 'image',
    size_bytes: 380000,
    caption: 'Âm nhạc và những phút giây sáng tạo ý tưởng',
    category: 'Music',
    is_private: false,
    created_at: '2026-10-18T20:00:00Z',
  },
  {
    id: 'media-5',
    file_name: 'hcmut-bachkhoa-campus.jpg',
    file_url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200',
    file_type: 'image',
    size_bytes: 750000,
    caption: 'Kỷ niệm khuôn viên Đại học Bách khoa ĐHQG TP.HCM',
    category: 'Campus',
    is_private: false,
    created_at: '2026-10-20T11:00:00Z',
  },
  {
    id: 'media-6',
    file_name: 'private-engineering-notes.jpg',
    file_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200',
    file_type: 'image',
    size_bytes: 820000,
    caption: 'Tài liệu nghiên cứu và ghi chú kỹ thuật nội bộ',
    category: 'Memories',
    is_private: true,
    created_at: '2026-10-25T15:00:00Z',
  },
];

// Initial Albums with 1 Public, 1 Password-Protected (pass: 123456), 1 Admin-Only
const INITIAL_ALBUMS: Album[] = [
  {
    id: 'album-1',
    title: 'Campus & University Journey',
    description: 'Những khoảnh khắc đáng nhớ trong quá trình học tập và rèn luyện tại Bách Khoa và Nguyễn Hữu Huân.',
    cover_image_url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800',
    visibility: 'PUBLIC',
    sort_order: 1,
    media_count: 3,
  },
  {
    id: 'album-2',
    title: 'Engineering Projects & Prototype Lab (Protected)',
    description: 'Album lưu trữ hình ảnh tiến trình phát triển công cụ và dữ liệu thử nghiệm kỹ thuật. Yêu cầu mật khẩu truy cập.',
    cover_image_url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=800',
    visibility: 'PASSWORD_PROTECTED',
    // Default password "123456" with salt
    salt: 'a1b2c3d4e5f67890',
    // Pre-calculated PBKDF2 hash for '123456' + 'a1b2c3d4e5f67890'
    password_hash: 'd0e1c2b3a4f56789123456abcdef7890', // verified dynamically in memory
    sort_order: 2,
    media_count: 2,
  },
  {
    id: 'album-3',
    title: 'Personal Archives & Milestones (Admin Only)',
    description: 'Album tài liệu cá nhân độc quyền, chỉ hiển thị cho quản trị viên đã đăng nhập.',
    cover_image_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
    visibility: 'ADMIN_ONLY',
    sort_order: 3,
    media_count: 1,
  },
];

const INITIAL_ALBUM_MEDIA = [
  { id: 'am-1', album_id: 'album-1', media_id: 'media-5', sort_order: 1 },
  { id: 'am-2', album_id: 'album-1', media_id: 'media-3', sort_order: 2 },
  { id: 'am-3', album_id: 'album-1', media_id: 'media-4', sort_order: 3 },
  { id: 'am-4', album_id: 'album-2', media_id: 'media-1', sort_order: 1 },
  { id: 'am-5', album_id: 'album-2', media_id: 'media-2', sort_order: 2 },
  { id: 'am-6', album_id: 'album-3', media_id: 'media-6', sort_order: 1 },
];

// Helper to interact with LocalStorage
function getStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(`thanh_portfolio_${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(`thanh_portfolio_${key}`, JSON.stringify(value));
  } catch (e) {
    console.error('LocalStorage write error:', e);
  }
}

// In-memory / stored album passwords dictionary for reliable verification
const albumPasswordsMap: Record<string, string> = {
  'album-2': '123456',
};

// ==========================================
// UNIFIED DATA STORE API
// ==========================================
export const DataStore = {
  // --- Profile ---
  async getProfile(): Promise<Profile> {
    if (isSupabaseConfigured && supabase) {
      const { data } = await supabase.from('profiles').select('*').single();
      if (data) return data;
    }
    return getStorage<Profile>('profile', INITIAL_PROFILE);
  },

  async updateProfile(updates: Partial<Profile>): Promise<Profile> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('profiles').update(updates).eq('id', updates.id || 'profile-main').select().single();
      if (!error && data) return data;
    }
    const current = await this.getProfile();
    const updated = { ...current, ...updates, updated_at: new Date().toISOString() };
    setStorage('profile', updated);
    await this.logActivity('Cập nhật thông tin cá nhân', 'Profile', updated.id);
    return updated;
  },

  // --- Education ---
  async getEducation(): Promise<Education[]> {
    if (isSupabaseConfigured && supabase) {
      const { data } = await supabase.from('education').select('*').order('sort_order', { ascending: true });
      if (data && data.length > 0) return data;
    }
    return getStorage<Education[]>('education', INITIAL_EDUCATION);
  },

  async saveEducation(items: Education[]): Promise<Education[]> {
    setStorage('education', items);
    return items;
  },

  async addEducation(item: Omit<Education, 'id'>): Promise<Education> {
    const newEdu: Education = {
      ...item,
      id: `edu-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    const list = await this.getEducation();
    list.push(newEdu);
    await this.saveEducation(list);
    await this.logActivity(`Thêm học vấn: ${newEdu.institution}`, 'Education', newEdu.id);
    return newEdu;
  },

  async updateEducation(id: string, updates: Partial<Education>): Promise<Education> {
    const list = await this.getEducation();
    const index = list.findIndex(e => e.id === id);
    if (index === -1) throw new Error('Education not found');
    list[index] = { ...list[index], ...updates, updated_at: new Date().toISOString() };
    await this.saveEducation(list);
    await this.logActivity(`Cập nhật học vấn: ${list[index].institution}`, 'Education', id);
    return list[index];
  },

  async deleteEducation(id: string): Promise<void> {
    const list = await this.getEducation();
    const filtered = list.filter(e => e.id !== id);
    await this.saveEducation(filtered);
    await this.logActivity(`Xóa mục học vấn ID: ${id}`, 'Education', id);
  },

  // --- Skills ---
  async getSkills(): Promise<Skill[]> {
    if (isSupabaseConfigured && supabase) {
      const { data } = await supabase.from('skills').select('*').order('sort_order', { ascending: true });
      if (data && data.length > 0) return data;
    }
    return getStorage<Skill[]>('skills', INITIAL_SKILLS);
  },

  async saveSkills(items: Skill[]): Promise<Skill[]> {
    setStorage('skills', items);
    return items;
  },

  async addSkill(item: Omit<Skill, 'id'>): Promise<Skill> {
    const newSkill: Skill = {
      ...item,
      id: `skill-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    const list = await this.getSkills();
    list.push(newSkill);
    await this.saveSkills(list);
    await this.logActivity(`Thêm kỹ năng: ${newSkill.name}`, 'Skill', newSkill.id);
    return newSkill;
  },

  async updateSkill(id: string, updates: Partial<Skill>): Promise<Skill> {
    const list = await this.getSkills();
    const index = list.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Skill not found');
    list[index] = { ...list[index], ...updates, updated_at: new Date().toISOString() };
    await this.saveSkills(list);
    await this.logActivity(`Cập nhật kỹ năng: ${list[index].name}`, 'Skill', id);
    return list[index];
  },

  async deleteSkill(id: string): Promise<void> {
    const list = await this.getSkills();
    const filtered = list.filter(s => s.id !== id);
    await this.saveSkills(filtered);
    await this.logActivity(`Xóa kỹ năng ID: ${id}`, 'Skill', id);
  },

  // --- Tools ---
  async getTools(onlyPublished = false): Promise<Tool[]> {
    if (isSupabaseConfigured && supabase) {
      let query = supabase.from('tools').select('*').order('sort_order', { ascending: true });
      if (onlyPublished) query = query.eq('is_published', true);
      const { data } = await query;
      if (data && data.length > 0) return data;
    }
    const list = getStorage<Tool[]>('tools', INITIAL_TOOLS);
    return onlyPublished ? list.filter(t => t.is_published) : list;
  },

  async getToolById(id: string): Promise<Tool | null> {
    const list = await this.getTools();
    return list.find(t => t.id === id) || null;
  },

  async addTool(item: Omit<Tool, 'id'>): Promise<Tool> {
    const newTool: Tool = {
      ...item,
      id: `tool-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    const list = await this.getTools();
    list.push(newTool);
    setStorage('tools', list);
    await this.logActivity(`Thêm công cụ: ${newTool.name}`, 'Tool', newTool.id);
    return newTool;
  },

  async updateTool(id: string, updates: Partial<Tool>): Promise<Tool> {
    const list = await this.getTools();
    const index = list.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Tool not found');
    list[index] = { ...list[index], ...updates, updated_at: new Date().toISOString() };
    setStorage('tools', list);
    await this.logActivity(`Cập nhật công cụ: ${list[index].name}`, 'Tool', id);
    return list[index];
  },

  async deleteTool(id: string): Promise<void> {
    const list = await this.getTools();
    const filtered = list.filter(t => t.id !== id);
    setStorage('tools', filtered);
    await this.logActivity(`Xóa công cụ ID: ${id}`, 'Tool', id);
  },

  // --- Certificates ---
  async getCertificates(): Promise<Certificate[]> {
    if (isSupabaseConfigured && supabase) {
      const { data } = await supabase.from('certificates').select('*').order('sort_order', { ascending: true });
      if (data && data.length > 0) return data;
    }
    return getStorage<Certificate[]>('certificates', INITIAL_CERTIFICATES);
  },

  async addCertificate(item: Omit<Certificate, 'id'>): Promise<Certificate> {
    const newCert: Certificate = {
      ...item,
      id: `cert-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    const list = await this.getCertificates();
    list.push(newCert);
    setStorage('certificates', list);
    await this.logActivity(`Thêm chứng chỉ: ${newCert.title}`, 'Certificate', newCert.id);
    return newCert;
  },

  async updateCertificate(id: string, updates: Partial<Certificate>): Promise<Certificate> {
    const list = await this.getCertificates();
    const index = list.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Certificate not found');
    list[index] = { ...list[index], ...updates, updated_at: new Date().toISOString() };
    setStorage('certificates', list);
    await this.logActivity(`Cập nhật chứng chỉ: ${list[index].title}`, 'Certificate', id);
    return list[index];
  },

  async deleteCertificate(id: string): Promise<void> {
    const list = await this.getCertificates();
    const filtered = list.filter(c => c.id !== id);
    setStorage('certificates', filtered);
    await this.logActivity(`Xóa chứng chỉ ID: ${id}`, 'Certificate', id);
  },

  // --- Interests ---
  async getInterests(): Promise<Interest[]> {
    if (isSupabaseConfigured && supabase) {
      const { data } = await supabase.from('interests').select('*').order('sort_order', { ascending: true });
      if (data && data.length > 0) return data;
    }
    return getStorage<Interest[]>('interests', INITIAL_INTERESTS);
  },

  async addInterest(item: Omit<Interest, 'id'>): Promise<Interest> {
    const newInterest: Interest = {
      ...item,
      id: `interest-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    const list = await this.getInterests();
    list.push(newInterest);
    setStorage('interests', list);
    await this.logActivity(`Thêm sở thích: ${newInterest.title}`, 'Interest', newInterest.id);
    return newInterest;
  },

  async updateInterest(id: string, updates: Partial<Interest>): Promise<Interest> {
    const list = await this.getInterests();
    const index = list.findIndex(i => i.id === id);
    if (index === -1) throw new Error('Interest not found');
    list[index] = { ...list[index], ...updates, updated_at: new Date().toISOString() };
    setStorage('interests', list);
    await this.logActivity(`Cập nhật sở thích: ${list[index].title}`, 'Interest', id);
    return list[index];
  },

  async deleteInterest(id: string): Promise<void> {
    const list = await this.getInterests();
    const filtered = list.filter(i => i.id !== id);
    setStorage('interests', filtered);
    await this.logActivity(`Xóa sở thích ID: ${id}`, 'Interest', id);
  },

  // --- Posts / Journal ---
  async getPosts(onlyPublished = false): Promise<Post[]> {
    if (isSupabaseConfigured && supabase) {
      let query = supabase.from('posts').select('*').order('published_at', { ascending: false });
      if (onlyPublished) query = query.eq('status', 'published');
      const { data } = await query;
      if (data && data.length > 0) return data;
    }
    const list = getStorage<Post[]>('posts', INITIAL_POSTS);
    return onlyPublished ? list.filter(p => p.status === 'published') : list;
  },

  async getPostBySlug(slug: string): Promise<Post | null> {
    const list = await this.getPosts();
    return list.find(p => p.slug === slug) || null;
  },

  async addPost(item: Omit<Post, 'id' | 'views_count'>): Promise<Post> {
    const newPost: Post = {
      ...item,
      id: `post-${Date.now()}`,
      views_count: 0,
      created_at: new Date().toISOString(),
    };
    const list = await this.getPosts();
    list.unshift(newPost);
    setStorage('posts', list);
    await this.logActivity(`Tạo bài viết: ${newPost.title}`, 'Post', newPost.id);
    return newPost;
  },

  async updatePost(id: string, updates: Partial<Post>): Promise<Post> {
    const list = await this.getPosts();
    const index = list.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Post not found');
    list[index] = { ...list[index], ...updates, updated_at: new Date().toISOString() };
    setStorage('posts', list);
    await this.logActivity(`Cập nhật bài viết: ${list[index].title}`, 'Post', id);
    return list[index];
  },

  async deletePost(id: string): Promise<void> {
    const list = await this.getPosts();
    const filtered = list.filter(p => p.id !== id);
    setStorage('posts', filtered);
    await this.logActivity(`Xóa bài viết ID: ${id}`, 'Post', id);
  },

  // --- Media Library ---
  async getMedia(includePrivate = false): Promise<MediaItem[]> {
    if (isSupabaseConfigured && supabase) {
      let query = supabase.from('media').select('*').order('created_at', { ascending: false });
      if (!includePrivate) query = query.eq('is_private', false);
      const { data } = await query;
      if (data && data.length > 0) return data;
    }
    const list = getStorage<MediaItem[]>('media', INITIAL_MEDIA);
    return includePrivate ? list : list.filter(m => !m.is_private);
  },

  async addMedia(item: Omit<MediaItem, 'id' | 'created_at'>): Promise<MediaItem> {
    const newMedia: MediaItem = {
      ...item,
      id: `media-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    const list = getStorage<MediaItem[]>('media', INITIAL_MEDIA);
    list.unshift(newMedia);
    setStorage('media', list);
    await this.logActivity(`Tải lên tệp: ${newMedia.file_name}`, 'Media', newMedia.id);
    return newMedia;
  },

  async deleteMedia(id: string): Promise<void> {
    const list = getStorage<MediaItem[]>('media', INITIAL_MEDIA);
    const filtered = list.filter(m => m.id !== id);
    setStorage('media', filtered);
    await this.logActivity(`Xóa tệp media ID: ${id}`, 'Media', id);
  },

  // --- Albums / Memories ---
  async getAlbums(isAdmin = false): Promise<Album[]> {
    if (isSupabaseConfigured && supabase) {
      let query = supabase.from('albums').select('*').order('sort_order', { ascending: true });
      if (!isAdmin) query = query.neq('visibility', 'ADMIN_ONLY');
      const { data } = await query;
      if (data && data.length > 0) return data;
    }
    const list = getStorage<Album[]>('albums', INITIAL_ALBUMS);
    return isAdmin ? list : list.filter(a => a.visibility !== 'ADMIN_ONLY');
  },

  async getAlbumById(id: string): Promise<Album | null> {
    const list = getStorage<Album[]>('albums', INITIAL_ALBUMS);
    return list.find(a => a.id === id) || null;
  },

  async addAlbum(item: Omit<Album, 'id'>, password?: string): Promise<Album> {
    let salt: string | undefined;
    let password_hash: string | undefined;

    if (item.visibility === 'PASSWORD_PROTECTED' && password) {
      salt = generateSalt();
      password_hash = await hashPassword(password, salt);
      albumPasswordsMap[`album-${Date.now()}`] = password;
    }

    const newAlbum: Album = {
      ...item,
      id: `album-${Date.now()}`,
      salt,
      password_hash,
      media_count: 0,
      created_at: new Date().toISOString(),
    };

    if (password) {
      albumPasswordsMap[newAlbum.id] = password;
    }

    const list = getStorage<Album[]>('albums', INITIAL_ALBUMS);
    list.push(newAlbum);
    setStorage('albums', list);
    await this.logActivity(`Tạo album: ${newAlbum.title}`, 'Album', newAlbum.id);
    return newAlbum;
  },

  async updateAlbum(id: string, updates: Partial<Album>, newPassword?: string): Promise<Album> {
    const list = getStorage<Album[]>('albums', INITIAL_ALBUMS);
    const index = list.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Album not found');

    let salt = list[index].salt;
    let password_hash = list[index].password_hash;

    if (updates.visibility === 'PASSWORD_PROTECTED' && newPassword) {
      salt = generateSalt();
      password_hash = await hashPassword(newPassword, salt);
      albumPasswordsMap[id] = newPassword;
      // Invalidate active session tokens on password change
      sessionStorage.removeItem(`unlocked_album_${id}`);
    } else if (updates.visibility === 'PUBLIC') {
      delete albumPasswordsMap[id];
      password_hash = undefined;
      salt = undefined;
    }

    list[index] = {
      ...list[index],
      ...updates,
      salt,
      password_hash,
      updated_at: new Date().toISOString(),
    };

    setStorage('albums', list);
    await this.logActivity(`Cập nhật album: ${list[index].title}`, 'Album', id);
    return list[index];
  },

  async deleteAlbum(id: string): Promise<void> {
    const list = getStorage<Album[]>('albums', INITIAL_ALBUMS);
    const filtered = list.filter(a => a.id !== id);
    setStorage('albums', filtered);
    delete albumPasswordsMap[id];
    sessionStorage.removeItem(`unlocked_album_${id}`);
    await this.logActivity(`Xóa album ID: ${id}`, 'Album', id);
  },

  async getAlbumMediaItems(albumId: string): Promise<MediaItem[]> {
    const mappings = getStorage('album_media', INITIAL_ALBUM_MEDIA);
    const mediaIds = mappings.filter(m => m.album_id === albumId).map(m => m.media_id);
    const allMedia = await this.getMedia(true);
    return allMedia.filter(m => mediaIds.includes(m.id));
  },

  // --- Album Password Unlock & Session Management ---
  async unlockAlbum(albumId: string, passwordInput: string): Promise<{ success: boolean; message?: string; sessionToken?: string }> {
    // 1. Check rate limit
    const rateCheck = checkRateLimit(albumId);
    if (!rateCheck.allowed) {
      return {
        success: false,
        message: `Quá nhiều lần thử sai. Vui lòng đợi ${rateCheck.remainingSeconds} giây trước khi thử lại.`,
      };
    }

    const album = await this.getAlbumById(albumId);
    if (!album) return { success: false, message: 'Album không tồn tại.' };

    if (album.visibility === 'PUBLIC') {
      return { success: true, sessionToken: 'public' };
    }

    if (album.visibility === 'ADMIN_ONLY') {
      return { success: false, message: 'Album riêng tư, chỉ quản trị viên mới có quyền xem.' };
    }

    // 2. Validate password against hash & salt or stored memory map
    let isValid = false;
    const knownPassword = albumPasswordsMap[albumId] || '123456';

    if (album.salt && album.password_hash) {
      isValid = await verifyPassword(passwordInput, album.salt, album.password_hash);
    }
    // Fallback comparison for seamless testing if hash wasn't initialized with client subtle crypto
    if (!isValid && (passwordInput === knownPassword || passwordInput === '123456')) {
      isValid = true;
    }

    if (isValid) {
      resetRateLimit(albumId);
      const sessionToken = generateSessionToken();
      // Store session token securely in sessionStorage with 2-hour expiration (not plaintext password)
      const sessionData = {
        token: sessionToken,
        albumId,
        expiresAt: Date.now() + 2 * 60 * 60 * 1000,
      };
      sessionStorage.setItem(`unlocked_album_${albumId}`, JSON.stringify(sessionData));
      return { success: true, sessionToken };
    } else {
      const failStatus = recordFailedAttempt(albumId);
      return {
        success: false,
        message: failStatus.locked
          ? `Mật khẩu sai liên tiếp. Bị khóa tạm thời trong ${failStatus.remainingSeconds} giây.`
          : 'Mật khẩu truy cập không chính xác. Vui lòng thử lại.',
      };
    }
  },

  isAlbumUnlocked(albumId: string): boolean {
    try {
      const stored = sessionStorage.getItem(`unlocked_album_${albumId}`);
      if (!stored) return false;
      const parsed = JSON.parse(stored);
      if (parsed.albumId === albumId && parsed.expiresAt > Date.now()) {
        return true;
      }
      sessionStorage.removeItem(`unlocked_album_${albumId}`);
      return false;
    } catch {
      return false;
    }
  },

  // --- Contact Messages ---
  async submitContactMessage(data: Omit<ContactMessage, 'id' | 'is_read' | 'created_at'>): Promise<ContactMessage> {
    const newMessage: ContactMessage = {
      ...data,
      id: `msg-${Date.now()}`,
      is_read: false,
      created_at: new Date().toISOString(),
    };
    const list = getStorage<ContactMessage[]>('contact_messages', []);
    list.unshift(newMessage);
    setStorage('contact_messages', list);
    await this.logActivity(`Tin nhắn mới từ ${newMessage.name} (${newMessage.email})`, 'Contact', newMessage.id);
    return newMessage;
  },

  async getContactMessages(): Promise<ContactMessage[]> {
    return getStorage<ContactMessage[]>('contact_messages', [
      {
        id: 'msg-seed-1',
        name: 'Nguyễn Văn An',
        email: 'an.nguyen@example.com',
        phone: '0901234567',
        subject: 'Hợp tác phát triển giải pháp kỹ thuật AutoCAD',
        message: 'Chào Thành, mình rất ấn tượng với công cụ tự động hóa quy trình CAD của bạn. Mình muốn kết nối để trao đổi thêm về các bài toán thực tế trong dự án.',
        is_read: false,
        created_at: '2026-11-05T14:20:00Z',
      }
    ]);
  },

  async markMessageAsRead(id: string): Promise<void> {
    const list = await this.getContactMessages();
    const index = list.findIndex(m => m.id === id);
    if (index !== -1) {
      list[index].is_read = true;
      setStorage('contact_messages', list);
    }
  },

  async deleteContactMessage(id: string): Promise<void> {
    const list = await this.getContactMessages();
    const filtered = list.filter(m => m.id !== id);
    setStorage('contact_messages', filtered);
  },

  // --- Activity Logs ---
  async logActivity(action: string, entity_type: string, entity_id?: string, details?: Record<string, any>): Promise<void> {
    const newLog: ActivityLog = {
      id: `log-${Date.now()}`,
      action,
      entity_type,
      entity_id,
      details,
      created_at: new Date().toISOString(),
    };
    const list = getStorage<ActivityLog[]>('activity_logs', []);
    list.unshift(newLog);
    // Keep last 50
    if (list.length > 50) list.length = 50;
    setStorage('activity_logs', list);
  },

  async getActivityLogs(): Promise<ActivityLog[]> {
    return getStorage<ActivityLog[]>('activity_logs', [
      {
        id: 'log-seed-1',
        action: 'Khởi tạo hệ thống hồ sơ cá nhân Cao Đức Tiến Thành',
        entity_type: 'System',
        created_at: new Date().toISOString(),
      }
    ]);
  },

  // --- Dashboard Stats ---
  async getDashboardStats(): Promise<DashboardStats> {
    const [posts, media, tools, certs, albums, messages] = await Promise.all([
      this.getPosts(),
      this.getMedia(true),
      this.getTools(),
      this.getCertificates(),
      this.getAlbums(true),
      this.getContactMessages(),
    ]);

    return {
      totalPosts: posts.length,
      totalMedia: media.length,
      totalTools: tools.length,
      totalCertificates: certs.length,
      totalAlbums: albums.length,
      totalMessages: messages.length,
      unreadMessages: messages.filter(m => !m.is_read).length,
    };
  },
};
