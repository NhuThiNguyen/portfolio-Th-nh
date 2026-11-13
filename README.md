# CAO ĐỨC TIẾN THÀNH — PREMIUM PERSONAL PORTFOLIO & CMS

> **Engineering Mindset. Technical Skills. Continuous Growth.**
> 
> Trang web Portfolio cá nhân cao cấp tích hợp hệ quản trị nội dung (CMS Admin Dashboard) độc lập dành riêng cho **Cao Đức Tiến Thành**.

---

## 🌟 TỔNG QUAN DỰ ÁN

Dự án là một hệ thống web cá nhân hoàn chỉnh bao gồm hai giao diện phân tách rõ ràng:

1. **USER WEBSITE**: Hồ sơ năng lực cá nhân kỹ thuật số, giới thiệu học vấn, kỹ năng AutoCAD, các công cụ kỹ thuật tự phát triển, chứng chỉ TOEIC 600, sở thích, nhật ký chia sẻ (Journal), thư viện ảnh và hệ thống album kỷ niệm bảo mật.
2. **ADMIN DASHBOARD (CMS)**: Bảng điều khiển quản trị toàn diện cho phép chủ sở hữu cập nhật trực tiếp toàn bộ thông tin cá nhân, quản lý các công cụ, bài viết, tải lên hình ảnh/video, và cấu hình các album riêng tư/bảo vệ bằng mật khẩu mà **không cần chỉnh sửa mã nguồn**.

---

## 🎨 HỆ THỐNG MÀU SẮC & THIẾT KẾ (PASTEL BLUE & WHITE)

Website tuân thủ nghiêm ngặt bảng màu kỹ thuật pastel hiện đại:
- **Background**: `#F4F8FD`
- **Primary blue**: `#A9CFF5`
- **Light blue**: `#DCEEFF`
- **Accent blue**: `#75AFE5`
- **Deep blue**: `#315778`
- **White**: `#FFFFFF`
- **Primary text**: `#263D55`
- **Secondary text**: `#8296AA`
- **Border**: `#E4EDF6`

---

## 🚀 TÍNH NĂNG CHÍNH

### 1. Giao Diện Người Dùng (User Portfolio)
- **Home / Hero**: Tên lớn **CAO ĐỨC TIẾN THÀNH**, thông điệp nghề nghiệp, chân dung cá nhân trong khung CAD kỹ thuật, huy hiệu TOEIC 600 và AutoCAD.
- **About Me**: Hồ sơ xác thực, ngày sinh **10/12/2002**, nơi cư trú **Thủ Đức, TP.HCM**, định hướng kỹ thuật và tư duy tự học.
- **Education Timeline**: 
  - *Trường THPT chuyên Nguyễn Hữu Huân* (Graduated)
  - *Trường Đại học Bách khoa – Đại học Quốc gia TP.HCM* (Graduated)
- **Technical Skills**: Kỹ năng trọng tâm **AutoCAD** (kèm ảnh minh họa thực tế), các công cụ tự phát triển, chứng chỉ **TOEIC 600**, kỹ năng mềm.
- **My Tools**: Trưng bày các tiện ích và script độc lập phục vụ quy trình làm việc, kèm modal xem chi tiết mục đích, bài toán giải quyết, công nghệ và link demo/tải về.
- **Certificates**: Chứng chỉ **TOEIC 600** từ ETS, chứng thực điểm số và hình ảnh gốc.
- **Interests & Personality**: Hoạt động thể thao, niềm đam mê âm nhạc, tinh thần khám phá công nghệ mới.
- **My Journal**: Blog cá nhân với tìm kiếm, lọc tags, phân loại chuyên mục và trình đọc bài viết.
- **Gallery**: Thư viện ảnh bố cục Responsive Masonry, bộ lọc danh mục và chế độ xem phóng to Fullscreen Lightbox.
- **Memories**: Album kỷ niệm với 3 cấp độ phân quyền bảo mật:
  - `PUBLIC`: Công khai cho mọi người xem.
  - `PASSWORD_PROTECTED`: Khóa bằng mật khẩu riêng độc lập cho từng album (người xem **không cần tạo tài khoản**, xác thực băm bảo mật SHA-256 / PBKDF2, giới hạn số lần thử sai chống tấn công brute force, phiên truy cập có thời hạn).
  - `ADMIN_ONLY`: Chỉ hiển thị khi quản trị viên đã đăng nhập.
- **Contact**: Số điện thoại **0972456724** (sao chép 1 chạm, click-to-call), địa chỉ Thủ Đức, email có thể tùy biến qua Admin, form gửi liên hệ trực tiếp.

