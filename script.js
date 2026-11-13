/**
 * CAO DUC TIEN THANH — PORTFOLIO & CMS APPLICATION SCRIPT
 * Verified Personal Information & Full Dynamic Data Management
 */

// ==========================================================================
// 1. VERIFIED INITIAL SEED DATA
// ==========================================================================
const DEFAULT_STORE = {
  profile: {
    full_name: "Cao Đức Tiến Thành",
    birthday: "2002-12-10",
    phone: "0972456724",
    location: "Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam",
    headline: "Engineering Mindset. Technical Skills. Continuous Growth.",
    bio: "I am Cao Duc Tien Thanh, a technology-oriented individual with experience in AutoCAD and developing practical tools to support work processes. I enjoy exploring new technologies, solving problems, and continuously improving my skills.",
    portrait_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
    email: "",
    social_links: {
      github: "",
      linkedin: "",
      facebook: "",
      zalo: "0972456724"
    }
  },
  education: [
    {
      id: "edu-1",
      institution: "Trường THPT chuyên Nguyễn Hữu Huân",
      level: "High School",
      status: "Graduated",
      timeline: "Graduated",
      description: "Nền tảng học thuật vững chắc, rèn luyện tư duy logic, sự kiên trì và niềm say mê khám phá khoa học kỹ thuật."
    },
    {
      id: "edu-2",
      institution: "Trường Đại học Bách khoa – Đại học Quốc gia TP.HCM",
      level: "University",
      status: "Graduated",
      timeline: "Graduated",
      description: "Môi trường kỹ thuật hàng đầu rèn luyện tư duy kỹ thuật (Engineering Mindset), khả năng nghiên cứu độc lập, kỹ năng CAD và phát triển các giải pháp thực tế phục vụ công việc."
    }
  ],
  skills: [
    {
      id: "skill-1",
      name: "AutoCAD",
      category: "technical",
      description: "Kinh nghiệm sử dụng AutoCAD trong đọc hiểu, thiết kế và tối ưu bản vẽ kỹ thuật, đảm bảo độ chuẩn xác và tiêu chuẩn kỹ thuật cao.",
      badge: "Primary Skill",
      screenshots: [
        "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800"
      ]
    },
    {
      id: "skill-2",
      name: "Self-developed Work Tools",
      category: "tools",
      description: "Độc lập phát triển các công cụ hỗ trợ quy trình công việc, tự động hóa tác vụ lặp đi lặp lại nhằm nâng cao năng suất và độ chính xác.",
      badge: "Practical Solution"
    },
    {
      id: "skill-3",
      name: "TOEIC 600",
      category: "languages",
      description: "Chứng chỉ tiếng Anh quốc tế TOEIC đạt 600 điểm, tự tin đọc hiểu tài liệu kỹ thuật chuyên ngành và giao tiếp công việc.",
      badge: "Certified Score 600"
    },
    {
      id: "skill-4",
      name: "Self-learning & Problem Solving",
      category: "soft_skills",
      description: "Khả năng tự học công nghệ mới nhanh chóng, tư duy phân tích nguyên nhân cốt lõi và tìm kiếm giải pháp hiệu quả."
    },
    {
      id: "skill-5",
      name: "Adaptability & Independent Work",
      category: "soft_skills",
      description: "Tính chủ động cao, làm việc độc lập có trách nhiệm, thích ứng linh hoạt trước yêu cầu kỹ thuật mới."
    },
    {
      id: "skill-6",
      name: "Continuous Improvement",
      category: "soft_skills",
      description: "Luôn tìm kiếm phương pháp tối ưu hóa thao tác để đạt năng suất và chất lượng công việc cao hơn mỗi ngày."
    }
  ],
  tools: [
    {
      id: "tool-1",
      name: "CAD Drawing Automation & Batch Processor",
      category: "Engineering & CAD Utility",
      thumbnail_url: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=800",
      description: "Công cụ độc lập hỗ trợ kỹ thuật viên tự động hóa việc rà soát, kiểm tra lớp layer và chuẩn hóa thuộc tính bản vẽ AutoCAD hàng loạt.",
      purpose: "Rút ngắn thời gian xử lý thủ công các tệp bản vẽ lớn, giảm thiểu 85% sai sót định dạng kỹ thuật khi chuẩn bị hồ sơ.",
      problem_solved: "Quy trình kiểm tra thủ công tiêu tốn hàng giờ đồng hồ và dễ phát sinh lỗi khi quản lý hàng chục bản vẽ cùng lúc.",
      main_features: [
        "Quét và đối chiếu layer tự động theo quy chuẩn kỹ thuật",
        "Đổi tên và trích xuất danh mục thuộc tính hàng loạt",
        "Xuất nhật ký kiểm tra định dạng bản vẽ tức thì",
        "Tương thích mượt mà với nhiều phiên bản CAD"
      ],
      technologies: ["AutoCAD Scripting", "Automation Helper", "CLI Script", "Data Parser"],
      screenshots: [
        "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1000"
      ],
      demo_url: "",
      download_url: "",
      dev_date: "Placeholder - Cập nhật trong CMS Admin",
      is_published: true
    },
    {
      id: "tool-2",
      name: "Technical Data Exporter & Formatter",
      category: "Workflow Automation",
      thumbnail_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      description: "Tiện ích chuyển đổi và đồng bộ dữ liệu kỹ thuật từ bản vẽ sang bảng biểu thống kê tổng hợp phục vụ báo cáo nhanh.",
      purpose: "Hỗ trợ kỹ sư đồng bộ dữ liệu thống kê khối lượng và danh mục vật tư chính xác.",
      problem_solved: "Nhập liệu thủ công từ bản vẽ sang bảng tính thường xuyên xảy ra nhầm lẫn và khó cập nhật khi bản vẽ có sửa đổi.",
      main_features: [
        "Trích xuất tự động bảng thuộc tính từ bản vẽ",
        "Định dạng chuẩn hóa bảng tính",
        "Kiểm tra tính logic và đối chiếu dữ liệu trùng lặp",
        "Giao diện trực quan, thao tác nhanh gọn"
      ],
      technologies: ["Scripting Utility", "Data Converter", "Excel/CSV Formatter"],
      screenshots: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000"
      ],
      demo_url: "",
      download_url: "",
      dev_date: "Placeholder - Cập nhật trong CMS Admin",
      is_published: true
    }
  ],
  certificates: [
    {
      id: "cert-1",
      title: "TOEIC Listening & Reading",
      issuing_org: "ETS (Educational Testing Service)",
      score: "600",
      issue_date: "Verified",
      description: "Chứng chỉ Anh ngữ quốc tế TOEIC đạt 600 điểm. Khả năng đọc hiểu tài liệu kỹ thuật, chuẩn bị tài liệu dự án và trao đổi công việc hiệu quả.",
      image_url: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=800"
    }
  ],
  interests: [
    {
      id: "intr-1",
      title: "Sports & Physical Activity",
      category: "sports",
      description: "Chơi thể thao giúp rèn luyện thể lực bền bỉ, tính kỷ luật cao và giải tỏa áp lực sau những giờ nghiên cứu kỹ thuật căng thẳng.",
      image_url: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800",
      tags: ["Thể thao", "Kỷ luật", "Năng lượng tích cực"]
    },
    {
      id: "intr-2",
      title: "Music & Acoustic Focus",
      category: "music",
      description: "Âm nhạc là nguồn cảm hứng sáng tạo, giúp tôi duy trì sự tập trung cao độ và cân bằng cảm xúc khi giải quyết bài toán phức tạp.",
      image_url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800",
      tags: ["Âm nhạc", "Cảm hứng", "Tập trung"]
    },
    {
      id: "intr-3",
      title: "Continuous Learning & Technology Discovery",
      category: "learning",
      description: "Luôn giữ tinh thần cởi mở, tò mò tìm hiểu công nghệ mới và học hỏi không ngừng để hoàn thiện bản thân mỗi ngày.",
      image_url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
      tags: ["Tự học", "Công nghệ mới", "Tư duy kỹ thuật"]
    }
  ],
  posts: [
    {
      id: "post-1",
      title: "Tư duy tối ưu hóa quy trình kỹ thuật: Từ bài toán lặp lại đến giải pháp tự động",
      excerpt: "Tại sao việc dành vài giờ xây dựng công cụ hỗ trợ lại có thể tiết kiệm hàng trăm giờ lao động thủ công trong tương lai?",
      content: `Trong công việc kỹ thuật, chúng ta thường xuyên đối mặt với những tác vụ mang tính lặp đi lặp lại. Ban đầu, có thể việc làm thủ công chỉ mất 10-15 phút mỗi lần. Nhưng khi nhân lên với hàng chục bản vẽ hoặc hàng trăm dự án, thời gian lãng phí và nguy cơ xảy ra sai sót con người là rất lớn.\n\nKhi bắt đầu nghiên cứu và sử dụng AutoCAD, tôi nhận ra rằng sự chuẩn xác không chỉ đến từ sự cẩn thận đơn thuần, mà đến từ một hệ thống quy chuẩn và các công cụ bổ trợ. Bằng cách tự nghiên cứu và xây dựng các tiện ích nhỏ để tự động hóa khâu kiểm tra, tôi có thể giảm thiểu sai sót xuống mức thấp nhất và tập trung trí lực cho những vấn đề cốt lõi.\n\nTư duy kỹ thuật (Engineering Mindset) là không ngừng đặt câu hỏi: "Có cách nào thực hiện điều này tốt hơn, nhanh hơn và chuẩn xác hơn không?".`,
      cover_image_url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000",
      category_name: "Engineering & Workflow",
      tags: ["AutoCAD", "Tự động hóa", "Tư duy kỹ thuật", "Năng suất"],
      status: "published",
      views_count: 142,
      published_at: "2026-10-15"
    },
    {
      id: "post-2",
      title: "Hành trình chinh phục TOEIC 600 và ứng dụng tiếng Anh trong đọc hiểu tài liệu kỹ thuật",
      excerpt: "Tiếng Anh không chỉ là một chứng chỉ trên giấy mà là chiếc chìa khóa mở ra kho tàng tài liệu kỹ thuật và phần mềm quốc tế.",
      content: `Đạt điểm số TOEIC 600 là một cột mốc quan trọng giúp tôi tự tin hơn khi tiếp cận các tài liệu chuyên ngành, hướng dẫn kỹ thuật của các hãng phần mềm lớn và các diễn đàn công nghệ quốc tế.\n\nTrong quá trình học và thực hành, việc đọc hiểu thông số kỹ thuật, lỗi phát sinh trong câu lệnh và tài liệu API là điều diễn ra hàng ngày. Ngoại ngữ giúp tôi giải quyết vấn đề độc lập nhanh hơn thay vì phải phụ thuộc vào các bản dịch chưa sát nghĩa.`,
      cover_image_url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1000",
      category_name: "Learning & Skills",
      tags: ["TOEIC", "Học ngoại ngữ", "Tự học", "Tài liệu kỹ thuật"],
      status: "published",
      views_count: 98,
      published_at: "2026-11-01"
    }
  ],
  media: [
    {
      id: "med-1",
      file_name: "autocad-drawing-spec.jpg",
      file_url: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=1200",
      caption: "Kiểm tra chi tiết và lớp layer bản vẽ kỹ thuật CAD",
      category: "AutoCAD",
      is_private: false
    },
    {
      id: "med-2",
      file_name: "technical-workspace.jpg",
      file_url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200",
      caption: "Không gian làm việc nghiên cứu và thử nghiệm công cụ",
      category: "Workspace",
      is_private: false
    },
    {
      id: "med-3",
      file_name: "sports-endurance.jpg",
      file_url: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=1200",
      caption: "Hoạt động thể thao rèn luyện sức bền",
      category: "Sports",
      is_private: false
    },
    {
      id: "med-4",
      file_name: "music-acoustic.jpg",
      file_url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1200",
      caption: "Âm nhạc và những phút giây sáng tạo ý tưởng",
      category: "Music",
      is_private: false
    },
    {
      id: "med-5",
      file_name: "hcmut-bachkhoa.jpg",
      file_url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200",
      caption: "Kỷ niệm khuôn viên Đại học Bách khoa ĐHQG TP.HCM",
      category: "Campus",
      is_private: false
    },
    {
      id: "med-6",
      file_name: "private-engineering-notes.jpg",
      file_url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200",
      caption: "Tài liệu nghiên cứu và ghi chú kỹ thuật nội bộ",
      category: "Private",
      is_private: true
    }
  ],
  albums: [
    {
      id: "alb-1",
      title: "Campus & University Journey",
      description: "Những khoảnh khắc đáng nhớ trong quá trình học tập và rèn luyện tại Bách Khoa và Nguyễn Hữu Huân.",
      cover_image_url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
      visibility: "PUBLIC",
      media_ids: ["med-5", "med-3", "med-4"]
    },
    {
      id: "alb-2",
      title: "Engineering Projects & Prototype Lab",
      description: "Album lưu trữ hình ảnh tiến trình phát triển công cụ và dữ liệu thử nghiệm kỹ thuật. Yêu cầu mật khẩu truy cập.",
      cover_image_url: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=800",
      visibility: "PASSWORD_PROTECTED",
      password: "123456", // Default demo shared password
      media_ids: ["med-1", "med-2"]
    },
    {
      id: "alb-3",
      title: "Personal Archives & Milestones (Admin Only)",
      description: "Album tài liệu cá nhân độc quyền, chỉ hiển thị cho quản trị viên đã đăng nhập.",
      cover_image_url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
      visibility: "ADMIN_ONLY",
      media_ids: ["med-6"]
    }
  ],
  contact_messages: [
    {
      id: "msg-1",
      name: "Nguyễn Văn An",
      email: "an.nguyen@example.com",
      phone: "0901234567",
      subject: "Hợp tác phát triển giải pháp kỹ thuật AutoCAD",
      message: "Chào Thành, mình rất ấn tượng với công cụ tự động hóa quy trình CAD của bạn. Mình muốn kết nối để trao đổi thêm về các bài toán thực tế trong dự án.",
      is_read: false,
      created_at: "2026-11-05"
    }
  ],
  activity_logs: [
    {
      id: "log-1",
      action: "Khởi tạo hệ thống hồ sơ cá nhân Cao Đức Tiến Thành",
      entity_type: "System",
      created_at: "2026-11-09"
    }
  ]
};

// ==========================================================================
// 2. DATA STORE HELPER (LOCAL STORAGE PERSISTENCE)
// ==========================================================================
const STORAGE_KEY = "caoductienthanh_portfolio_v2";

function getAppData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveAppData(DEFAULT_STORE);
      return DEFAULT_STORE;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Storage read error:", e);
    return DEFAULT_STORE;
  }
}

function saveAppData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Storage write error:", e);
  }
}

function logActivity(action, entity_type) {
  const data = getAppData();
  data.activity_logs.unshift({
    id: "log-" + Date.now(),
    action,
    entity_type,
    created_at: new Date().toISOString().split("T")[0]
  });
  if (data.activity_logs.length > 50) data.activity_logs.length = 50;
  saveAppData(data);
}

// ==========================================================================
// 2B. INDEXEDDB PERSISTENCE FOR LARGE MEDIA FILES (IMAGES, VIDEOS, DOCS)
// ==========================================================================
const DB_NAME = "ThanhPortfolioDB";
const DB_VERSION = 1;
const STORE_NAME = "media_blobs";
const blobUrlCache = new Map();

function openMediaDB() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error("IndexedDB is not supported"));
      return;
    }
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function storeMediaFile(id, fileOrBlob) {
  try {
    const db = await openMediaDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      store.put({ id, blob: fileOrBlob, updated_at: Date.now() });
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    });
  } catch (e) {
    console.error("IndexedDB store error:", e);
    return false;
  }
}

async function getMediaFile(id) {
  try {
    const db = await openMediaDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(id);
      req.onsuccess = () => resolve(req.result ? req.result.blob : null);
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    console.error("IndexedDB get error:", e);
    return null;
  }
}

async function deleteMediaFile(id) {
  try {
    const db = await openMediaDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      store.delete(id);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    });
  } catch (e) {
    console.error("IndexedDB delete error:", e);
    return false;
  }
}

