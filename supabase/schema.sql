-- =========================================================================
-- DATABASE SCHEMA: CAO DUC TIEN THANH PERSONAL PORTFOLIO & CMS
-- =========================================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL DEFAULT 'Cao Đức Tiến Thành',
    birthday DATE DEFAULT '2002-12-10',
    phone TEXT DEFAULT '0972456724',
    location TEXT DEFAULT 'Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam',
    headline TEXT DEFAULT 'Engineering Mindset. Technical Skills. Continuous Growth.',
    bio TEXT DEFAULT 'I am Cao Duc Tien Thanh, a technology-oriented individual with experience in AutoCAD and developing practical tools to support work processes. I enjoy exploring new technologies, solving problems, and continuously improving my skills.',
    portrait_url TEXT,
    hero_image_url TEXT,
    email TEXT DEFAULT '',
    social_links JSONB DEFAULT '{"github": "", "linkedin": "", "facebook": ""}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. EDUCATION TABLE
CREATE TABLE IF NOT EXISTS education (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution TEXT NOT NULL,
    level TEXT,
    status TEXT NOT NULL DEFAULT 'Graduated',
    timeline TEXT,
    description TEXT,
    logo_url TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. SKILLS TABLE
CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'technical', -- 'technical', 'tools', 'languages', 'soft_skills'
    description TEXT,
    icon_url TEXT,
    badge_text TEXT,
    screenshots JSONB DEFAULT '[]'::jsonb,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. TOOLS TABLE (Self-developed Tools)
CREATE TABLE IF NOT EXISTS tools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    thumbnail_url TEXT,
    category TEXT DEFAULT 'Productivity',
    description TEXT NOT NULL,
    purpose TEXT,
    problem_solved TEXT,
    main_features JSONB DEFAULT '[]'::jsonb,
    technologies JSONB DEFAULT '[]'::jsonb,
    screenshots JSONB DEFAULT '[]'::jsonb,
    demo_url TEXT,
    download_url TEXT,
    dev_date TEXT,
    is_published BOOLEAN DEFAULT true,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. CERTIFICATES TABLE
CREATE TABLE IF NOT EXISTS certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    issuing_org TEXT,
    score TEXT,
    issue_date TEXT,
    description TEXT,
    image_url TEXT,
    credential_url TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 6. INTERESTS TABLE
CREATE TABLE IF NOT EXISTS interests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL, -- 'sports', 'music', 'learning', 'technology'
    description TEXT NOT NULL,
    image_url TEXT,
    tags JSONB DEFAULT '[]'::jsonb,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 7. CATEGORIES & TAGS
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 8. POSTS TABLE (Journal)
CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT NOT NULL,
    cover_image_url TEXT,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    category_name TEXT,
    tags JSONB DEFAULT '[]'::jsonb,
    status TEXT NOT NULL DEFAULT 'published', -- 'published', 'draft'
    views_count INT DEFAULT 0,
    published_at TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 9. MEDIA LIBRARY TABLE
CREATE TABLE IF NOT EXISTS media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    file_name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_type TEXT NOT NULL DEFAULT 'image', -- 'image', 'video'
    size_bytes BIGINT,
    caption TEXT,
    category TEXT DEFAULT 'general',
    is_private BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 10. ALBUMS TABLE (Memories)
CREATE TABLE IF NOT EXISTS albums (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    cover_image_url TEXT,
    visibility TEXT NOT NULL DEFAULT 'PUBLIC', -- 'PUBLIC', 'PASSWORD_PROTECTED', 'ADMIN_ONLY'
    password_hash TEXT,
    salt TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 11. ALBUM MEDIA (Relationship)
CREATE TABLE IF NOT EXISTS album_media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    album_id UUID NOT NULL REFERENCES albums(id) ON DELETE CASCADE,
    media_id UUID NOT NULL REFERENCES media(id) ON DELETE CASCADE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 12. ALBUM ACCESS SESSIONS (Short-lived backend verification for password-protected albums)
CREATE TABLE IF NOT EXISTS album_access_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    album_id UUID NOT NULL REFERENCES albums(id) ON DELETE CASCADE,
    session_token TEXT NOT NULL UNIQUE,
    expires_at TIMESTAMPTZ NOT NULL,
    client_ip TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 13. SITE SETTINGS
CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 14. CONTACT MESSAGES
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 15. ACTIVITY LOGS
CREATE TABLE IF NOT EXISTS activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    details JSONB,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- =========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE album_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE album_access_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Public can read public items
CREATE POLICY "Public read profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Public read education" ON education FOR SELECT USING (true);
CREATE POLICY "Public read skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Public read tools" ON tools FOR SELECT USING (is_published = true);
CREATE POLICY "Public read certificates" ON certificates FOR SELECT USING (true);
CREATE POLICY "Public read interests" ON interests FOR SELECT USING (true);
CREATE POLICY "Public read published posts" ON posts FOR SELECT USING (status = 'published');
CREATE POLICY "Public read public media" ON media FOR SELECT USING (is_private = false);
CREATE POLICY "Public read public albums" ON albums FOR SELECT USING (visibility = 'PUBLIC');
CREATE POLICY "Public insert contact_messages" ON contact_messages FOR INSERT WITH CHECK (true);

-- Authenticated Admin has full access to all tables
CREATE POLICY "Admin full access profiles" ON profiles FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access education" ON education FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access skills" ON skills FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access tools" ON tools FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access certificates" ON certificates FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access interests" ON interests FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access posts" ON posts FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access media" ON media FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access albums" ON albums FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access album_media" ON album_media FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access contact_messages" ON contact_messages FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access site_settings" ON site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access activity_logs" ON activity_logs FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- =========================================================================
-- STORAGE BUCKETS SETUP & POLICIES (SUPABASE STORAGE)
-- =========================================================================

-- Public bucket for general images, drawings, and certificates
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-public', 'portfolio-public', true)
ON CONFLICT (id) DO NOTHING;

-- Private bucket for password-protected album media & confidential files
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-private', 'portfolio-private', false)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS Policies
CREATE POLICY "Public Read Portfolio Assets" ON storage.objects
FOR SELECT USING (bucket_id = 'portfolio-public');

CREATE POLICY "Admin All Bucket Access" ON storage.objects
FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- =========================================================================
-- SECURE ALBUM PASSWORD VERIFICATION FUNCTION
-- =========================================================================

CREATE OR REPLACE FUNCTION verify_album_password(p_album_id UUID, p_password TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_album RECORD;
    v_session_token TEXT;
    v_expires_at TIMESTAMPTZ;
BEGIN
    -- Rate limit check could be added here
    SELECT * INTO v_album FROM albums WHERE id = p_album_id;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'message', 'Album not found');
    END IF;

    IF v_album.visibility = 'PUBLIC' THEN
        RETURN jsonb_build_object('success', true, 'session_token', 'public');
    END IF;

    IF v_album.visibility = 'ADMIN_ONLY' THEN
        RETURN jsonb_build_object('success', false, 'message', 'Private admin-only album');
    END IF;

    -- Verify password hash using crypt
    IF v_album.password_hash = crypt(p_password, v_album.password_hash) THEN
        v_session_token := encode(gen_random_bytes(32), 'hex');
        v_expires_at := now() + interval '2 hours';

        INSERT INTO album_access_sessions (album_id, session_token, expires_at)
        VALUES (p_album_id, v_session_token, v_expires_at);

        RETURN jsonb_build_object(
            'success', true,
            'session_token', v_session_token,
            'expires_at', v_expires_at
        );
    ELSE
        RETURN jsonb_build_object('success', false, 'message', 'Invalid password');
    END IF;
END;
$$;

-- Function to set/replace album password securely
CREATE OR REPLACE FUNCTION set_album_password(p_album_id UUID, p_new_password TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_hash TEXT;
BEGIN
    v_hash := crypt(p_new_password, gen_salt('bf', 10));
    
    UPDATE albums 
    SET password_hash = v_hash,
        visibility = 'PASSWORD_PROTECTED',
        updated_at = now()
    WHERE id = p_album_id;

    -- Invalidate existing sessions for this album immediately
    DELETE FROM album_access_sessions WHERE album_id = p_album_id;

    RETURN true;
END;
$$;

-- =========================================================================
-- SEED DATA (VERIFIED INFORMATION FOR CAO DUC TIEN THANH)
-- =========================================================================

INSERT INTO profiles (full_name, birthday, phone, location, headline, bio)
VALUES (
    'Cao Đức Tiến Thành',
    '2002-12-10',
    '0972456724',
    'Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam',
    'Engineering Mindset. Technical Skills. Continuous Growth.',
    'I am Cao Duc Tien Thanh, a technology-oriented individual with experience in AutoCAD and developing practical tools to support work processes. I enjoy exploring new technologies, solving problems, and continuously improving my skills.'
) ON CONFLICT DO NOTHING;

-- Education: THPT Chuyên Nguyễn Hữu Huân & Đại học Bách khoa TP.HCM
INSERT INTO education (institution, level, status, timeline, description, sort_order)
VALUES 
(
    'Trường THPT chuyên Nguyễn Hữu Huân',
    'High School',
    'Graduated',
    'Graduated',
    'Nền tảng học thuật vững chắc, rèn luyện tư duy logic, sự kiên trì và niềm say mê khám phá khoa học kỹ thuật.',
    1
),
(
    'Trường Đại học Bách khoa – Đại học Quốc gia TP.HCM',
    'University',
    'Graduated',
    'Graduated',
    'Môi trường kỹ thuật hàng đầu rèn luyện tư duy kỹ thuật (Engineering Mindset), khả năng nghiên cứu độc lập, kỹ năng CAD và phát triển các giải pháp thực tế phục vụ công việc.',
    2
) ON CONFLICT DO NOTHING;

-- Skills
INSERT INTO skills (name, category, description, badge_text, sort_order)
VALUES 
(
    'AutoCAD',
    'technical',
    'Kinh nghiệm sử dụng AutoCAD trong đọc hiểu, thiết kế và tối ưu bản vẽ kỹ thuật, đảm bảo độ chuẩn xác và tiêu chuẩn kỹ thuật cao.',
    'Primary Skill',
    1
),
(
    'Self-developed Work Tools',
    'tools',
    'Độc lập phát triển các công cụ hỗ trợ quy trình công việc, tự động hóa tác vụ lặp đi lặp lại nhằm nâng cao năng suất và độ chính xác.',
    'Practical Solution',
    2
),
(
    'TOEIC 600',
    'languages',
    'Chứng chỉ tiếng Anh quốc tế TOEIC đạt 600 điểm, tự tin đọc hiểu tài liệu kỹ thuật chuyên ngành và giao tiếp công việc.',
    'Certified Score 600',
    3
),
(
    'Problem Solving & Self-learning',
    'soft_skills',
    'Khả năng tự học công nghệ mới nhanh chóng, tư duy phân tích nguyên nhân cốt lõi và tìm kiếm giải pháp hiệu quả cho bài toán thực tế.',
    'Core Mindset',
    4
),
(
    'Adaptability & Independent Work',
    'soft_skills',
    'Tính chủ động cao, làm việc độc lập có trách nhiệm, thích ứng linh hoạt trước yêu cầu kỹ thuật và môi trường làm việc mới.',
    'Professional',
    5
) ON CONFLICT DO NOTHING;

-- Initial Certificate: TOEIC 600
INSERT INTO certificates (title, issuing_org, score, issue_date, description, sort_order)
VALUES (
    'TOEIC Listening & Reading',
    'ETS (Educational Testing Service)',
    '600',
    'Verified',
    'Chứng chỉ Anh ngữ quốc tế TOEIC đạt 600 điểm, chứng minh năng lực ngôn ngữ sẵn sàng cho công việc kỹ thuật và tài liệu quốc tế.',
    1
) ON CONFLICT DO NOTHING;

-- Initial Tools Showcase (Placeholders with verified context: practical work support tools)
INSERT INTO tools (name, category, description, purpose, problem_solved, main_features, technologies, dev_date, sort_order)
VALUES 
(
    'Technical Automation Helper (Work Tool #1)',
    'Engineering & CAD Support',
    'Công cụ tự động hóa quy trình hỗ trợ công việc kỹ thuật, trích xuất dữ liệu và tối ưu thời gian thao tác bản vẽ.',
    'Giảm thiểu thời gian xử lý thủ công và nâng cao độ chuẩn xác trong xử lý tác vụ kỹ thuật hàng ngày.',
    'Giải quyết bài toán lặp đi lặp lại nhiều lần khi chuẩn bị và kiểm tra bản vẽ, tránh sai sót thủ công.',
    '["Tự động hóa xử lý dữ liệu đầu vào", "Kiểm tra tính toàn vẹn và độ chuẩn xác", "Xuất báo cáo kết quả tức thì"]'::jsonb,
    '["AutoCAD Scripting / Lisp / Python / Automation Tools"]'::jsonb,
    'Placeholder - Cập nhật trong Admin',
    1
),
(
    'Workflow Optimizer Utility (Work Tool #2)',
    'Workflow Utility',
    'Tiện ích độc lập do tác giả tự xây dựng nhằm tối ưu hóa chuỗi quy trình thao tác và đồng bộ tài liệu dự án.',
    'Hỗ trợ quản lý và phân loại tài nguyên công việc có hệ thống.',
    'Rút ngắn thời gian tìm kiếm, liên kết các đầu mối dữ liệu kỹ thuật.',
    '["Giao diện tối giản, tập trung vào hiệu năng", "Xử lý hàng loạt", "Dễ dàng tùy biến theo dự án"]'::jsonb,
    '["Desktop Utility / Automation Scripts"]'::jsonb,
    'Placeholder - Cập nhật trong Admin',
    2
) ON CONFLICT DO NOTHING;

-- Interests & Personality
INSERT INTO interests (title, category, description, tags, sort_order)
VALUES 
(
    'Sports & Physical Activity',
    'sports',
    'Chơi thể thao giúp rèn luyện thể lực bền bỉ, tính kỷ luật cao và giải tỏa áp lực sau những giờ nghiên cứu kỹ thuật căng thẳng.',
    '["Thể thao", "Kỷ luật", "Năng lượng tích cực"]'::jsonb,
    1
),
(
    'Music & Acoustic Moments',
    'music',
    'Âm nhạc là nguồn cảm hứng sáng tạo, giúp duy trì sự tập trung cao độ và cân bằng cảm xúc trong cuộc sống.',
    '["Âm nhạc", "Cảm hứng", "Tập trung"]'::jsonb,
    2
),
(
    'Continuous Learning & Technology Discovery',
    'learning',
    'Luôn giữ tinh thần cởi mở, tò mò tìm hiểu công nghệ mới và học hỏi không ngừng để hoàn thiện bản thân mỗi ngày.',
    '["Tự học", "Công nghệ mới", "Tư duy kỹ thuật"]'::jsonb,
    3
) ON CONFLICT DO NOTHING;