### 2. Giao Diện Quản Trị (Admin Dashboard CMS)
Truy cập qua đường dẫn: `/admin` (hoặc `/admin/login`)
- `/admin/dashboard`: Thống kê tổng số bài viết, media, công cụ, chứng chỉ, album và tin nhắn liên hệ mới.
- `/admin/profile`: Chỉnh sửa họ tên, ngày sinh, số điện thoại, địa chỉ, tiểu sử, tiêu đề, email, liên kết mạng xã hội.
- `/admin/education`: Thêm, sửa, xóa các mốc học vấn và trường học.
- `/admin/skills`: Quản lý kỹ năng, ảnh minh họa thực tế, sắp xếp thứ tự hiển thị.
- `/admin/tools`: Quản lý công cụ tự phát triển, tính năng chính, bài toán giải quyết, ảnh chụp màn hình, ẩn/hiện công khai.
- `/admin/certificates`: Cập nhật chứng chỉ, điểm số, tổ chức cấp và hình ảnh.
- `/admin/interests`: Thêm và cập nhật sở thích cá nhân, ảnh và thẻ tag.
- `/admin/posts`: Tạo, chỉnh sửa, xuất bản hoặc lưu nháp bài viết nhật ký kỹ thuật.
- `/admin/media`: Thư viện quản lý hình ảnh, video, phân loại riêng tư/công khai.
- `/admin/albums`: Quản lý album, thay đổi ảnh bìa, thiết lập phân quyền và **đổi mật khẩu truy cập** (tự động hủy các phiên đăng nhập cũ).
- `/admin/settings`: Xem và quản lý hộp thư tin nhắn từ người truy cập, kiểm tra kết nối Supabase và lịch sử hoạt động.

---

## 🛠️ CÔNG NGHỆ SỬ DỤNG

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS với bộ token màu Pastel tùy chỉnh
- **Icons**: Lucide React
- **Animations**: CSS Smooth Transitions & Blueprint Technical Aesthetics
- **Bảo mật**: Web Crypto API (PBKDF2 & SHA-256 Salted Hashing), Rate Limiting, Temporary Access Tokens
- **Backend & Database**: Hỗ trợ đồng thời:
  - **Supabase Cloud Backend**: PostgreSQL, Row Level Security (RLS), Supabase Auth, Storage Buckets.
  - **Local Persistence DataStore**: Tự động chuyển đổi mượt mà để chạy offline hoặc thử nghiệm ngay lập tức mà không bị gián đoạn.

---

## 📦 CÀI ĐẶT & CHẠY DỰ ÁN

### 1. Cài đặt Dependencies
```bash
npm install
```

### 2. Cấu hình Biến Môi Trường (`.env`)
Tạo tệp `.env` từ `.env.example`:
```env
# Supabase Configuration (Tùy chọn: Điền khi muốn đồng bộ đám mây)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Tài khoản Quản trị mặc định (Có thể đăng nhập ngay ở chế độ Offline/Demo)
VITE_ADMIN_DEFAULT_EMAIL=admin@caoductienthanh.com
VITE_ADMIN_DEFAULT_PASSWORD=admin123456
```

### 3. Chạy Chế Độ Phát Triển (Dev Server)
```bash
npm run dev
```
Mở trình duyệt tại: `http://localhost:3000`

### 4. Build Bản Production
```bash
npm run build
```
Bản build tĩnh được xuất vào thư mục `dist/`.

---

## 🗄️ CẤU HÌNH SUPABASE (NẾU KẾT NỐI CLOUD)

1. Tạo một dự án mới trên [Supabase](https://supabase.com).
2. Vào **SQL Editor** trong bảng điều khiển Supabase.
3. Mở tệp `supabase/schema.sql` trong dự án và dán toàn bộ nội dung vào SQL Editor, sau đó nhấn **Run**.
   - Script SQL sẽ tự động tạo đầy đủ các bảng: `profiles`, `education`, `skills`, `tools`, `certificates`, `interests`, `posts`, `media`, `albums`, `album_media`, `album_access_sessions`, `contact_messages`, `activity_logs`.
   - Cấu hình Row Level Security (RLS) bảo vệ dữ liệu riêng tư.
   - Tạo hàm băm mật khẩu `verify_album_password` và nạp sẵn dữ liệu ban đầu đã xác thực cho **Cao Đức Tiến Thành**.
4. Vào **Project Settings -> API**, copy **Project URL** và **anon public key** vào tệp `.env`.
5. Tạo tài khoản Admin trong phần **Authentication -> Users** hoặc sử dụng trực tiếp tài khoản đăng nhập quản trị mặc định.

---

## 🔑 THÔNG TIN ĐĂNG NHẬP ADMIN MẶC ĐỊNH

Khi vào đường dẫn `/admin/login`, bạn có thể nhấn nút **"Nhấn để điền nhanh"** hoặc nhập:
- **Email**: `admin@caoductienthanh.com`
- **Mật khẩu**: `admin123456`

*(Mật khẩu demo cho Album Kỷ niệm được bảo vệ: `123456`)*

---

## 🚢 HƯỚNG DẪN TRIỂN KHAI (DEPLOY)

### Triển khai lên Vercel / Netlify / Cloudflare Pages:
1. Đẩy mã nguồn lên kho lưu trữ GitHub của bạn.
2. Kết nối repo với Vercel / Netlify.
3. Thiết lập:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Cấu hình biến môi trường tương tự như tệp `.env`.
5. Nhấn **Deploy** — website sẵn sàng hoạt động!

---

*Thiết kế và phát triển với tư duy kỹ thuật & thẩm mỹ cao cấp dành cho **Cao Đức Tiến Thành**.*