async function getMediaItemUrl(item) {
  if (!item) return "";
  if (blobUrlCache.has(item.id)) return blobUrlCache.get(item.id);
  if (item.is_indexed_db) {
    const blob = await getMediaFile(item.id);
    if (blob) {
      const url = URL.createObjectURL(blob);
      blobUrlCache.set(item.id, url);
      return url;
    }
  }
  return item.file_url || "";
}

async function preloadIndexedDBMedia() {
  try {
    const db = await openMediaDB();
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const req = store.getAll();
    req.onsuccess = () => {
      const records = req.result || [];
      records.forEach(rec => {
        if (rec.blob && !blobUrlCache.has(rec.id)) {
          const url = URL.createObjectURL(rec.blob);
          blobUrlCache.set(rec.id, url);
        }
      });
      renderPortfolio();
      if (localStorage.getItem("thanh_admin_logged_in") === "true") {
        renderCmsDashboard();
      }
    };
  } catch (e) {
    console.warn("Could not preload IndexedDB media:", e);
  }
}

function detectFileType(fileName, mimeType = "") {
  const ext = (fileName.split(".").pop() || "").toLowerCase();
  const imageExts = ["jpg", "jpeg", "png", "webp", "gif", "svg", "bmp"];
  const videoExts = ["mp4", "webm", "mov", "avi", "mkv"];
  const docExts = ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "txt", "zip", "csv"];

  if (imageExts.includes(ext) || (mimeType && mimeType.startsWith("image/"))) return "image";
  if (videoExts.includes(ext) || (mimeType && mimeType.startsWith("video/"))) return "video";
  if (docExts.includes(ext)) return "document";
  return "document";
}

function formatBytes(bytes, decimals = 1) {
  if (!bytes || bytes === 0) return "0 B";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

function getFileIconName(fileType, fileName = "") {
  const ext = (fileName.split(".").pop() || "").toLowerCase();
  if (fileType === "image") return "image";
  if (fileType === "video") return "film";
  if (ext === "pdf") return "file-text";
  if (["xls", "xlsx", "csv"].includes(ext)) return "sheet";
  if (["doc", "docx"].includes(ext)) return "file-text";
  if (ext === "zip") return "archive";
  return "file";
}

const IMAGE_EXTS = ["jpg", "jpeg", "png", "webp", "gif"];
const VIDEO_EXTS = ["mp4", "webm", "mov"];
const DOC_EXTS = ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "txt", "zip"];
const SIZE_LIMITS = {
  image: 20 * 1024 * 1024,
  video: 100 * 1024 * 1024,
  document: 30 * 1024 * 1024
};
const MEDIA_PAGE_SIZE = 12;
let mediaPage = 1;
let uploadCancelled = false;
let pendingAlbumCover = null;
let lastFilteredMediaIds = [];
let pdfPreviewMediaId = null;

function fileExtension(fileName = "") {
  const parts = String(fileName).toLowerCase().split(".");
  return parts.length > 1 ? parts.pop() : "";
}

function classifyUploadFile(file) {
  const ext = fileExtension(file.name);
  let type = null;
  if (IMAGE_EXTS.includes(ext)) type = "image";
  else if (VIDEO_EXTS.includes(ext)) type = "video";
  else if (DOC_EXTS.includes(ext)) type = "document";
  if (!type) return { ok: false, message: `Định dạng không hỗ trợ: ${file.name}` };
  if (!file.size) return { ok: false, message: `Tệp rỗng: ${file.name}` };
  if (file.size > SIZE_LIMITS[type]) {
    const limitMb = Math.round(SIZE_LIMITS[type] / (1024 * 1024));
    return { ok: false, message: `${file.name} vượt quá ${limitMb}MB.` };
  }
  const mime = (file.type || "").toLowerCase();
  if (mime && mime !== "application/octet-stream") {
    const familyOk =
      (type === "image" && mime.startsWith("image/")) ||
      (type === "video" && mime.startsWith("video/")) ||
      (type === "document" && (mime.startsWith("application/") || mime.startsWith("text/")));
    if (!familyOk) return { ok: false, message: `Nội dung tệp không khớp định dạng: ${file.name}` };
  }
  return { ok: true, type };
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[ch]));
}

function formatUploadDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return escapeHtml(value);
  return date.toLocaleDateString("vi-VN");
}

function randomSalt() {
  const bytes = new Uint8Array(16);
  if (window.crypto && crypto.getRandomValues) crypto.getRandomValues(bytes);
  else for (let i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256);
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function hashAlbumPasswordSync(password, salt) {
  const payload = `thanh-album-v1|${salt}|${password}`;
  let h = 2166136261;
  for (let round = 0; round < 4000; round++) {
    for (let i = 0; i < payload.length; i++) {
      h ^= payload.charCodeAt(i);
      h = Math.imul(h, 16777619);
      h ^= round + i;
    }
  }
  const parts = [];
  let x = h >>> 0;
  for (let i = 0; i < 8; i++) {
    x = Math.imul(x ^ payload.charCodeAt(i % payload.length) ^ (i + 1), 2246822519) >>> 0;
    parts.push(x.toString(16).padStart(8, "0"));
  }
  return parts.join("");
}

async function migrateAlbumPasswords() {
  const data = getAppData();
  let changed = false;
  (data.albums || []).forEach((album) => {
    if (album.password && !album.password_hash) {
      album.password_salt = album.password_salt || randomSalt();
      album.password_hash = hashAlbumPasswordSync(String(album.password), album.password_salt);
      album.password_version = (album.password_version || 0) + 1;
      delete album.password;
      sessionStorage.removeItem(`unlocked_album_${album.id}`);
      changed = true;
    }
  });
  if (changed) saveAppData(data);
}

function isAlbumSessionValid(album) {
  if (!album || album.visibility !== "PASSWORD_PROTECTED" || !album.password_hash) return false;
  try {
    const raw = sessionStorage.getItem(`unlocked_album_${album.id}`);
    if (!raw || raw === "true") return false;
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.hash !== album.password_hash) return false;
    if (!parsed.expires || parsed.expires < Date.now()) {
      sessionStorage.removeItem(`unlocked_album_${album.id}`);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

function grantAlbumSession(album) {
  sessionStorage.setItem(`unlocked_album_${album.id}`, JSON.stringify({
    hash: album.password_hash,
    expires: Date.now() + 2 * 60 * 60 * 1000
  }));
}

function revokeAlbumSession(albumId) {
  sessionStorage.removeItem(`unlocked_album_${albumId}`);
}

function resolveMediaUrl(item) {
  if (!item) return "";
  if (blobUrlCache.has(item.id)) return blobUrlCache.get(item.id);
  if (item.file_url && !String(item.file_url).startsWith("blob:")) return item.file_url;
  return "";
}

function resolveCoverUrl(album) {
  const data = getAppData();
  const mediaList = (album.media_ids || []).map((id) => data.media.find((m) => m.id === id)).filter(Boolean);
  if (album.cover_media_id) {
    if (blobUrlCache.has(album.cover_media_id)) return blobUrlCache.get(album.cover_media_id);
    const linked = data.media.find((m) => m.id === album.cover_media_id);
    const linkedUrl = resolveMediaUrl(linked);
    if (linkedUrl) return linkedUrl;
  }
  if (album.cover_blob_id && blobUrlCache.has(album.cover_blob_id)) return blobUrlCache.get(album.cover_blob_id);
  if (album.cover_image_url && !String(album.cover_image_url).startsWith("blob:")) return album.cover_image_url;
  if (mediaList[0]) {
    const firstUrl = resolveMediaUrl(mediaList[0]);
    if (firstUrl) return firstUrl;
  }
  return "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800";
}

function visitorMayAccessMedia(mediaId) {
  if (localStorage.getItem("thanh_admin_logged_in") === "true") return true;
  const data = getAppData();
  const item = data.media.find((m) => m.id === mediaId);
  if (!item) return false;
  if (!item.is_private) return true;
  const albums = data.albums.filter((a) => (a.media_ids || []).includes(mediaId));
  if (albums.some((a) => a.visibility === "PUBLIC")) return true;
  if (albums.some((a) => a.visibility === "PASSWORD_PROTECTED" && isAlbumSessionValid(a))) return true;
  return false;
}

function permissionLabel(visibility) {
  if (visibility === "PASSWORD_PROTECTED") return "CẦN MẬT KHẨU";
  if (visibility === "ADMIN_ONLY") return "CHỈ QUẢN TRỊ VIÊN";
  return "CÔNG KHAI";
}

const SKILL_CATEGORIES = [
  { id: "technical", label: "Kỹ thuật & CAD", hint: "Bản vẽ, AutoCAD, đo đạc, kết cấu" },
  { id: "tools", label: "Công cụ & tự động hóa", hint: "Script, tiện ích, quy trình làm việc" },
  { id: "software", label: "Phần mềm", hint: "Ứng dụng, lập trình, hệ thống" },
  { id: "languages", label: "Ngôn ngữ", hint: "Tiếng Anh, chứng chỉ, giao tiếp" },
  { id: "design", label: "Thiết kế", hint: "Đồ họa, trình bày, hình ảnh" },
  { id: "data", label: "Dữ liệu & báo cáo", hint: "Bảng tính, thống kê, đối chiếu" },
  { id: "soft_skills", label: "Kỹ năng mềm", hint: "Tư duy, tự học, làm việc độc lập" },
  { id: "management", label: "Quản lý công việc", hint: "Tổ chức, tiến độ, phối hợp" }
];
const SKILL_ICONS = [
  ["wrench", "Kỹ thuật"], ["pen-tool", "Bản vẽ"], ["ruler", "Đo đạc"], ["layers", "Layer"],
  ["box", "Mô hình"], ["cpu", "Công cụ"], ["terminal", "Script"], ["code", "Lập trình"],
  ["monitor", "Phần mềm"], ["database", "Dữ liệu"], ["file-spreadsheet", "Bảng tính"], ["languages", "Ngôn ngữ"],
  ["award", "Chứng chỉ"], ["book-open", "Học tập"], ["brain", "Tư duy"], ["lightbulb", "Ý tưởng"],
  ["users", "Nhóm"], ["target", "Mục tiêu"], ["zap", "Hiệu suất"], ["settings", "Quy trình"],
  ["puzzle", "Xử lý"], ["shield", "Chính xác"], ["palette", "Thiết kế"], ["camera", "Hình ảnh"],
  ["globe", "Quốc tế"], ["graduation-cap", "Đào tạo"], ["compass", "Định hướng"], ["hammer", "Thực hành"],
  ["workflow", "Luồng việc"], ["sparkles", "Cải tiến"]
];
let skillFormCategory = "technical";
let skillFormIcon = "wrench";

function skillCategoryLabel(id) {
  return (SKILL_CATEGORIES.find((item) => item.id === id) || SKILL_CATEGORIES[0]).label;
}
function skillLevelLabel(level) {
  if (level === "basic") return "Làm quen";
  if (level === "advanced") return "Chuyên sâu";
  return "Thành thạo";
}
function renderSkillFormChoices() {
  const categoryList = document.getElementById("skillCategoryList");
  const iconPicker = document.getElementById("skillIconPicker");
  const hint = document.getElementById("skillCategoryHint");
  if (!categoryList || !iconPicker) return;
  categoryList.innerHTML = SKILL_CATEGORIES.map((item) => `
    <button type="button" class="skill-category-option ${item.id === skillFormCategory ? "active" : ""}" data-category="${item.id}">
      <strong>${item.label}</strong>
      <span>${item.hint}</span>
    </button>
  `).join("");
  iconPicker.innerHTML = SKILL_ICONS.map(([name, label]) => `
    <button type="button" class="skill-icon-option ${name === skillFormIcon ? "active" : ""}" data-icon="${name}">
      <i data-lucide="${name}"></i>
      <span>${label}</span>
    </button>
  `).join("");
  categoryList.querySelectorAll("[data-category]").forEach((button) => {
    button.addEventListener("click", () => {
      skillFormCategory = button.getAttribute("data-category");
      const chosen = SKILL_CATEGORIES.find((item) => item.id === skillFormCategory);
      if (hint && chosen) hint.textContent = chosen.hint;
      renderSkillFormChoices();
    });
  });
  iconPicker.querySelectorAll("[data-icon]").forEach((button) => {
    button.addEventListener("click", () => {
      skillFormIcon = button.getAttribute("data-icon");
      renderSkillFormChoices();
    });
  });
  if (window.lucide) lucide.createIcons({ root: iconPicker });
}
function openSkillForm(skillId) {
  const modal = document.getElementById("skillFormModal");
  const heading = document.getElementById("skillFormHeading");
  document.getElementById("skillForm").reset();
  document.getElementById("skillFormId").value = skillId || "";
  if (skillId) {
    const skill = getAppData().skills.find((item) => item.id === skillId);
    if (!skill) return;
    document.getElementById("skillFormName").value = skill.name || "";
    document.getElementById("skillFormDescription").value = skill.description || "";
    document.getElementById("skillFormBadge").value = skill.badge || "";
    document.getElementById("skillFormLevel").value = skill.level || "proficient";
    skillFormCategory = skill.category || "technical";
    skillFormIcon = skill.icon || "wrench";
    if (heading) heading.textContent = "Sửa kỹ năng";
  } else {
    skillFormCategory = "technical";
    skillFormIcon = "wrench";
    document.getElementById("skillFormLevel").value = "proficient";
    if (heading) heading.textContent = "Thêm kỹ năng";
  }
  renderSkillFormChoices();
  modal.classList.remove("hidden");
  if (window.lucide) lucide.createIcons({ root: modal });
  document.getElementById("skillFormName").focus();
}
function saveSkillForm(event) {
  event.preventDefault();
  const name = document.getElementById("skillFormName").value.trim();
  if (!name) {
    showToast("Vui lòng nhập tên kỹ năng.", "error");
    return;
  }
  if (!SKILL_CATEGORIES.some((item) => item.id === skillFormCategory)) {
    showToast("Vui lòng chọn phân loại.", "error");
    return;
  }
  const data = getAppData();
  const id = document.getElementById("skillFormId").value;
  const payload = {
    name,
    category: skillFormCategory,
    icon: skillFormIcon,
    level: document.getElementById("skillFormLevel").value || "proficient",
    badge: document.getElementById("skillFormBadge").value.trim(),
    description: document.getElementById("skillFormDescription").value.trim()
  };
  if (id) {
    const skill = data.skills.find((item) => item.id === id);
    if (!skill) return;
    Object.assign(skill, payload);
    logActivity(`Cập nhật kỹ năng: ${skill.name}`, "Skills");
    showToast("Đã cập nhật kỹ năng.", "success");
  } else {
    data.skills.push({ id: "skill-" + Date.now(), ...payload });
    logActivity(`Thêm kỹ năng: ${name}`, "Skills");
    showToast("Đã thêm kỹ năng!", "success");
  }
  saveAppData(data);
  document.getElementById("skillFormModal").classList.add("hidden");
  renderCmsDashboard();
  renderPortfolio();
}

// Custom confirmation dialog (Replaces native confirm)
function showCustomConfirm(title, message, onConfirm) {
  const modal = document.getElementById("customConfirmModal");
  if (!modal) {
    if (confirm(message)) onConfirm();
    return;
  }
  document.getElementById("confirmModalTitle").textContent = title || "Xác nhận";
  document.getElementById("confirmModalMessage").textContent = message || "Bạn có chắc chắn muốn thực hiện thao tác này?";
  modal.classList.remove("hidden");

  const okBtn = document.getElementById("confirmOkBtn");
  const cancelBtn = document.getElementById("confirmCancelBtn");

  const cleanup = () => {
    modal.classList.add("hidden");
    okBtn.onclick = null;
    cancelBtn.onclick = null;
  };

  cancelBtn.onclick = cleanup;
  okBtn.onclick = () => {
    cleanup();
    if (typeof onConfirm === "function") onConfirm();
  };
}

// ==========================================================================
// 3. TOAST NOTIFICATIONS HELPER
// ==========================================================================
function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const item = document.createElement("div");
  item.className = `toast-item ${type}`;
  
  let iconName = "info";
  if (type === "success") iconName = "check-circle";
  if (type === "error") iconName = "alert-circle";

  item.innerHTML = `
    <i data-lucide="${iconName}"></i>
    <span>${message}</span>
  `;

  container.appendChild(item);
  lucide.createIcons({ root: item });

  setTimeout(() => {
    item.style.opacity = "0";
    item.style.transform = "translateX(40px)";
    item.style.transition = "all 0.3s ease";
    setTimeout(() => item.remove(), 300);
  }, 3500);
}

// ==========================================================================
// 4. RATE LIMITING FOR ALBUM PASSWORDS
// ==========================================================================
const rateLimitMap = {};

function checkRateLimit(albumId) {
  const now = Date.now();
  const record = rateLimitMap[albumId];
  if (record && record.lockedUntil > now) {
    const remaining = Math.ceil((record.lockedUntil - now) / 1000);
    return { allowed: false, remaining };
  }
  return { allowed: true };
}

function recordFailedAttempt(albumId) {
  const now = Date.now();
  const record = rateLimitMap[albumId] || { count: 0, lockedUntil: 0 };
  record.count += 1;
  if (record.count >= 5) {
    record.lockedUntil = now + 60 * 1000; // Lock 60 seconds
    record.count = 0;
    rateLimitMap[albumId] = record;
    return { locked: true, remaining: 60 };
  }
  rateLimitMap[albumId] = record;
  return { locked: false };
}

function resetRateLimit(albumId) {
  delete rateLimitMap[albumId];
}

// ==========================================================================
// 5. RENDER PUBLIC PORTFOLIO
// ==========================================================================
function renderPortfolio() {
  const data = getAppData();
  const p = data.profile;

  // 1. Hero & About elements
  document.getElementById("heroName").textContent = p.full_name;
  document.getElementById("heroHeadline").textContent = `"${p.headline}"`;
  document.getElementById("heroBio").textContent = p.bio;
  document.getElementById("heroLocation").textContent = p.location;
  document.getElementById("aboutName").textContent = p.full_name;
  document.getElementById("aboutLoc").textContent = p.location;
  document.getElementById("contactOwnerName").textContent = p.full_name;
  document.getElementById("contactLocationText").textContent = p.location;
  document.getElementById("contactPhoneText").textContent = p.phone;
  document.getElementById("contactPhoneText").href = `tel:${p.phone}`;

  if (p.portrait_url) {
    document.getElementById("heroPortraitImg").src = p.portrait_url;
  }

  // Format DOB (YYYY-MM-DD -> DD/MM/YYYY)
  if (p.birthday) {
    const parts = p.birthday.split("-");
    const formatted = parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : p.birthday;
    document.getElementById("heroPortraitDob").textContent = `DOB: ${formatted}`;
    document.getElementById("aboutDob").textContent = formatted;
  }

  // Email
  const emailEl = document.getElementById("contactEmailText");
  if (p.email && p.email.trim()) {
    emailEl.textContent = p.email;
    emailEl.href = `mailto:${p.email}`;
  } else {
    emailEl.textContent = "Cập nhật qua CMS Admin";
    emailEl.removeAttribute("href");
  }

  // 2. Education Timeline
  const eduContainer = document.getElementById("educationTimeline");
  eduContainer.innerHTML = data.education.map(item => `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="glass-card timeline-card">
        <div class="cad-corner tr"></div>
        <div class="timeline-top-row">
          <div class="edu-head-left">
            <div class="edu-icon-box">
              <i data-lucide="${item.level.toLowerCase().includes("univ") ? "graduation-cap" : "school"}"></i>
            </div>
            <div>
              <span class="edu-level-tag font-mono">${item.level}</span>
              <h3 class="edu-institution">${item.institution}</h3>
            </div>
          </div>
          <span class="status-pill font-mono"><i data-lucide="check-circle"></i> ${item.status}</span>
        </div>
        <p class="edu-desc">${item.description}</p>
        <div class="edu-meta-tags font-mono">
          <span>STATUS: ${item.status.toUpperCase()}</span>
          <span>VERIFIED INSTITUTION</span>
        </div>
      </div>
    </div>
  `).join("");

  // 3. Skills: AutoCAD Screenshots & Other Skills
  const autocadSkill = data.skills.find(s => s.name.toLowerCase().includes("autocad")) || data.skills[0];
  if (autocadSkill) {
    document.getElementById("autocadDesc").textContent = autocadSkill.description;
    const screensContainer = document.getElementById("autocadScreenshotsRow");
    if (autocadSkill.screenshots && autocadSkill.screenshots.length > 0) {
      screensContainer.innerHTML = autocadSkill.screenshots.map(url => `
        <div class="cad-screenshot-item" onclick="openLightbox('${url}', 'Ảnh minh họa bản vẽ kỹ thuật AutoCAD')">
          <img src="${url}" alt="AutoCAD Screenshot" />
          <div class="hover-overlay-zoom"><i data-lucide="eye"></i> Phóng to bản vẽ</div>
        </div>
      `).join("");
    } else {
      screensContainer.innerHTML = "";
    }
  }

  // 2-Col Skills
  const toolsSkill = data.skills.find(s => s.name.toLowerCase().includes("tool")) || data.skills[1];
  const englishSkill = data.skills.find(s => s.name.toLowerCase().includes("toeic")) || data.skills[2];
  const otherGrid = document.getElementById("otherSkillsGrid");
  otherGrid.innerHTML = `
    <div class="glass-card" style="padding: 24px; display: flex; flex-direction: column; justify-content: space-between; gap: 14px;">
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <div style="width: 40px; height: 40px; border-radius: 10px; background: var(--light-blue); display: flex; align-items: center; justify-content: center;">
            <i data-lucide="${toolsSkill?.icon || "cpu"}" style="color: var(--accent-blue)"></i>
          </div>
          <span class="tech-badge blue-badge font-mono">${toolsSkill?.badge || "Practical Solution"}</span>
        </div>
        <h3 style="font-size: 18px; font-weight: 800; color: var(--text-main); margin-bottom: 6px;">${toolsSkill?.name || "Self-developed Work Tools"}</h3>
        <p style="font-size: 13px; color: var(--text-muted); line-height: 1.6;">${toolsSkill?.description || ""}</p>
      </div>
      <div style="padding-top: 12px; border-top: 1px solid var(--border-color); font-size: 11px; color: var(--deep-blue); font-weight: 600;">
        • Tự động hóa tác vụ lặp lại & hạn chế sai sót<br/>• Tối ưu thời gian xử lý dữ liệu kỹ thuật
      </div>
    </div>

    <div class="glass-card" style="padding: 24px; display: flex; flex-direction: column; justify-content: space-between; gap: 14px;">
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <div style="width: 40px; height: 40px; border-radius: 10px; background: #ECFDF5; color: #059669; display: flex; align-items: center; justify-content: center;">
            <i data-lucide="${englishSkill?.icon || "award"}"></i>
          </div>
          <span class="tech-badge green-badge font-mono">SCORE: 600</span>
        </div>
        <h3 style="font-size: 18px; font-weight: 800; color: var(--text-main); margin-bottom: 6px;">Tiếng Anh — ${englishSkill?.name || "TOEIC 600"}</h3>
        <p style="font-size: 13px; color: var(--text-muted); line-height: 1.6;">${englishSkill?.description || ""}</p>
      </div>
      <div style="padding-top: 12px; border-top: 1px solid var(--border-color); font-size: 11px; color: var(--text-muted); display: flex; justify-content: space-between;">
        <span>ETS VERIFIED</span><span class="font-mono" style="color: var(--accent-blue); font-weight: 700;">TOEIC 600</span>
      </div>
    </div>
  `;

  // Soft Skills
  const softSkills = data.skills.filter(s => s.category === "soft_skills");
  document.getElementById("softSkillsGrid").innerHTML = softSkills.map(s => `
    <div class="soft-skill-box">
      <h4><i data-lucide="${s.icon || "sparkles"}" class="skill-inline-icon"></i>${escapeHtml(s.name)}</h4>
      <p>${escapeHtml(s.description || "")}</p>
    </div>
  `).join("");

  const shownIds = new Set([autocadSkill?.id, toolsSkill?.id, englishSkill?.id, ...softSkills.map(s => s.id)].filter(Boolean));
  const extraSkills = data.skills.filter(s => !shownIds.has(s.id));
  const extraGrid = document.getElementById("extraSkillsGrid");
  if (extraGrid) {
    extraGrid.innerHTML = extraSkills.map(s => `
      <div class="glass-card extra-skill-card">
        <div class="extra-skill-top">
          <div class="extra-skill-icon"><i data-lucide="${s.icon || "wrench"}"></i></div>
          <span class="tech-badge blue-badge font-mono">${escapeHtml(skillLevelLabel(s.level))}</span>
        </div>
        <h3 style="font-size: 16px; font-weight: 800; color: var(--text-main);">${escapeHtml(s.name)}</h3>
        <p style="font-size: 12px; color: var(--text-muted); line-height: 1.55;">${escapeHtml(s.description || "Chưa có mô tả.")}</p>
        <div style="display:flex; justify-content:space-between; gap:8px; font-size:11px; color:var(--deep-blue); font-weight:700;">
          <span>${escapeHtml(skillCategoryLabel(s.category))}</span>
          <span class="font-mono">${escapeHtml(s.badge || "")}</span>
        </div>
      </div>
    `).join("");
  }

  // 4. Tools Showcase
  const publishedTools = data.tools.filter(t => t.is_published);
  document.getElementById("toolsCountBadge").textContent = `TOTAL: ${publishedTools.length} TOOLS`;
  document.getElementById("toolsCardsGrid").innerHTML = publishedTools.map(tool => `
    <div class="glass-card tool-card">
      <div>
        <div class="tool-thumb-box">
          <img src="${tool.thumbnail_url || 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=800'}" alt="${tool.name}" />
          <span class="tool-category-badge font-mono">${tool.category}</span>
        </div>
        <div class="tool-body">
          <h3 class="tool-title">${tool.name}</h3>
          <p class="tool-desc">${tool.description}</p>
          ${tool.problem_solved ? `
            <div class="tool-problem-callout">
              <strong>Bài toán giải quyết:</strong>
              <p>${tool.problem_solved}</p>
            </div>
          ` : ""}
          <div class="tech-pills-row font-mono">
            ${(tool.technologies || []).map(t => `<span class="tech-pill">${t}</span>`).join("")}
          </div>
        </div>
      </div>
      <div class="tool-footer">
        <button class="btn-view-details" onclick="openToolDetailModal('${tool.id}')">
          <i data-lucide="eye"></i> Xem tính năng chi tiết
        </button>
        <span class="font-mono text-muted" style="font-size: 11px;">${tool.dev_date || 'INDEPENDENT'}</span>
      </div>
    </div>
  `).join("");

  // 5. Certificates
  document.getElementById("certificatesGrid").innerHTML = data.certificates.map(cert => `
    <div class="glass-card cert-card">
      <div class="cad-corner tr"></div>
      <div>
        <div class="cert-head">
          <div class="cert-icon-circle"><i data-lucide="award"></i></div>
          <div class="score-badge">
            <span class="score-tag font-mono">ĐIỂM ĐẠT ĐƯỢC</span>
            <span class="score-number font-mono">${cert.score || "600"}</span>
          </div>
        </div>
        <div style="margin-top: 14px;">
          <span class="cert-org font-mono"><i data-lucide="shield-check"></i> ${cert.issuing_org || 'ETS'}</span>
          <h3 class="cert-title">${cert.title}</h3>
        </div>
        <p class="cert-desc" style="margin-top: 8px;">${cert.description}</p>
        ${cert.image_url ? `
          <div class="cert-img-preview" style="margin-top: 14px;" onclick="openLightbox('${cert.image_url}', '${cert.title}')">
            <img src="${cert.image_url}" alt="${cert.title}" />
            <div class="hover-overlay-zoom"><i data-lucide="eye"></i> Xem ảnh chứng chỉ</div>
          </div>
        ` : ""}
      </div>
      <div class="cert-footer-meta font-mono">
        <span>TRẠNG THÁI: XÁC THỰC</span>
        <span style="color: var(--deep-blue); font-weight: 700;">TOEIC 600</span>
      </div>
    </div>
  `).join("");

  // 6. Interests
  document.getElementById("interestsGrid").innerHTML = data.interests.map(intr => `
    <div class="glass-card interest-card">
      <div>
        <div class="interest-img-box">
          <img src="${intr.image_url}" alt="${intr.title}" />
          <div class="interest-icon-badge">
            <i data-lucide="${intr.category === 'sports' ? 'activity' : intr.category === 'music' ? 'music' : 'compass'}"></i>
          </div>
        </div>
        <div class="interest-body">
          <span class="interest-cat font-mono">${intr.category}</span>
          <h3 class="interest-title">${intr.title}</h3>
          <p class="interest-desc">${intr.description}</p>
        </div>
      </div>
      <div class="interest-tags font-mono">
        ${(intr.tags || []).map(t => `<span class="interest-tag-pill">#${t}</span>`).join("")}
      </div>
    </div>
  `).join("");

  // 7. Posts / Journal
  renderJournalPosts(data.posts.filter(p => p.status === "published"));

  // 8. Gallery
  renderGallery(data.media.filter(m => !m.is_private));

  // 9. Albums / Memories
  renderAlbums(data.albums);

  // Re-create icons for all injected elements
  lucide.createIcons();
}

// ==========================================================================
// 6. JOURNAL SEARCH & TAG FILTER
// ==========================================================================
let currentJournalSearch = "";
let currentJournalTag = "";

function renderJournalPosts(postsList) {
  const container = document.getElementById("postsGrid");
  const filtered = postsList.filter(p => {
    const matchSearch = currentJournalSearch === "" || 
      p.title.toLowerCase().includes(currentJournalSearch.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(currentJournalSearch.toLowerCase());
    const matchTag = currentJournalTag === "" || (p.tags && p.tags.includes(currentJournalTag));
    return matchSearch && matchTag;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted); font-size: 13px;">Không tìm thấy bài viết nào phù hợp.</div>`;
    return;
  }

  container.innerHTML = filtered.map(post => `
    <div class="glass-card post-card" onclick="openArticleReaderModal('${post.id}')">
      <div>
        ${post.cover_image_url ? `
          <div class="post-thumb">
            <img src="${post.cover_image_url}" alt="${post.title}" />
            <span class="post-cat-badge font-mono">${post.category_name || 'Kỹ thuật'}</span>
          </div>
        ` : ""}
        <div class="post-body">
          <div class="post-meta-row font-mono">
            <span><i data-lucide="calendar" style="width: 12px; height: 12px; display: inline;"></i> ${post.published_at}</span>
            <span>•</span>
            <span><i data-lucide="eye" style="width: 12px; height: 12px; display: inline;"></i> ${post.views_count} lượt đọc</span>
          </div>
          <h3 class="post-title">${post.title}</h3>
          <p class="post-excerpt">${post.excerpt}</p>
        </div>
      </div>
      <div class="post-footer">
        <span>Đọc bài viết đầy đủ →</span>
        <span class="font-mono text-muted" style="font-size: 11px;">Cao Đức Tiến Thành</span>
      </div>
    </div>
  `).join("");

  // Collect unique tags for filter row
  const tagsRow = document.getElementById("journalTagsRow");
  const uniqueTags = Array.from(new Set(postsList.flatMap(p => p.tags || [])));
  tagsRow.innerHTML = `
    <span class="font-mono text-muted" style="font-size: 11px;">Tags:</span>
    <button class="btn-tag-filter ${currentJournalTag === '' ? 'active' : ''}" onclick="filterJournalByTag('')">Tất cả</button>
    ${uniqueTags.map(tag => `
      <button class="btn-tag-filter ${currentJournalTag === tag ? 'active' : ''}" onclick="filterJournalByTag('${tag}')">#${tag}</button>
    `).join("")}
  `;

  lucide.createIcons({ root: container });
  lucide.createIcons({ root: tagsRow });
}

function filterJournalByTag(tag) {
  currentJournalTag = tag;
  const data = getAppData();
  renderJournalPosts(data.posts.filter(p => p.status === "published"));
}

// ==========================================================================
// 7. GALLERY & MASONRY
// ==========================================================================
let currentGalleryCategory = "All";

function renderGallery(mediaList) {
  const categoriesRow = document.getElementById("galleryCategoriesRow");
  const uniqueCats = ["All", ...Array.from(new Set(mediaList.map(m => m.category || "General")))];

  categoriesRow.innerHTML = uniqueCats.map(cat => `
    <button class="btn-cat-filter ${currentGalleryCategory === cat ? 'active' : ''}" onclick="filterGalleryCategory('${cat}')">${cat}</button>
  `).join("");

  const filtered = (currentGalleryCategory === "All" ? mediaList : mediaList.filter(m => m.category === currentGalleryCategory))
    .filter((item) => {
      const type = item.file_type || detectFileType(item.file_name || "", item.mime_type);
      return type === "image" || type === "video";
    });
  document.getElementById("galleryCountBadge").textContent = `TOTAL: ${filtered.length} ITEMS`;

  const masonryGrid = document.getElementById("galleryMasonryGrid");
  masonryGrid.innerHTML = filtered.map(item => {
    const type = item.file_type || detectFileType(item.file_name || "", item.mime_type);
    const url = resolveMediaUrl(item);
    const caption = escapeHtml(item.caption || item.file_name);
    const visual = type === "video"
      ? `<div class="video-thumb-placeholder"><i data-lucide="play-circle"></i><span class="video-pill font-mono">VIDEO</span></div>`
      : `<img src="${escapeHtml(url)}" alt="${caption}" />`;
    return `
    <div class="gallery-card" onclick="openPublicPreview('${item.id}')">
      <div class="gallery-img-wrapper">
        ${visual}
        <div class="gallery-overlay">
          <i data-lucide="eye"></i>
          <span>${caption}</span>
        </div>
      </div>
      <div class="gallery-caption-bar">
        <p>${caption}</p>
        <span class="font-mono">${escapeHtml(item.category || "General")}</span>
      </div>
    </div>`;
  }).join("");

  lucide.createIcons({ root: masonryGrid });
}

function filterGalleryCategory(cat) {
  currentGalleryCategory = cat;
  const data = getAppData();
  renderGallery(data.media.filter(m => !m.is_private));
}

// ==========================================================================
// 8. ALBUMS & MEMORIES (WITH PASSWORD SECURITY)
// ==========================================================================
function renderAlbums(albumsList) {
  const isAdmin = localStorage.getItem("thanh_admin_logged_in") === "true";
  const visibleAlbums = albumsList.filter(a => isAdmin || a.visibility !== "ADMIN_ONLY");
  document.getElementById("albumsCountBadge").textContent = `${visibleAlbums.length} ALBUMS`;

  const grid = document.getElementById("albumsGrid");
  grid.innerHTML = visibleAlbums.map(album => {
    const isProtected = album.visibility === "PASSWORD_PROTECTED";
    const isUnlocked = isProtected && isAlbumSessionValid(album);

    let visClass = "vis-public";
    let visText = "CÔNG KHAI";
    let visIcon = "globe";

    if (isProtected) {
      visClass = "vis-protected";
      visText = "CẦN MẬT KHẨU";
      visIcon = "lock";
    } else if (album.visibility === "ADMIN_ONLY") {
      visClass = "vis-admin";
      visText = "CHỈ QUẢN TRỊ";
      visIcon = "shield";
    }

    return `
      <div class="glass-card album-card" onclick="handleAlbumClick('${album.id}')">
        <div>
          <div class="album-cover-box">
            <img src="${escapeHtml(resolveCoverUrl(album))}" alt="${escapeHtml(album.title)}" />
            <span class="album-vis-badge ${visClass} font-mono">
              <i data-lucide="${visIcon}" style="width: 12px; height: 12px;"></i> ${visText}
            </span>
            ${isProtected && !isUnlocked && !isAdmin ? `
              <div class="album-lock-overlay">
                <div class="lock-pill"><i data-lucide="lock"></i> Yêu cầu mật khẩu</div>
              </div>
            ` : ""}
          </div>
          <div class="album-body">
            <h3 class="album-title">${album.title}</h3>
            <p class="album-desc">${album.description}</p>
          </div>
        </div>
        <div class="album-footer font-mono">
          <span><i data-lucide="images" style="width: 13px; height: 13px; display: inline;"></i> ${(album.media_ids || []).length} tệp</span>
          <span style="font-size: 11px;">${isUnlocked ? "ĐÃ MỞ KHÓA" : "XEM ALBUM →"}</span>
        </div>
      </div>
    `;
  }).join("");

  lucide.createIcons({ root: grid });
}

function handleAlbumClick(albumId) {
  const data = getAppData();
  const album = data.albums.find(a => a.id === albumId);
  if (!album) return;

  const isAdmin = localStorage.getItem("thanh_admin_logged_in") === "true";

  // If Admin Only and not admin
  if (album.visibility === "ADMIN_ONLY" && !isAdmin) {
    showToast("Album này chỉ dành cho Quản trị viên.", "error");
    return;
  }

  // If Password Protected and not unlocked yet
  if (album.visibility === "PASSWORD_PROTECTED" && !isAdmin) {
    if (!isAlbumSessionValid(album)) {
      promptUnlockAlbumModal(album);
      return;
    }
  }

  // Open album contents
  openAlbumViewer(album);
}

function promptUnlockAlbumModal(album) {
  document.getElementById("unlockModalTitle").textContent = album.title;
  document.getElementById("albumPasswordInput").value = "";
  document.getElementById("unlockErrorAlert").classList.add("hidden");
  document.getElementById("unlockAlbumModal").classList.remove("hidden");

  const form = document.getElementById("unlockAlbumForm");
  form.onsubmit = function(e) {
    e.preventDefault();
    const rateCheck = checkRateLimit(album.id);
    if (!rateCheck.allowed) {
      const errBox = document.getElementById("unlockErrorAlert");
      errBox.textContent = `Quá nhiều lần thử sai. Bị khóa trong ${rateCheck.remaining} giây.`;
      errBox.classList.remove("hidden");
      return;
    }

    const passInput = document.getElementById("albumPasswordInput").value;
    const fresh = getAppData().albums.find((a) => a.id === album.id) || album;
    const valid = Boolean(fresh.password_hash) && hashAlbumPasswordSync(passInput, fresh.password_salt) === fresh.password_hash;
    if (valid) {
      resetRateLimit(album.id);
      grantAlbumSession(fresh);
      document.getElementById("unlockAlbumModal").classList.add("hidden");
      showToast("Mở khóa album thành công!", "success");
      renderPortfolio();
      openAlbumViewer(fresh);
    } else {
      const fail = recordFailedAttempt(album.id);
      const errBox = document.getElementById("unlockErrorAlert");
      errBox.textContent = fail.locked
        ? `Thử sai 5 lần. Bị tạm khóa trong ${fail.remaining} giây.`
        : "Mật khẩu không chính xác. Vui lòng thử lại.";
      errBox.classList.remove("hidden");
    }
  };
}

function openVideoPreviewById(mediaId) {
  const data = getAppData();
  const item = data.media.find(m => m.id === mediaId);
  if (item) openVideoPreview(item);
}

function openVideoPreview(item) {
  const modal = document.getElementById("videoPreviewModal");
  const player = document.getElementById("videoPreviewPlayer");
  const title = document.getElementById("videoModalTitle");
  if (!modal || !player) return;

  title.textContent = item.caption || item.file_name;
  const url = resolveMediaUrl(item);
  player.src = url;
  modal.classList.remove("hidden");
  player.play().catch(e => console.log("Video autoplay:", e));
}

function closeVideoPreview() {
  const modal = document.getElementById("videoPreviewModal");
  const player = document.getElementById("videoPreviewPlayer");
  if (player) {
    player.pause();
    player.removeAttribute("src");
    player.load();
  }
  if (modal) modal.classList.add("hidden");
}

function openPublicPreview(mediaId) {
  handleMediaPreview(mediaId);
}

function downloadPublicMedia(mediaId) {
  const data = getAppData();
  const item = data.media.find((m) => m.id === mediaId);
  if (!item) return;
  downloadSingleMedia(item);
}

function openAlbumViewer(album) {
  const data = getAppData();
  const fresh = data.albums.find((a) => a.id === album.id) || album;
  const isAdmin = localStorage.getItem("thanh_admin_logged_in") === "true";
  if (fresh.visibility === "ADMIN_ONLY" && !isAdmin) {
    showToast("Album này chỉ dành cho Quản trị viên.", "error");
    return;
  }
  if (fresh.visibility === "PASSWORD_PROTECTED" && !isAdmin && !isAlbumSessionValid(fresh)) {
    promptUnlockAlbumModal(fresh);
    return;
  }
  const mediaItems = (fresh.media_ids || []).map((id) => data.media.find((m) => m.id === id)).filter(Boolean);

  const content = document.getElementById("albumViewerContent");
  content.innerHTML = `
    <div style="margin-bottom: 20px; display: flex; justify-content: space-between; gap: 12px; align-items: flex-start;">
      <div>
        <span class="tech-badge blue-badge font-mono" style="margin-bottom: 8px;">${permissionLabel(fresh.visibility)}</span>
        <h2 style="font-size: 24px; font-weight: 900; color: var(--text-main);">${escapeHtml(fresh.title)}</h2>
        <p style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">${escapeHtml(fresh.description || "")}</p>
      </div>
      ${mediaItems.length ? `<button class="btn btn-secondary btn-sm" onclick="downloadAlbumZip('${fresh.id}')"><i data-lucide="archive"></i> Tải album</button>` : ""}
    </div>
    <div class="masonry-grid" style="grid-template-columns: repeat(3, 1fr); gap: 14px;">
      ${mediaItems.length > 0 ? mediaItems.map((m) => {
        const type = m.file_type || detectFileType(m.file_name || "", m.mime_type);
        const fileUrl = resolveMediaUrl(m);
        const caption = escapeHtml(m.caption || m.file_name);
        let visual = "";
        if (type === "video") {
          visual = `<video src="${escapeHtml(fileUrl)}" muted preload="metadata" playsinline></video>`;
        } else if (type === "image") {
          visual = `<img src="${escapeHtml(fileUrl)}" alt="${caption}" />`;
        } else {
          visual = `<div class="doc-thumb-placeholder"><i data-lucide="${getFileIconName(type, m.file_name)}"></i><span class="doc-ext-pill font-mono">${escapeHtml(fileExtension(m.file_name).toUpperCase() || "FILE")}</span></div>`;
        }
        return `
        <div class="gallery-card">
          <div class="gallery-img-wrapper" style="aspect-ratio: 4/3; position: relative;" onclick="openPublicPreview('${m.id}')">
            ${visual}
          </div>
          <div class="gallery-caption-bar" style="display:flex; justify-content:space-between; gap:8px; align-items:center;">
            <p>${caption}</p>
            <button class="btn-action-icon" title="Tải xuống" onclick="event.stopPropagation(); downloadPublicMedia('${m.id}')"><i data-lucide="download"></i></button>
          </div>
        </div>`;
      }).join("") : `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); font-size: 13px; padding: 20px;">Album chưa có tệp nào.</p>`}
    </div>
  `;

  document.getElementById("albumViewerModal").classList.remove("hidden");
  lucide.createIcons({ root: content });
}

function downloadAlbumZip(albumId) {
  const data = getAppData();
  const album = data.albums.find((a) => a.id === albumId);
  if (!album) return;
  const isAdmin = localStorage.getItem("thanh_admin_logged_in") === "true";
  if (album.visibility === "ADMIN_ONLY" && !isAdmin) {
    showToast("Bạn không có quyền tải album này.", "error");
    return;
  }
  if (album.visibility === "PASSWORD_PROTECTED" && !isAdmin && !isAlbumSessionValid(album)) {
    showToast("Phiên truy cập đã hết hạn hoặc mật khẩu đã thay đổi.", "error");
    return;
  }
  const items = (album.media_ids || []).map((id) => data.media.find((m) => m.id === id)).filter(Boolean);
  downloadMediaAsZip(items, `${album.title || "album"}.zip`);
}

// ==========================================================================
// 9. MODALS (TOOL DETAILS, ARTICLE READER, LIGHTBOX)
// ==========================================================================
function openToolDetailModal(toolId) {
  const data = getAppData();
  const tool = data.tools.find(t => t.id === toolId);
  if (!tool) return;

  const content = document.getElementById("toolDetailContent");
  content.innerHTML = `
    <div style="margin-bottom: 16px;">
      <span class="tech-badge blue-badge font-mono" style="margin-bottom: 8px;">${tool.category}</span>
      <h2 style="font-size: 24px; font-weight: 900; color: var(--text-main);">${tool.name}</h2>
    </div>

    ${tool.screenshots && tool.screenshots.length > 0 ? `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 20px;">
        ${tool.screenshots.map(s => `
          <img src="${s}" alt="Tool Screenshot" style="width: 100%; height: 160px; object-fit: cover; border-radius: var(--radius-sm); border: 1px solid var(--border-color);" />
        `).join("")}
      </div>
    ` : ""}

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 20px;">
      <div style="background: var(--bg-color); padding: 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
        <strong style="font-size: 12px; color: var(--deep-blue); display: block; margin-bottom: 4px;" class="font-mono">MỤC ĐÍCH:</strong>
        <p style="font-size: 13px; color: var(--text-main); line-height: 1.5;">${tool.purpose}</p>
      </div>
      <div style="background: var(--bg-color); padding: 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
        <strong style="font-size: 12px; color: var(--deep-blue); display: block; margin-bottom: 4px;" class="font-mono">BÀI TOÁN GIẢI QUYẾT:</strong>
        <p style="font-size: 13px; color: var(--text-main); line-height: 1.5;">${tool.problem_solved}</p>
      </div>
    </div>

    ${tool.main_features && tool.main_features.length > 0 ? `
      <div style="margin-bottom: 20px;">
        <strong style="font-size: 12px; color: var(--accent-blue); display: block; margin-bottom: 8px;" class="font-mono">TÍNH NĂNG CHÍNH:</strong>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 6px;">
          ${tool.main_features.map(f => `
            <li style="font-size: 13px; color: var(--text-main); display: flex; align-items: center; gap: 8px;">
              <i data-lucide="check-circle" style="width: 14px; height: 14px; color: #059669; shrink: 0;"></i> ${f}
            </li>
          `).join("")}
        </ul>
      </div>
    ` : ""}

    <div style="padding-top: 14px; border-top: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
      <div class="tech-pills-row font-mono">
        ${(tool.technologies || []).map(t => `<span class="tech-pill">${t}</span>`).join("")}
      </div>
      <button class="btn btn-secondary btn-sm" onclick="document.getElementById('toolDetailModal').classList.add('hidden')">Đóng</button>
    </div>
  `;

  document.getElementById("toolDetailModal").classList.remove("hidden");
  lucide.createIcons({ root: content });
}

function openArticleReaderModal(postId) {
  const data = getAppData();
  const post = data.posts.find(p => p.id === postId);
  if (!post) return;

  const content = document.getElementById("articleReaderContent");
  content.innerHTML = `
    <div style="margin-bottom: 16px;">
      <span class="tech-badge blue-badge font-mono" style="margin-bottom: 8px;">${post.category_name || 'Kỹ thuật'}</span>
      <h2 style="font-size: 26px; font-weight: 900; color: var(--text-main); line-height: 1.3;">${post.title}</h2>
      <div class="post-meta-row font-mono" style="margin-top: 6px;">
        <span>Tác giả: Cao Đức Tiến Thành</span>
        <span>•</span>
        <span>Ngày đăng: ${post.published_at}</span>
      </div>
    </div>
    ${post.cover_image_url ? `
      <img src="${post.cover_image_url}" alt="${post.title}" style="width: 100%; max-height: 320px; object-fit: cover; border-radius: var(--radius-md); margin-bottom: 20px; border: 1px solid var(--border-color);" />
    ` : ""}
    <div style="font-size: 15px; color: var(--text-main); line-height: 1.8; white-space: pre-line; border-top: 1px solid var(--border-color); padding-top: 16px;">
      ${post.content}
    </div>
    <div class="interest-tags font-mono" style="margin-top: 20px; padding: 0;">
      ${(post.tags || []).map(t => `<span class="interest-tag-pill">#${t}</span>`).join("")}
    </div>
  `;

  document.getElementById("articleReaderModal").classList.remove("hidden");
  lucide.createIcons({ root: content });
}

function openLightbox(url, caption = "") {
  document.getElementById("lightboxImg").src = url;
  document.getElementById("lightboxCaption").textContent = caption;
  document.getElementById("lightboxCaption").style.display = caption ? "block" : "none";
  document.getElementById("lightboxModal").classList.remove("hidden");
}

// ==========================================================================
// 10. ADMIN CMS LOGIC & CRUD OPERATIONS
// ==========================================================================
const DEFAULT_ADMIN_EMAIL = "admin@caoductienthanh.com";
const DEFAULT_ADMIN_PASS = "admin123456";

function checkAdminAuth() {
  const isLoggedIn = localStorage.getItem("thanh_admin_logged_in") === "true";
  const loginView = document.getElementById("cmsLoginView");
  const dashView = document.getElementById("cmsDashboardView");
  const emailBadge = document.getElementById("cmsUserEmail");
  const logoutBtn = document.getElementById("cmsLogoutBtn");

  if (isLoggedIn) {
    loginView.classList.add("hidden");
    dashView.classList.remove("hidden");
    emailBadge.style.display = "inline-block";
    logoutBtn.style.display = "inline-flex";
    renderCmsDashboard();
  } else {
    loginView.classList.remove("hidden");
    dashView.classList.add("hidden");
    emailBadge.style.display = "none";
    logoutBtn.style.display = "none";
  }
}

function renderCmsDashboard() {
  const data = getAppData();

  // 1. Overview Stats
  const statsGrid = document.getElementById("cmsStatsGrid");
  statsGrid.innerHTML = `
    <div class="stat-box">
      <div class="stat-icon"><i data-lucide="file-text"></i></div>
      <div><span class="stat-num font-mono">${data.posts.length}</span><span class="stat-label">Bài viết Journal</span></div>
    </div>
    <div class="stat-box">
      <div class="stat-icon"><i data-lucide="image"></i></div>
      <div><span class="stat-num font-mono">${data.media.length}</span><span class="stat-label">Tệp Media</span></div>
    </div>
    <div class="stat-box">
      <div class="stat-icon"><i data-lucide="cpu"></i></div>
      <div><span class="stat-num font-mono">${data.tools.length}</span><span class="stat-label">Công cụ tự phát triển</span></div>
    </div>
    <div class="stat-box">
      <div class="stat-icon"><i data-lucide="award"></i></div>
      <div><span class="stat-num font-mono">${data.certificates.length}</span><span class="stat-label">Chứng chỉ (TOEIC 600)</span></div>
    </div>
    <div class="stat-box">
      <div class="stat-icon"><i data-lucide="folder-lock"></i></div>
      <div><span class="stat-num font-mono">${data.albums.length}</span><span class="stat-label">Album bảo mật</span></div>
    </div>
    <div class="stat-box">
      <div class="stat-icon"><i data-lucide="mail"></i></div>
      <div><span class="stat-num font-mono">${data.contact_messages.length}</span><span class="stat-label">Tin nhắn liên hệ</span></div>
    </div>
  `;

  // Activity logs
  document.getElementById("cmsActivityLogsList").innerHTML = (data.activity_logs || []).slice(0, 8).map(log => `
    <div class="log-row">
      <span><strong class="font-mono text-muted" style="font-size: 10px; margin-right: 6px;">[${log.entity_type}]</strong> ${log.action}</span>
      <span class="font-mono text-muted" style="font-size: 11px;">${log.created_at}</span>
    </div>
  `).join("");

  // 2. Profile Tab Fill
  const p = data.profile;
  document.getElementById("adminProfileName").value = p.full_name;
  document.getElementById("adminProfileDob").value = p.birthday;
  document.getElementById("adminProfilePhone").value = p.phone;
  document.getElementById("adminProfileLocation").value = p.location;
  document.getElementById("adminProfileHeadline").value = p.headline;
  document.getElementById("adminProfileBio").value = p.bio;
  document.getElementById("adminProfilePortrait").value = p.portrait_url;
  document.getElementById("adminProfileEmail").value = p.email || "";

  // 3. Education List in CMS
  document.getElementById("adminEducationList").innerHTML = data.education.map(e => `
    <div class="cms-item-card">
      <div class="cms-item-left">
        <i data-lucide="graduation-cap" style="color: var(--accent-blue)"></i>
        <div>
          <strong style="font-size: 14px; color: var(--text-main);">${e.institution}</strong>
          <span class="font-mono text-muted" style="display: block; font-size: 11px;">${e.level} • ${e.status}</span>
        </div>
      </div>
      <div class="cms-item-actions">
        <button class="btn-action delete" onclick="deleteEducation('${e.id}')"><i data-lucide="trash-2"></i></button>
      </div>
    </div>
  `).join("");

  // 4. Skills List in CMS
  document.getElementById("adminSkillsList").innerHTML = data.skills.map(s => `
    <div class="cms-item-card">
      <div class="cms-item-left">
        <i data-lucide="${s.icon || "wrench"}" style="color: var(--accent-blue)"></i>
        <div>
          <strong style="font-size: 14px; color: var(--text-main);">${escapeHtml(s.name)}</strong>
          <span class="font-mono text-muted" style="display: block; font-size: 11px;">${escapeHtml(skillCategoryLabel(s.category))} • ${escapeHtml(skillLevelLabel(s.level))}${s.badge ? " • " + escapeHtml(s.badge) : ""}</span>
        </div>
      </div>
      <div class="cms-item-actions">
        <button class="btn-action" onclick="openSkillForm('${s.id}')" title="Sửa kỹ năng"><i data-lucide="edit-3"></i></button>
        <button class="btn-action delete" onclick="deleteSkill('${s.id}')"><i data-lucide="trash-2"></i></button>
      </div>
    </div>
  `).join("");

  // 5. Tools List in CMS
  document.getElementById("adminToolsList").innerHTML = data.tools.map(t => `
    <div class="cms-item-card">
      <div class="cms-item-left">
        <i data-lucide="cpu" style="color: var(--accent-blue)"></i>
        <div>
          <strong style="font-size: 14px; color: var(--text-main);">${t.name}</strong>
          <span class="font-mono text-muted" style="display: block; font-size: 11px;">${t.category} • ${t.is_published ? "Hiển thị" : "Đang ẩn"}</span>
        </div>
      </div>
      <div class="cms-item-actions">
        <button class="btn-action delete" onclick="deleteTool('${t.id}')"><i data-lucide="trash-2"></i></button>
      </div>
    </div>
  `).join("");

  // 6. Certificates List in CMS
  document.getElementById("adminCertificatesList").innerHTML = data.certificates.map(c => `
    <div class="cms-item-card">
      <div class="cms-item-left">
        <i data-lucide="award" style="color: #059669"></i>
        <div>
          <strong style="font-size: 14px; color: var(--text-main);">${c.title}</strong>
          <span class="font-mono text-muted" style="display: block; font-size: 11px;">ETS • Score: ${c.score}</span>
        </div>
      </div>
      <div class="cms-item-actions">
        <button class="btn-action delete" onclick="deleteCertificate('${c.id}')"><i data-lucide="trash-2"></i></button>
      </div>
    </div>
  `).join("");

  // 7. Interests List in CMS
  document.getElementById("adminInterestsList").innerHTML = data.interests.map(i => `
    <div class="cms-item-card">
      <div class="cms-item-left">
        <i data-lucide="heart" style="color: var(--accent-blue)"></i>
        <div>
          <strong style="font-size: 14px; color: var(--text-main);">${i.title}</strong>
          <span class="font-mono text-muted" style="display: block; font-size: 11px;">Loại: ${i.category}</span>
        </div>
      </div>
      <div class="cms-item-actions">
        <button class="btn-action delete" onclick="deleteInterest('${i.id}')"><i data-lucide="trash-2"></i></button>
      </div>
    </div>
  `).join("");

  // 8. Posts List in CMS
  document.getElementById("adminPostsList").innerHTML = data.posts.map(post => `
    <div class="cms-item-card">
      <div class="cms-item-left">
        <i data-lucide="file-text" style="color: var(--accent-blue)"></i>
        <div>
          <strong style="font-size: 14px; color: var(--text-main);">${post.title}</strong>
          <span class="font-mono text-muted" style="display: block; font-size: 11px;">${post.category_name} • ${post.status} • ${post.published_at}</span>
        </div>
      </div>
      <div class="cms-item-actions">
        <button class="btn-action delete" onclick="deletePost('${post.id}')"><i data-lucide="trash-2"></i></button>
      </div>
    </div>
  `).join("");

  // 9. Upgraded Media Library
  renderUpgradedMedia();

  // 10. Upgraded Albums Management
  renderUpgradedAlbums();

  // 11. Messages List in Settings
  document.getElementById("adminMessagesList").innerHTML = data.contact_messages.map(msg => `
    <div class="msg-row">
      <div class="msg-top">
        <div>
          <strong style="font-size: 13px; color: var(--text-main);">${msg.name}</strong>
          <span class="font-mono text-muted" style="font-size: 11px;"> (${msg.email}) ${msg.phone ? `• SĐT: ${msg.phone}` : ''}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="font-mono text-muted" style="font-size: 11px;">${msg.created_at}</span>
          <button class="btn-action delete" style="width: 26px; height: 26px;" onclick="deleteContactMessage('${msg.id}')"><i data-lucide="trash-2" style="width: 12px; height: 12px;"></i></button>
        </div>
      </div>
      ${msg.subject ? `<div style="font-size: 12px; font-weight: 700; color: var(--deep-blue);">Chủ đề: ${msg.subject}</div>` : ""}
      <p style="font-size: 12px; color: var(--text-main); line-height: 1.5; background: var(--white); padding: 8px 12px; border-radius: 6px; border: 1px solid var(--border-color);">${msg.message}</p>
    </div>
  `).join("");

  lucide.createIcons();
}

// ==========================================================================
// 11. CMS MEDIA & ALBUM SYSTEM (UPGRADED)
// ==========================================================================
let currentMediaFilter = "all";
let currentMediaSearch = "";
let currentMediaSort = "newest";
const selectedMediaIds = new Set();

let activeAlbumId = null;
const selectedAlbumMediaIds = new Set();
let lastAlbumMediaIds = [];
const pickerSelectedMediaIds = new Set();

function renderUpgradedMedia() {
  const container = document.getElementById("adminMediaList");
  if (!container) return;
  const data = getAppData();
  let items = [...data.media];

  // 1. Filter by search
  if (currentMediaSearch) {
    const q = currentMediaSearch.toLowerCase();
    items = items.filter(m => (m.file_name && m.file_name.toLowerCase().includes(q)) || (m.caption && m.caption.toLowerCase().includes(q)));
  }

  // 2. Filter by type
  if (currentMediaFilter !== "all") {
    items = items.filter(m => {
      const type = m.file_type || detectFileType(m.file_name, m.mime_type);
      return type === currentMediaFilter;
    });
  }

  // 3. Sort
  if (currentMediaSort === "newest") {
    items.sort((a, b) => (b.created_at || "").localeCompare(a.created_at || ""));
  } else if (currentMediaSort === "oldest") {
    items.sort((a, b) => (a.created_at || "").localeCompare(b.created_at || ""));
  } else if (currentMediaSort === "name") {
    items.sort((a, b) => (a.file_name || "").localeCompare(b.file_name || ""));
  } else if (currentMediaSort === "size") {
    items.sort((a, b) => (b.size_bytes || 0) - (a.size_bytes || 0));
  }

  // Update bulk bar
  const bulkBar = document.getElementById("mediaBulkBar");
  const countBadge = document.getElementById("selectedMediaCountBadge");
  const selectAllCheck = document.getElementById("selectAllMediaCheck");
  if (bulkBar && countBadge) {
    if (selectedMediaIds.size > 0) {
      bulkBar.classList.remove("hidden");
      countBadge.textContent = `Đã chọn ${selectedMediaIds.size} tệp`;
      if (selectAllCheck) selectAllCheck.checked = (items.length > 0 && selectedMediaIds.size === items.length);
    } else {
      bulkBar.classList.add("hidden");
      if (selectAllCheck) selectAllCheck.checked = false;
    }
  }

  if (items.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px 20px; background: var(--white); border-radius: var(--radius-md); border: 1px dashed var(--border-color);">
        <i data-lucide="image-off" style="width: 36px; height: 36px; color: var(--text-muted); margin: 0 auto 10px auto; display: block;"></i>
        <h4 style="font-size: 14px; font-weight: 700; color: var(--text-main);">Không tìm thấy tệp media nào</h4>
        <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">Kéo thả tệp từ máy tính vào vùng tải lên phía trên để thêm tệp mới.</p>
      </div>
    `;
    lucide.createIcons({ root: container });
    const pagerEmpty = document.getElementById("mediaPagination");
    if (pagerEmpty) pagerEmpty.innerHTML = "";
    return;
  }

  lastFilteredMediaIds = items.map((m) => m.id);
  const totalPages = Math.max(1, Math.ceil(items.length / MEDIA_PAGE_SIZE));
  if (mediaPage > totalPages) mediaPage = totalPages;
  if (mediaPage < 1) mediaPage = 1;
  const pageItems = items.slice((mediaPage - 1) * MEDIA_PAGE_SIZE, mediaPage * MEDIA_PAGE_SIZE);

  container.innerHTML = pageItems.map(m => {
    const isSelected = selectedMediaIds.has(m.id);
    const type = m.file_type || detectFileType(m.file_name, m.mime_type);
    const fileUrl = resolveMediaUrl(m);
    const sizeStr = formatBytes(m.size_bytes || 0);
    const iconName = getFileIconName(type, m.file_name);
    const safeName = escapeHtml(m.file_name);

    let thumbHtml = "";
    if (type === "image") {
      thumbHtml = `<img src="${escapeHtml(fileUrl)}" alt="${safeName}" class="media-thumb-img" loading="lazy" />`;
    } else if (type === "video") {
      thumbHtml = fileUrl
        ? `<video src="${escapeHtml(fileUrl)}" muted preload="metadata" playsinline></video>`
        : `<div class="video-thumb-placeholder"><i data-lucide="play-circle"></i><span class="video-pill font-mono">VIDEO</span></div>`;
    } else {
      thumbHtml = `
        <div class="doc-thumb-placeholder">
          <i data-lucide="${iconName}"></i>
          <span class="doc-ext-pill font-mono">${escapeHtml((m.file_name.split(".").pop() || "FILE").toUpperCase())}</span>
        </div>
      `;
    }

    return `
      <div class="upgraded-media-card glass-card ${isSelected ? 'selected' : ''}" data-id="${m.id}">
        <div class="media-select-checkbox">
          <input type="checkbox" class="media-item-checkbox" data-id="${m.id}" ${isSelected ? 'checked' : ''} />
        </div>
        
        <div class="media-thumb-area" onclick="handleMediaPreview('${m.id}')">
          ${thumbHtml}
        </div>

        <div class="media-info-area">
          <div class="media-title-row">
            <span class="media-filename truncate font-mono" title="${safeName}">${safeName}</span>
          </div>
          <div class="media-meta-row font-mono">
            <span class="media-type-tag ${type}">${type === "image" ? "ẢNH" : type === "video" ? "VIDEO" : "TÀI LIỆU"}</span>
            <span>${sizeStr}</span>
            <span>${formatUploadDate(m.created_at)}</span>
          </div>
          <div class="media-actions-row">
            <button class="btn-action-icon preview" title="Xem trước" onclick="handleMediaPreview('${m.id}')">
              <i data-lucide="eye"></i>
            </button>
            <button class="btn-action-icon download" title="Tải xuống tệp gốc" onclick="handleMediaDownload('${m.id}')">
              <i data-lucide="download"></i>
            </button>
            <button class="btn-action-icon" title="Sửa chú thích" onclick="openMediaCaptionEditor('${m.id}')">
              <i data-lucide="text"></i>
            </button>
            <button class="btn-action-icon delete" title="Xóa tệp" onclick="deleteMedia('${m.id}')">
              <i data-lucide="trash-2"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  lucide.createIcons({ root: container });

  // Attach checkbox listeners
  container.querySelectorAll(".media-item-checkbox").forEach(chk => {
    chk.addEventListener("change", (e) => {
      e.stopPropagation();
      const id = chk.getAttribute("data-id");
      if (chk.checked) {
        selectedMediaIds.add(id);
      } else {
        selectedMediaIds.delete(id);
      }
      renderUpgradedMedia();
    });
  });

  const pager = document.getElementById("mediaPagination");
  if (pager) {
    if (totalPages <= 1) {
      pager.innerHTML = "";
    } else {
      pager.innerHTML = `
        <button class="page-btn" ${mediaPage === 1 ? "disabled" : ""} onclick="changeMediaPage(${mediaPage - 1})">Trước</button>
        <span class="font-mono" style="font-size:12px; color: var(--text-muted);">Trang ${mediaPage} / ${totalPages}</span>
        <button class="page-btn" ${mediaPage === totalPages ? "disabled" : ""} onclick="changeMediaPage(${mediaPage + 1})">Sau</button>
      `;
    }
  }
}

function changeMediaPage(page) {
  mediaPage = page;
  renderUpgradedMedia();
}

function handleMediaPreview(id) {
  if (!visitorMayAccessMedia(id)) {
    showToast("Bạn không có quyền xem tệp này.", "error");
    return;
  }
  const data = getAppData();
  const item = data.media.find(m => m.id === id);
  if (!item) return;
  const type = item.file_type || detectFileType(item.file_name, item.mime_type);
  const fileUrl = resolveMediaUrl(item);
  const ext = fileExtension(item.file_name);

  if (type === "image") {
    openLightbox(fileUrl, item.caption || item.file_name);
  } else if (type === "video") {
    openVideoPreview(item);
  } else if (ext === "pdf" || item.mime_type === "application/pdf") {
    openPdfPreview(item);
  } else {
    showToast("Định dạng này không xem trước được. Đang tải tệp xuống.", "info");
    downloadSingleMedia(item);
  }
}

function openPdfPreview(item) {
  const modal = document.getElementById("pdfPreviewModal");
  const frame = document.getElementById("pdfPreviewFrame");
  const title = document.getElementById("pdfPreviewTitle");
  if (!modal || !frame) {
    downloadSingleMedia(item);
    return;
  }
  pdfPreviewMediaId = item.id;
  title.textContent = item.file_name;
  frame.src = resolveMediaUrl(item);
  modal.classList.remove("hidden");
}

function closePdfPreview() {
  const modal = document.getElementById("pdfPreviewModal");
  const frame = document.getElementById("pdfPreviewFrame");
  if (frame) frame.src = "about:blank";
  if (modal) modal.classList.add("hidden");
  pdfPreviewMediaId = null;
}

function openMediaCaptionEditor(mediaId) {
  const data = getAppData();
  const item = data.media.find((m) => m.id === mediaId);
  if (!item) return;
  document.getElementById("captionMediaId").value = item.id;
  document.getElementById("captionFileName").textContent = item.file_name;
  document.getElementById("captionInput").value = item.caption || "";
  document.getElementById("mediaCaptionModal").classList.remove("hidden");
}

function handleMediaDownload(id) {
  const data = getAppData();
  const item = data.media.find(m => m.id === id);
  if (item) downloadSingleMedia(item);
}

function renderUpgradedAlbums() {
  const container = document.getElementById("adminAlbumsList");
  if (!container) return;
  const data = getAppData();

  if (data.albums.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px 20px; background: var(--white); border-radius: var(--radius-md); border: 1px dashed var(--border-color);">
        <i data-lucide="folder-plus" style="width: 36px; height: 36px; color: var(--text-muted); margin: 0 auto 10px auto; display: block;"></i>
        <h4 style="font-size: 14px; font-weight: 700; color: var(--text-main);">Chưa có album nào</h4>
        <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">Nhấn "Tạo Album mới" ở góc trên để tạo album đầu tiên.</p>
      </div>
    `;
    lucide.createIcons({ root: container });
    return;
  }

  container.innerHTML = data.albums.map(album => {
    const isProtected = album.visibility === "PASSWORD_PROTECTED";
    let visClass = "vis-public";
    let visText = "CÔNG KHAI";
    let visIcon = "globe";

    if (isProtected) {
      visClass = "vis-protected";
      visText = "CẦN MẬT KHẨU";
      visIcon = "lock";
    } else if (album.visibility === "ADMIN_ONLY") {
      visClass = "vis-admin";
      visText = "CHỈ QUẢN TRỊ";
      visIcon = "shield";
    }

    const mediaList = data.media.filter(m => (album.media_ids || []).includes(m.id));
    const photoCount = mediaList.filter(m => (m.file_type || detectFileType(m.file_name)) === "image").length;
    const videoCount = mediaList.filter(m => (m.file_type || detectFileType(m.file_name)) === "video").length;
    const totalCount = (album.media_ids || []).length;
    const coverUrl = resolveCoverUrl(album);

    return `
      <div class="upgraded-album-card glass-card">
        <div class="album-cover-header" onclick="openAlbumDetail('${album.id}')">
          <img src="${coverUrl}" alt="${album.title}" class="album-cover-img" />
          <span class="album-vis-badge ${visClass} font-mono">
            <i data-lucide="${visIcon}"></i> ${visText}
          </span>
          <div class="album-quick-metrics font-mono">
            <span><i data-lucide="image"></i> ${photoCount}</span>
            <span><i data-lucide="video"></i> ${videoCount}</span>
          </div>
        </div>

        <div class="album-card-body">
          <h3 class="album-card-title truncate" onclick="openAlbumDetail('${album.id}')" title="${album.title}">${album.title}</h3>
          <p class="album-card-desc">${album.description || "Chưa có mô tả cho album này."}</p>
          
          <div class="album-card-meta font-mono">
            <span>Tổng: <strong>${totalCount}</strong> tệp</span>
            <span>${formatUploadDate(album.updated_at || album.created_at)}</span>
          </div>
        </div>

        <div class="album-card-actions">
          <button class="btn-album-action primary" onclick="openAlbumDetail('${album.id}')" title="Mở & Quản lý album">
            <i data-lucide="folder-open"></i> Mở album
          </button>
          <button class="btn-album-action" onclick="openAlbumEditModal('${album.id}')" title="Chỉnh sửa thông tin">
            <i data-lucide="edit-3"></i> Sửa
          </button>
          <button class="btn-album-action" onclick="triggerAlbumQuickUpload('${album.id}')" title="Tải ảnh/video lên">
            <i data-lucide="upload"></i> Tải lên
          </button>
          <button class="btn-album-action" onclick="openQuickPermissionModal('${album.id}')" title="Thay đổi quyền truy cập">
            <i data-lucide="shield"></i> Quyền
          </button>
          <button class="btn-album-action delete" onclick="deleteAlbum('${album.id}')" title="Xóa album">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
      </div>
    `;
  }).join("");

  lucide.createIcons({ root: container });
}

function openAlbumDetail(albumId, keepSelection = false) {
  const data = getAppData();
  const album = data.albums.find(a => a.id === albumId);
  if (!album) return;

  activeAlbumId = albumId;
  if (!keepSelection) selectedAlbumMediaIds.clear();

  document.getElementById("albumsListView").classList.add("hidden");
  document.getElementById("albumDetailView").classList.remove("hidden");

  const mediaList = data.media.filter(m => (album.media_ids || []).includes(m.id));
  const photoCount = mediaList.filter(m => (m.file_type || detectFileType(m.file_name)) === "image").length;
  const videoCount = mediaList.filter(m => (m.file_type || detectFileType(m.file_name)) === "video").length;
  const totalCount = (album.media_ids || []).length;
  const coverUrl = resolveCoverUrl(album);

  document.getElementById("albumDetailCoverImg").src = coverUrl;
  document.getElementById("albumDetailTitle").textContent = album.title;
  document.getElementById("albumDetailDesc").textContent = album.description || "Chưa có mô tả.";
  document.getElementById("albumDetailUpdatedDate").textContent = `Cập nhật: ${formatUploadDate(album.updated_at || album.created_at)}`;
  document.getElementById("albumDetailPhotoCount").textContent = photoCount;
  document.getElementById("albumDetailVideoCount").textContent = videoCount;
  document.getElementById("albumDetailTotalCount").textContent = totalCount;

  const permBadge = document.getElementById("albumDetailPermBadge");
  if (album.visibility === "PASSWORD_PROTECTED") {
    permBadge.className = "album-vis-badge vis-protected font-mono";
    permBadge.innerHTML = `<i data-lucide="lock"></i> CẦN MẬT KHẨU`;
  } else if (album.visibility === "ADMIN_ONLY") {
    permBadge.className = "album-vis-badge vis-admin font-mono";
    permBadge.innerHTML = `<i data-lucide="shield"></i> CHỈ QUẢN TRỊ VIÊN`;
  } else {
    permBadge.className = "album-vis-badge vis-public font-mono";
    permBadge.innerHTML = `<i data-lucide="globe"></i> CÔNG KHAI`;
  }

  renderAlbumDetailMediaGrid(album);
  lucide.createIcons({ root: document.getElementById("albumDetailView") });
}

function renderAlbumDetailMediaGrid(album) {
  const container = document.getElementById("albumDetailMediaGrid");
  if (!container) return;
  const data = getAppData();
  const mediaList = (album.media_ids || []).map(id => data.media.find(m => m.id === id)).filter(Boolean);
  lastAlbumMediaIds = mediaList.map((m) => m.id);

  const batchBar = document.getElementById("albumDetailBatchBar");
  const countBadge = document.getElementById("albumSelectedCountBadge");
  const selectAllCheck = document.getElementById("selectAllAlbumMediaCheck");

  if (batchBar && countBadge) {
    if (selectedAlbumMediaIds.size > 0) {
      batchBar.classList.remove("hidden");
      countBadge.textContent = `Đã chọn ${selectedAlbumMediaIds.size} tệp`;
      if (selectAllCheck) selectAllCheck.checked = (mediaList.length > 0 && selectedAlbumMediaIds.size === mediaList.length);
    } else {
      batchBar.classList.add("hidden");
      if (selectAllCheck) selectAllCheck.checked = false;
    }
  }

  if (mediaList.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px 20px; background: var(--white); border-radius: var(--radius-md); border: 1px dashed var(--border-color);">
        <i data-lucide="image-plus" style="width: 36px; height: 36px; color: var(--text-muted); margin: 0 auto 10px auto; display: block;"></i>
        <h4 style="font-size: 14px; font-weight: 700; color: var(--text-main);">Album này chưa có tệp nào</h4>
        <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">Tải tệp trực tiếp từ máy tính hoặc chọn các ảnh/video có sẵn trong Thư viện Media.</p>
      </div>
    `;
    lucide.createIcons({ root: container });
    return;
  }

  container.innerHTML = mediaList.map((m, idx) => {
    const isSelected = selectedAlbumMediaIds.has(m.id);
    const type = m.file_type || detectFileType(m.file_name, m.mime_type);
    const fileUrl = resolveMediaUrl(m);
    const safeName = escapeHtml(m.file_name);
    const isCover = album.cover_media_id === m.id || (album.cover_blob_id && album.cover_blob_id === m.id);
    let thumb = "";
    if (type === "image") thumb = `<img src="${escapeHtml(fileUrl)}" alt="${safeName}" />`;
    else if (type === "video") thumb = fileUrl
      ? `<video src="${escapeHtml(fileUrl)}" muted preload="metadata" playsinline></video>`
      : `<div class="video-thumb-placeholder"><i data-lucide="play-circle"></i><span class="video-pill font-mono">VIDEO</span></div>`;
    else thumb = `<div class="doc-thumb-placeholder"><i data-lucide="${getFileIconName(type, m.file_name)}"></i><span class="doc-ext-pill font-mono">${escapeHtml(fileExtension(m.file_name).toUpperCase() || "FILE")}</span></div>`;

    return `
      <div class="album-media-card glass-card ${isSelected ? 'selected' : ''}" data-id="${m.id}">
        <div class="album-media-thumb" onclick="handleMediaPreview('${m.id}')">
          ${thumb}
          ${isCover ? `<span class="cover-badge font-mono"><i data-lucide="star"></i> ẢNH BÌA</span>` : ''}
          <div class="album-media-check" onclick="event.stopPropagation()">
            <input type="checkbox" class="album-item-checkbox" data-id="${m.id}" ${isSelected ? 'checked' : ''} />
          </div>
        </div>

        <div class="album-media-body">
          <span class="truncate font-mono" style="font-size: 12px; font-weight: 700; color: var(--text-main);" title="${safeName}">${safeName}</span>
          <span class="font-mono text-muted" style="font-size: 11px;">${escapeHtml(m.caption || "")} · ${formatBytes(m.size_bytes || 0)} · ${formatUploadDate(m.created_at)}</span>
        </div>

        <div class="album-media-actions-bar">
          <button class="btn-action-icon" title="Đặt làm ảnh bìa" onclick="setAlbumCover('${album.id}', '${m.id}')">
            <i data-lucide="image"></i>
          </button>
          <button class="btn-action-icon" title="Xem" onclick="handleMediaPreview('${m.id}')">
            <i data-lucide="eye"></i>
          </button>
          <button class="btn-action-icon" title="Tải xuống" onclick="handleMediaDownload('${m.id}')">
            <i data-lucide="download"></i>
          </button>
          <button class="btn-action-icon" title="Sửa chú thích" onclick="openMediaCaptionEditor('${m.id}')">
            <i data-lucide="text"></i>
          </button>
          <button class="btn-action-icon" title="Đưa lên trước" ${idx === 0 ? 'disabled' : ''} onclick="reorderAlbumMedia('${album.id}', '${m.id}', -1)">
            <i data-lucide="chevron-left"></i>
          </button>
          <button class="btn-action-icon" title="Đưa ra sau" ${idx === mediaList.length - 1 ? 'disabled' : ''} onclick="reorderAlbumMedia('${album.id}', '${m.id}', 1)">
            <i data-lucide="chevron-right"></i>
          </button>
          <button class="btn-action-icon delete" title="Gỡ khỏi album" onclick="removeMediaFromAlbum('${album.id}', '${m.id}')">
            <i data-lucide="minus-circle"></i>
          </button>
          <button class="btn-action-icon delete" title="Xóa vĩnh viễn khỏi thư viện" onclick="deleteMedia('${m.id}')">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
      </div>
    `;
  }).join("");

  lucide.createIcons({ root: container });

  container.querySelectorAll(".album-item-checkbox").forEach(chk => {
    chk.addEventListener("change", (e) => {
      e.stopPropagation();
      const id = chk.getAttribute("data-id");
      if (chk.checked) {
        selectedAlbumMediaIds.add(id);
      } else {
        selectedAlbumMediaIds.delete(id);
      }
      renderAlbumDetailMediaGrid(album);
    });
  });
}

function setAlbumCover(albumId, mediaId) {
  const data = getAppData();
  const album = data.albums.find(a => a.id === albumId);
  const media = data.media.find(m => m.id === mediaId);
  if (!album || !media) return;
  const type = media.file_type || detectFileType(media.file_name, media.mime_type);
  if (type !== "image") {
    showToast("Ảnh bìa phải là hình ảnh.", "error");
    return;
  }
  album.cover_media_id = media.id;
  album.cover_blob_id = media.is_indexed_db ? media.id : null;
  album.cover_image_url = media.is_indexed_db ? "" : (media.file_url || "");
  album.updated_at = new Date().toISOString();
  saveAppData(data);
  logActivity(`Đặt ảnh bìa mới cho album: ${album.title}`, "Albums");
  showToast("Đã cập nhật ảnh bìa album!", "success");
  openAlbumDetail(albumId, true);
  renderPortfolio();
}

function removeMediaFromAlbum(albumId, mediaId) {
  showCustomConfirm("Gỡ tệp khỏi album", "Bạn có chắc muốn gỡ tệp này khỏi album? (Tệp vẫn còn nguyên vẹn trong Thư viện Media)", () => {
    const data = getAppData();
    const album = data.albums.find(a => a.id === albumId);
    if (!album) return;
    album.media_ids = (album.media_ids || []).filter(id => id !== mediaId);
    album.updated_at = new Date().toISOString().split("T")[0];
    saveAppData(data);
    selectedAlbumMediaIds.delete(mediaId);
    logActivity(`Gỡ tệp media khỏi album: ${album.title}`, "Albums");
    showToast("Đã gỡ tệp khỏi album.", "info");
    openAlbumDetail(albumId);
    renderPortfolio();
  });
}

function reorderAlbumMedia(albumId, mediaId, direction) {
  const data = getAppData();
  const album = data.albums.find(a => a.id === albumId);
  if (!album || !album.media_ids) return;

  const idx = album.media_ids.indexOf(mediaId);
  if (idx < 0) return;
  const newIdx = idx + direction;
  if (newIdx < 0 || newIdx >= album.media_ids.length) return;

  const temp = album.media_ids[idx];
  album.media_ids[idx] = album.media_ids[newIdx];
  album.media_ids[newIdx] = temp;
  saveAppData(data);
  openAlbumDetail(albumId, true);
}

function triggerAlbumQuickUpload(albumId) {
  activeAlbumId = albumId;
  const input = document.getElementById("albumDetailFileInput");
  if (input) input.click();
}

async function handleMediaUpload(files, targetAlbumId = null) {
  if (!files || files.length === 0) return;
  const validFiles = [];
  const rejected = [];

  for (let i = 0; i < files.length; i++) {
    const check = classifyUploadFile(files[i]);
    if (!check.ok) {
      rejected.push(check.message);
      showToast(check.message, "error");
      continue;
    }
    validFiles.push({ file: files[i], type: check.type });
  }

  if (validFiles.length === 0) {
    if (rejected.length) showToast("Không có tệp hợp lệ để tải lên.", "error");
    return;
  }

  const progressContainer = document.getElementById("uploadProgressContainer");
  const progressBar = document.getElementById("uploadProgressBar");
  const progressText = document.getElementById("uploadProgressStatusText");
  const fileList = document.getElementById("uploadFileList");
  const mediaTab = document.getElementById("tab-media");
  const dropZone = document.getElementById("mediaDropZone");
  uploadCancelled = false;

  if (progressContainer) {
    const floating = !(mediaTab && mediaTab.classList.contains("active"));
    if (floating) {
      document.body.appendChild(progressContainer);
      progressContainer.classList.add("upload-progress-floating");
    } else if (dropZone && progressContainer.parentElement !== dropZone) {
      dropZone.appendChild(progressContainer);
      progressContainer.classList.remove("upload-progress-floating");
    }
    progressContainer.classList.remove("hidden");
    if (progressBar) progressBar.style.width = "0%";
    if (progressText) progressText.textContent = `Bắt đầu tải lên ${validFiles.length} tệp...`;
    if (fileList) {
      fileList.innerHTML = validFiles.map((item) => `<div class="upload-file-row" data-name="${escapeHtml(item.file.name)}"><span>${escapeHtml(item.file.name)}</span><span>Chờ</span></div>`).join("");
    }
  }

  const data = getAppData();
  let uploadedCount = 0;
  const newMediaIds = [];
  let albumPrivate = false;
  if (targetAlbumId) {
    const targetAlbum = data.albums.find((a) => a.id === targetAlbumId);
    albumPrivate = Boolean(targetAlbum && targetAlbum.visibility !== "PUBLIC");
  }

  for (let i = 0; i < validFiles.length; i++) {
    if (uploadCancelled) break;
    const item = validFiles[i];
    const row = fileList ? fileList.querySelectorAll(".upload-file-row")[i] : null;
    if (row) row.lastElementChild.textContent = "Đang lưu...";
    if (progressText) progressText.textContent = `Đang tải: ${item.file.name} (${i + 1}/${validFiles.length})`;
    await new Promise((resolve) => requestAnimationFrame(() => setTimeout(resolve, 30)));
    if (uploadCancelled) break;

    const newId = "med-" + Date.now() + "-" + Math.random().toString(36).substr(2, 5);
    const blobUrl = URL.createObjectURL(item.file);
    blobUrlCache.set(newId, blobUrl);
    const stored = await storeMediaFile(newId, item.file);
    if (!stored) {
      showToast(`Không lưu được ${item.file.name}.`, "error");
      if (row) {
        row.classList.add("error");
        row.lastElementChild.textContent = "Lỗi";
      }
      continue;
    }

    data.media.unshift({
      id: newId,
      file_name: item.file.name,
      original_filename: item.file.name,
      file_type: item.type,
      mime_type: item.file.type || "application/octet-stream",
      size_bytes: item.file.size,
      caption: item.file.name.replace(/\.[^/.]+$/, ""),
      category: targetAlbumId ? "Album" : "Thư viện",
      is_private: albumPrivate,
      is_indexed_db: true,
      created_at: new Date().toISOString()
    });
    newMediaIds.push(newId);
    uploadedCount++;
    if (row) {
      row.classList.add("ok");
      row.lastElementChild.textContent = "Xong";
    }
    const percent = Math.round((uploadedCount / validFiles.length) * 100);
    if (progressBar) progressBar.style.width = percent + "%";
  }

  if (targetAlbumId && newMediaIds.length) {
    const album = data.albums.find(a => a.id === targetAlbumId);
    if (album) {
      if (!album.media_ids) album.media_ids = [];
      album.media_ids.push(...newMediaIds);
      album.updated_at = new Date().toISOString();
    }
  }

  if (uploadedCount > 0) {
    saveAppData(data);
    logActivity(`Tải lên ${uploadedCount} tệp media mới${targetAlbumId ? " vào album" : ""}`, "Media");
  }

  if (progressText) {
    progressText.textContent = uploadCancelled
      ? `Đã hủy. Đã lưu ${uploadedCount} tệp trước khi dừng.`
      : `Hoàn tất! Đã lưu ${uploadedCount} tệp.`;
  }
  setTimeout(() => {
    if (progressContainer) {
      progressContainer.classList.add("hidden");
      progressContainer.classList.remove("upload-progress-floating");
      if (dropZone && progressContainer.parentElement !== dropZone) dropZone.appendChild(progressContainer);
    }
  }, 1400);

  if (uploadedCount > 0) showToast(`Tải lên thành công ${uploadedCount} tệp!`, "success");
  else if (uploadCancelled) showToast("Đã hủy tải lên.", "info");
  renderCmsDashboard();
  renderPortfolio();

  if (targetAlbumId) {
    activeAlbumId = targetAlbumId;
    openAlbumDetail(targetAlbumId);
  }
}

async function downloadSingleMedia(item) {
  try {
    if (!item || !visitorMayAccessMedia(item.id)) {
      showToast("Bạn không có quyền tải tệp này.", "error");
      return;
    }
    let url = "";
    if (item.is_indexed_db) {
      const blob = await getMediaFile(item.id);
      if (blob) url = URL.createObjectURL(blob);
    }
    if (!url) url = resolveMediaUrl(item);
    if (!url) {
      showToast("Không tìm thấy dữ liệu tệp để tải về.", "error");
      return;
    }
    const a = document.createElement("a");
    a.href = url;
    a.download = item.original_filename || item.file_name || "download";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast(`Đang tải về: ${item.file_name}`, "success");
  } catch (e) {
    showToast("Lỗi khi tải tệp: " + e.message, "error");
  }
}

async function downloadMediaAsZip(mediaItems, zipFilename = "media-archive.zip") {
  if (!mediaItems || mediaItems.length === 0) {
    showToast("Không có tệp nào để nén.", "info");
    return;
  }
  if (!window.JSZip) {
    showToast("Thư viện JSZip chưa sẵn sàng.", "error");
    return;
  }

  showToast(`Đang nén ${mediaItems.length} tệp sang định dạng ZIP...`, "info");
  try {
    const zip = new JSZip();
    const usedNames = new Set();
    for (const item of mediaItems) {
      if (!visitorMayAccessMedia(item.id)) continue;
      let blob = null;
      if (item.is_indexed_db) {
        blob = await getMediaFile(item.id);
      }
      if (!blob && item.file_url && !String(item.file_url).startsWith("blob:")) {
        try {
          const res = await fetch(item.file_url);
          if (res.ok) blob = await res.blob();
        } catch (e) {
          console.warn("Could not fetch remote file for zip:", item.file_name, e);
        }
      }
      if (blob) {
        let name = item.original_filename || item.file_name || `${item.id}.bin`;
        if (usedNames.has(name)) name = `${item.id}-${name}`;
        usedNames.add(name);
        zip.file(name, blob);
      }
    }
    if (usedNames.size === 0) {
      showToast("Không lấy được dữ liệu của các tệp đã chọn.", "error");
      return;
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(zipBlob);
    link.download = zipFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    showToast(`Tải xuống tệp nén ${zipFilename} thành công!`, "success");
  } catch (err) {
    console.error("ZIP creation error:", err);
    showToast("Lỗi tạo file ZIP: " + err.message, "error");
  }
}

function openAlbumEditModal(albumId = null) {
  const modal = document.getElementById("albumEditModal");
  const form = document.getElementById("albumEditForm");
  const idInput = document.getElementById("albumEditId");
  const titleInput = document.getElementById("albumFormTitle");
  const descInput = document.getElementById("albumFormDesc");
  const coverInput = document.getElementById("albumFormCover");
  const visSelect = document.getElementById("albumFormVisibility");
  const pwdGroup = document.getElementById("albumPasswordGroup");
  const pwdInput = document.getElementById("albumFormPassword");
  const explain = document.getElementById("permissionExplanation");
  const heading = document.getElementById("albumModalHeading");
  const preview = document.getElementById("albumCoverPreview");

  pendingAlbumCover = null;
  if (preview) {
    preview.classList.add("hidden");
    preview.removeAttribute("src");
  }
  form.reset();

  if (albumId) {
    const data = getAppData();
    const album = data.albums.find(a => a.id === albumId);
    if (!album) return;
    idInput.value = album.id;
    titleInput.value = album.title;
    descInput.value = album.description || "";
    coverInput.value = (album.cover_image_url && !String(album.cover_image_url).startsWith("blob:")) ? album.cover_image_url : "";
    visSelect.value = album.visibility || "PUBLIC";
    pwdInput.value = "";
    if (heading) heading.textContent = "Chỉnh sửa thông tin album";
    const existingCover = resolveCoverUrl(album);
    if (preview && existingCover) {
      preview.src = existingCover;
      preview.classList.remove("hidden");
    }
  } else {
    idInput.value = "";
    visSelect.value = "PUBLIC";
    pwdInput.value = "";
    if (heading) heading.textContent = "Tạo Album Mới";
  }

  updatePermissionUI(visSelect, pwdGroup, explain);
  modal.classList.remove("hidden");
  lucide.createIcons({ root: modal });
}

function updatePermissionUI(selectEl, pwdGroupEl, explanationEl) {
  const val = selectEl.value;
  const isEdit = Boolean(document.getElementById("albumEditId") && document.getElementById("albumEditId").value);
  const hint = document.getElementById("albumPasswordHint");
  if (val === "PASSWORD_PROTECTED") {
    pwdGroupEl.classList.remove("hidden");
    explanationEl.textContent = "Cần mật khẩu: khách phải nhập đúng mật khẩu riêng của album này trước khi xem ảnh và video. Không cần tài khoản.";
    if (hint) {
      hint.textContent = isEdit
        ? "Để trống nếu giữ mật khẩu hiện tại. Nhập mật khẩu mới sẽ hủy mọi phiên truy cập cũ."
        : "Bắt buộc khi tạo album cần mật khẩu. Mỗi album có một mật khẩu riêng.";
    }
  } else if (val === "ADMIN_ONLY") {
    pwdGroupEl.classList.add("hidden");
    explanationEl.textContent = "Chỉ quản trị viên: album ẩn với khách. Chỉ tài khoản Admin đã đăng nhập CMS mới xem được.";
  } else {
    pwdGroupEl.classList.add("hidden");
    explanationEl.textContent = "Công khai: mọi người xem được album trên website, không cần mật khẩu.";
  }
}

function openQuickPermissionModal(albumId) {
  const data = getAppData();
  const album = data.albums.find(a => a.id === albumId);
  if (!album) return;

  const modal = document.getElementById("albumPermissionModal");
  document.getElementById("quickPermAlbumId").value = album.id;
  document.getElementById("permModalAlbumTitle").textContent = `Album: "${album.title}"`;
  
  const select = document.getElementById("quickPermSelect");
  const pwdBox = document.getElementById("quickPermPasswordBox");
  const pwdInput = document.getElementById("quickPermPasswordInput");

  select.value = album.visibility || "PUBLIC";
  pwdInput.value = "";

  if (select.value === "PASSWORD_PROTECTED") {
    pwdBox.classList.remove("hidden");
  } else {
    pwdBox.classList.add("hidden");
  }

  modal.classList.remove("hidden");
}

function openAlbumMediaPicker() {
  if (!activeAlbumId) return;
  const data = getAppData();
  const album = data.albums.find(a => a.id === activeAlbumId);
  if (!album) return;

  pickerSelectedMediaIds.clear();
  const modal = document.getElementById("albumMediaPickerModal");
  const searchInput = document.getElementById("pickerSearchInput");
  if (searchInput) searchInput.value = "";

  renderPickerMediaGrid(album);
  modal.classList.remove("hidden");
}

function renderPickerMediaGrid(album) {
  const grid = document.getElementById("pickerMediaGrid");
  if (!grid) return;
  const data = getAppData();
  const search = (document.getElementById("pickerSearchInput") ? document.getElementById("pickerSearchInput").value : "").toLowerCase();

  let items = data.media;
  if (search) {
    items = items.filter(m => (m.file_name && m.file_name.toLowerCase().includes(search)));
  }

  if (items.length === 0) {
    grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 20px;">Không có tệp nào phù hợp.</p>`;
    return;
  }

  grid.innerHTML = items.map(m => {
    const isAlreadyIn = (album.media_ids || []).includes(m.id);
    const isSelected = pickerSelectedMediaIds.has(m.id);
    const type = m.file_type || detectFileType(m.file_name, m.mime_type);
    const fileUrl = blobUrlCache.get(m.id) || m.file_url || "";

    return `
      <div class="picker-item-card ${isAlreadyIn ? 'already-in' : ''} ${isSelected ? 'selected' : ''}" data-id="${m.id}" onclick="togglePickerItemSelection('${m.id}', ${isAlreadyIn})">
        <div class="picker-thumb">
          ${type === "image" ? `<img src="${fileUrl}" alt="${m.file_name}" />` : `
            <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #0F172A; color: white;">
              <i data-lucide="play-circle" style="width: 24px; height: 24px; color: var(--accent-blue);"></i>
            </div>
          `}
          ${isAlreadyIn ? `<span class="already-badge font-mono">Đã có</span>` : `
            <input type="checkbox" class="picker-checkbox" ${isSelected ? 'checked' : ''} />
          `}
        </div>
        <span class="picker-title truncate font-mono" title="${m.file_name}">${m.file_name}</span>
      </div>
    `;
  }).join("");

  lucide.createIcons({ root: grid });
}

function togglePickerItemSelection(mediaId, isAlreadyIn) {
  if (isAlreadyIn) return;
  if (pickerSelectedMediaIds.has(mediaId)) {
    pickerSelectedMediaIds.delete(mediaId);
  } else {
    pickerSelectedMediaIds.add(mediaId);
  }
  const data = getAppData();
  const album = data.albums.find(a => a.id === activeAlbumId);
  if (album) renderPickerMediaGrid(album);
}

// ==========================================================================
// 12. CRUD ACTIONS WITH CUSTOM CONFIRMATION
// ==========================================================================
function deleteEducation(id) {
  showCustomConfirm("Xóa mục học vấn", "Bạn có chắc chắn muốn xóa mục học vấn này?", () => {
    const data = getAppData();
    data.education = data.education.filter(e => e.id !== id);
    saveAppData(data);
    logActivity(`Xóa mục học vấn ID: ${id}`, "Education");
    showToast("Đã xóa mục học vấn.", "info");
    renderCmsDashboard();
    renderPortfolio();
  });
}

function deleteSkill(id) {
  showCustomConfirm("Xóa kỹ năng", "Bạn có chắc chắn muốn xóa kỹ năng này?", () => {
    const data = getAppData();
    data.skills = data.skills.filter(s => s.id !== id);
    saveAppData(data);
    logActivity(`Xóa kỹ năng ID: ${id}`, "Skills");
    showToast("Đã xóa kỹ năng.", "info");
    renderCmsDashboard();
    renderPortfolio();
  });
}

function deleteTool(id) {
  showCustomConfirm("Xóa công cụ", "Bạn có chắc chắn muốn xóa công cụ này?", () => {
    const data = getAppData();
    data.tools = data.tools.filter(t => t.id !== id);
    saveAppData(data);
    logActivity(`Xóa công cụ ID: ${id}`, "Tools");
    showToast("Đã xóa công cụ.", "info");
    renderCmsDashboard();
    renderPortfolio();
  });
}

function deleteCertificate(id) {
  showCustomConfirm("Xóa chứng chỉ", "Bạn có chắc chắn muốn xóa chứng chỉ này?", () => {
    const data = getAppData();
    data.certificates = data.certificates.filter(c => c.id !== id);
    saveAppData(data);
    logActivity(`Xóa chứng chỉ ID: ${id}`, "Certificates");
    showToast("Đã xóa chứng chỉ.", "info");
    renderCmsDashboard();
    renderPortfolio();
  });
}

function deleteInterest(id) {
  showCustomConfirm("Xóa sở thích", "Bạn có chắc chắn muốn xóa sở thích này?", () => {
    const data = getAppData();
    data.interests = data.interests.filter(i => i.id !== id);
    saveAppData(data);
    logActivity(`Xóa sở thích ID: ${id}`, "Interests");
    showToast("Đã xóa sở thích.", "info");
    renderCmsDashboard();
    renderPortfolio();
  });
}

function deletePost(id) {
  showCustomConfirm("Xóa bài viết", "Bạn có chắc chắn muốn xóa bài viết này?", () => {
    const data = getAppData();
    data.posts = data.posts.filter(p => p.id !== id);
    saveAppData(data);
    logActivity(`Xóa bài viết ID: ${id}`, "Posts");
    showToast("Đã xóa bài viết.", "info");
    renderCmsDashboard();
    renderPortfolio();
  });
}

function deleteMedia(id) {
  showCustomConfirm("Xóa vĩnh viễn tệp", "Tệp sẽ bị xóa khỏi Thư viện Media và gỡ khỏi mọi album. Thao tác này không hoàn tác.", async () => {
    const data = getAppData();
    data.media = data.media.filter(m => m.id !== id);
    data.albums.forEach(alb => {
      if (alb.media_ids) {
        alb.media_ids = alb.media_ids.filter(mid => mid !== id);
      }
    });
    saveAppData(data);
    selectedMediaIds.delete(id);
    await deleteMediaFile(id);
    blobUrlCache.delete(id);

    logActivity(`Xóa media ID: ${id}`, "Media");
    showToast("Đã xóa tệp media thành công.", "info");
    renderCmsDashboard();
    renderPortfolio();
    if (activeAlbumId) openAlbumDetail(activeAlbumId);
  });
}

function deleteAlbum(id) {
  showCustomConfirm("Xóa album", "Bạn có chắc chắn muốn xóa album này? (Các ảnh và video trong album vẫn sẽ được giữ lại trong Thư viện Media)", () => {
    const data = getAppData();
    data.albums = data.albums.filter(a => a.id !== id);
    saveAppData(data);
    sessionStorage.removeItem(`unlocked_album_${id}`);
    if (activeAlbumId === id) {
      activeAlbumId = null;
      document.getElementById("albumDetailView").classList.add("hidden");
      document.getElementById("albumsListView").classList.remove("hidden");
    }
    logActivity(`Xóa album ID: ${id}`, "Albums");
    showToast("Đã xóa album.", "info");
    renderCmsDashboard();
    renderPortfolio();
  });
}

function deleteContactMessage(id) {
  showCustomConfirm("Xóa tin nhắn", "Bạn có chắc chắn muốn xóa tin nhắn này?", () => {
    const data = getAppData();
    data.contact_messages = data.contact_messages.filter(m => m.id !== id);
    saveAppData(data);
    showToast("Đã xóa tin nhắn.", "info");
    renderCmsDashboard();
  });
}

// ==========================================================================
// 12. INITIALIZATION & EVENT LISTENERS
// ==========================================================================
document.addEventListener("DOMContentLoaded", async () => {
  await migrateAlbumPasswords();
  renderPortfolio();
  preloadIndexedDBMedia();

  // 1. Mobile Menu Drawer
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mainSidebar = document.getElementById("mainSidebar");
  const mobileBackdrop = document.getElementById("mobileBackdrop");

  function toggleSidebar(open) {
    if (open) {
      mainSidebar.classList.add("open");
      mobileBackdrop.classList.remove("hidden");
    } else {
      mainSidebar.classList.remove("open");
      mobileBackdrop.classList.add("hidden");
    }
  }

  mobileMenuBtn.addEventListener("click", () => toggleSidebar(true));
  mobileBackdrop.addEventListener("click", () => toggleSidebar(false));

  // Close sidebar on nav item click (mobile)
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      toggleSidebar(false);
      document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // 2. Active section tracking on scroll
  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section[id]");
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelectorAll(".nav-link").forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  });

  // 3. Copy Phone & Email
  const copyPhoneBtn = document.getElementById("copyPhoneBtn");
  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener("click", () => {
      const data = getAppData();
      navigator.clipboard.writeText(data.profile.phone || "0972456724");
      showToast("Đã sao chép số điện thoại: " + (data.profile.phone || "0972456724"), "success");
    });
  }

  const copyEmailBtn = document.getElementById("copyEmailBtn");
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", () => {
      const data = getAppData();
      if (data.profile.email) {
        navigator.clipboard.writeText(data.profile.email);
        showToast("Đã sao chép email!", "success");
      } else {
        showToast("Chưa cấu hình email liên hệ.", "info");
      }
    });
  }

  // 4. Contact Form Submission
  const publicForm = document.getElementById("publicContactForm");
  if (publicForm) {
    publicForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("contactFormName").value.trim();
      const email = document.getElementById("contactFormEmail").value.trim();
      const phone = document.getElementById("contactFormPhone").value.trim();
      const subject = document.getElementById("contactFormSubject").value.trim();
      const message = document.getElementById("contactFormMessage").value.trim();

      if (!name || !email || !message) {
        showToast("Vui lòng nhập đầy đủ thông tin bắt buộc.", "error");
        return;
      }

      const data = getAppData();
      data.contact_messages.unshift({
        id: "msg-" + Date.now(),
        name,
        email,
        phone,
        subject,
        message,
        is_read: false,
        created_at: new Date().toISOString().split("T")[0]
      });
      saveAppData(data);
      logActivity(`Tin nhắn mới từ ${name} (${email})`, "Contact");

      publicForm.reset();
      const statusBox = document.getElementById("contactFormStatus");
      statusBox.textContent = "Tin nhắn của bạn đã được gửi thành công đến Cao Đức Tiến Thành!";
      statusBox.className = "form-status success";
      statusBox.classList.remove("hidden");
      showToast("Gửi tin nhắn liên hệ thành công!", "success");

      setTimeout(() => statusBox.classList.add("hidden"), 5000);
    });
  }

  // 5. Journal Search Input
  const journalInput = document.getElementById("journalSearchInput");
  if (journalInput) {
    journalInput.addEventListener("input", (e) => {
      currentJournalSearch = e.target.value.trim();
      const data = getAppData();
      renderJournalPosts(data.posts.filter(p => p.status === "published"));
    });
  }

  // 6. Scroll to top button
  const topBtn = document.getElementById("scrollToTopBtn");
  if (topBtn) {
    topBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // 7. Modals close handling
  document.querySelectorAll("[data-close]").forEach(btn => {
    btn.addEventListener("click", () => {
      const modalId = btn.getAttribute("data-close");
      if (modalId === "videoPreviewModal") {
        closeVideoPreview();
        return;
      }
      if (modalId === "pdfPreviewModal") {
        closePdfPreview();
        return;
      }
      const target = document.getElementById(modalId);
      if (target) target.classList.add("hidden");
    });
  });

  const lightbox = document.getElementById("lightboxModal");
  document.getElementById("lightboxCloseBtn").addEventListener("click", () => lightbox.classList.add("hidden"));
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.classList.add("hidden");
  });

  // Password visibility toggle in Unlock modal
  const togglePassBtn = document.getElementById("toggleAlbumPasswordVisibility");
  if (togglePassBtn) {
    togglePassBtn.addEventListener("click", () => {
      const input = document.getElementById("albumPasswordInput");
      input.type = input.type === "password" ? "text" : "password";
    });
  }

  // 8. CMS Open & Close Handlers
  const adminModal = document.getElementById("adminCmsModal");
  function openCms() {
    adminModal.classList.remove("hidden");
    checkAdminAuth();
  }
  function closeCms() {
    adminModal.classList.add("hidden");
  }

  document.getElementById("openCmsBtn").addEventListener("click", openCms);
  document.getElementById("cmsDirectBtnMobile").addEventListener("click", openCms);
  document.getElementById("footerOpenCmsLink").addEventListener("click", openCms);
  document.getElementById("closeCmsBtn").addEventListener("click", closeCms);

  // Check URL hash for #admin or /admin
  if (window.location.hash === "#admin" || window.location.pathname.includes("admin")) {
    openCms();
  }

  // CMS Login Form
  document.getElementById("cmsLoginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("cmsEmailInput").value.trim();
    const pass = document.getElementById("cmsPasswordInput").value.trim();
    const errBox = document.getElementById("cmsLoginError");

    if (email === DEFAULT_ADMIN_EMAIL && pass === DEFAULT_ADMIN_PASS) {
      localStorage.setItem("thanh_admin_logged_in", "true");
      errBox.classList.add("hidden");
      showToast("Đăng nhập Quản trị viên thành công!", "success");
      checkAdminAuth();
      renderPortfolio();
    } else {
      errBox.textContent = "Email hoặc mật khẩu không chính xác.";
      errBox.classList.remove("hidden");
    }
  });

  // CMS Demo Login Fill
  document.getElementById("fillDemoLoginBtn").addEventListener("click", () => {
    document.getElementById("cmsEmailInput").value = DEFAULT_ADMIN_EMAIL;
    document.getElementById("cmsPasswordInput").value = DEFAULT_ADMIN_PASS;
  });

  // CMS Logout
  document.getElementById("cmsLogoutBtn").addEventListener("click", () => {
    localStorage.removeItem("thanh_admin_logged_in");
    showToast("Đã đăng xuất khỏi CMS.", "info");
    checkAdminAuth();
    renderPortfolio();
  });

  // CMS Tabs navigation
  document.querySelectorAll(".cms-tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".cms-tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".cms-tab-pane").forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const targetId = btn.getAttribute("data-tab");
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add("active");
    });
  });

  // CMS Profile Form Submit
  document.getElementById("cmsProfileForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = getAppData();
    data.profile.full_name = document.getElementById("adminProfileName").value.trim();
    data.profile.birthday = document.getElementById("adminProfileDob").value.trim();
    data.profile.phone = document.getElementById("adminProfilePhone").value.trim();
    data.profile.location = document.getElementById("adminProfileLocation").value.trim();
    data.profile.headline = document.getElementById("adminProfileHeadline").value.trim();
    data.profile.bio = document.getElementById("adminProfileBio").value.trim();
    data.profile.portrait_url = document.getElementById("adminProfilePortrait").value.trim();
    data.profile.email = document.getElementById("adminProfileEmail").value.trim();

    saveAppData(data);
    logActivity("Cập nhật thông tin hồ sơ cá nhân", "Profile");
    showToast("Đã lưu thông tin hồ sơ cá nhân!", "success");
    renderPortfolio();
  });

  // Add Education prompt
  document.getElementById("adminAddEducationBtn").addEventListener("click", () => {
    const institution = prompt("Nhập tên trường học / cơ sở đào tạo:");
    if (!institution) return;
    const level = prompt("Cấp bậc (High School / University):", "University");
    const status = prompt("Trạng thái:", "Graduated");
    const description = prompt("Mô tả ngắn gọn:");

    const data = getAppData();
    data.education.push({
      id: "edu-" + Date.now(),
      institution,
      level: level || "University",
      status: status || "Graduated",
      timeline: "Graduated",
      description: description || ""
    });
    saveAppData(data);
    logActivity(`Thêm học vấn: ${institution}`, "Education");
    showToast("Đã thêm mục học vấn!", "success");
    renderCmsDashboard();
    renderPortfolio();
  });

  // Add Skill prompt
  document.getElementById("adminAddSkillBtn").addEventListener("click", () => openSkillForm());

  // Add Tool prompt
  document.getElementById("adminAddToolBtn").addEventListener("click", () => {
    const name = prompt("Tên công cụ tự phát triển:");
    if (!name) return;
    const category = prompt("Phân loại:", "Engineering Utility");
    const description = prompt("Mô tả công cụ:");
    const purpose = prompt("Mục đích xây dựng:");
    const problem_solved = prompt("Bài toán giải quyết:");

    const data = getAppData();
    data.tools.push({
      id: "tool-" + Date.now(),
      name,
      category: category || "Utility",
      thumbnail_url: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=800",
      description: description || "",
      purpose: purpose || "",
      problem_solved: problem_solved || "",
      main_features: ["Tự động hóa tác vụ", "Tối ưu quy trình", "Báo cáo nhanh"],
      technologies: ["Automation Helper", "Scripting"],
      is_published: true
    });
    saveAppData(data);
    logActivity(`Thêm công cụ: ${name}`, "Tools");
    showToast("Đã thêm công cụ mới!", "success");
    renderCmsDashboard();
    renderPortfolio();
  });

  // Add Certificate prompt
  document.getElementById("adminAddCertBtn").addEventListener("click", () => {
    const title = prompt("Tên chứng chỉ (VD: TOEIC Listening & Reading):");
    if (!title) return;
    const score = prompt("Điểm số / Xếp loại:", "600");
    const issuing_org = prompt("Tổ chức cấp:", "ETS");
    const description = prompt("Mô tả chứng chỉ:");

    const data = getAppData();
    data.certificates.push({
      id: "cert-" + Date.now(),
      title,
      score: score || "600",
      issuing_org: issuing_org || "ETS",
      issue_date: "Verified",
      description: description || "",
      image_url: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=800"
    });
    saveAppData(data);
    logActivity(`Thêm chứng chỉ: ${title}`, "Certificates");
    showToast("Đã thêm chứng chỉ mới!", "success");
    renderCmsDashboard();
    renderPortfolio();
  });

  // Add Interest prompt
  document.getElementById("adminAddInterestBtn").addEventListener("click", () => {
    const title = prompt("Tiêu đề sở thích:");
    if (!title) return;
    const category = prompt("Loại (sports, music, learning, technology):", "sports");
    const description = prompt("Mô tả sở thích:");

    const data = getAppData();
    data.interests.push({
      id: "intr-" + Date.now(),
      title,
      category: category || "sports",
      description: description || "",
      image_url: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800",
      tags: ["Sở thích", "Đời sống"]
    });
    saveAppData(data);
    logActivity(`Thêm sở thích: ${title}`, "Interests");
    showToast("Đã thêm sở thích!", "success");
    renderCmsDashboard();
    renderPortfolio();
  });

  // Add Post prompt
  document.getElementById("adminAddPostBtn").addEventListener("click", () => {
    const title = prompt("Tiêu đề bài viết:");
    if (!title) return;
    const category_name = prompt("Chuyên mục:", "Engineering & Workflow");
    const excerpt = prompt("Tóm tắt ngắn gọn:");
    const content = prompt("Nội dung bài viết:");

    const data = getAppData();
    data.posts.unshift({
      id: "post-" + Date.now(),
      title,
      category_name: category_name || "Kỹ thuật",
      excerpt: excerpt || title,
      content: content || title,
      cover_image_url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000",
      tags: ["Kỹ thuật", "Tối ưu"],
      status: "published",
      views_count: 1,
      published_at: new Date().toISOString().split("T")[0]
    });
    saveAppData(data);
    logActivity(`Tạo bài viết: ${title}`, "Posts");
    showToast("Đã tạo bài viết mới!", "success");
    renderCmsDashboard();
    renderPortfolio();
  });

  initCmsMediaAlbumControls();
});
