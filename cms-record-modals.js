const CMS_ICON_SETS = {
  tool: [
    ["cpu", "Máy tính"], ["terminal", "Script"], ["code", "Mã"], ["wrench", "Kỹ thuật"],
    ["settings", "Cài đặt"], ["layers", "Layer"], ["box", "Mô hình"], ["workflow", "Luồng"],
    ["zap", "Tự động"], ["database", "Dữ liệu"], ["file-spreadsheet", "Bảng"], ["globe", "Web"],
    ["monitor", "Giao diện"], ["puzzle", "Tiện ích"], ["hammer", "Thực hành"], ["sparkles", "Tối ưu"]
  ],
  cert: [
    ["award", "Chứng chỉ"], ["medal", "Huy chương"], ["shield-check", "Xác thực"], ["star", "Xếp loại"],
    ["badge-check", "Đạt"], ["languages", "Ngoại ngữ"], ["graduation-cap", "Học thuật"], ["file-badge", "Văn bằng"],
    ["trophy", "Thành tích"], ["book-open", "Kiến thức"], ["target", "Mục tiêu"], ["check-circle", "Hoàn thành"]
  ],
  interest: [
    ["activity", "Thể thao"], ["music", "Âm nhạc"], ["compass", "Khám phá"], ["camera", "Hình ảnh"],
    ["book-open", "Học tập"], ["lightbulb", "Ý tưởng"], ["heart", "Đời sống"], ["mountain", "Ngoài trời"],
    ["headphones", "Nghe nhạc"], ["gamepad-2", "Giải trí"], ["palette", "Sáng tạo"], ["globe", "Thế giới"]
  ]
};

let cmsToolIcon = "cpu";
let cmsCertIcon = "award";
let cmsInterestIcon = "activity";
let cmsPostSlugTouched = false;
let pendingPostCover = null;
let pendingToolThumb = null;

function todayInputDate() {
  return new Date().toISOString().split("T")[0];
}

function slugifyTitle(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function parseCommaList(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function eduLevelLabel(level) {
  const map = {
    university: "Đại học",
    high_school: "THPT Chuyên",
    college: "Cao đẳng",
    certificate: "Chứng chỉ chuyên môn",
    postgraduate: "Sau đại học"
  };
  if (map[level]) return map[level];
  if (/univ/i.test(level || "")) return "Đại học";
  if (/high/i.test(level || "")) return "THPT Chuyên";
  return level || "Đại học";
}

function eduStatusLabel(status) {
  const map = {
    graduated: "Đã tốt nghiệp",
    studying: "Đang theo học",
    completed: "Hoàn thành"
  };
  if (map[status]) return map[status];
  if (/graduat/i.test(status || "")) return "Đã tốt nghiệp";
  if (/study/i.test(status || "")) return "Đang theo học";
  return status || "Đã tốt nghiệp";
}

function interestCategoryLabel(id) {
  const map = { sports: "Thể thao", music: "Âm nhạc", learning: "Học tập & Công nghệ", lifestyle: "Đời sống" };
  return map[id] || id || "Đời sống";
}

function postStatusLabel(status) {
  if (status === "draft") return "Nháp";
  if (status === "archived") return "Lưu trữ";
  return "Đã xuất bản";
}

function formatEducationTimeline(startDate, endDate, currentlyStudying) {
  if (!startDate && !endDate && !currentlyStudying) return "";
  const start = startDate || "...";
  const end = currentlyStudying ? "Hiện tại" : (endDate || "...");
  return `${start} – ${end}`;
}

function resolvePostCover(post) {
  if (!post) return "";
  if (post.cover_blob_id && typeof blobUrlCache !== "undefined" && blobUrlCache.has(post.cover_blob_id)) {
    return blobUrlCache.get(post.cover_blob_id);
  }
  return post.cover_image_url || "";
}

function renderCmsIconPicker(containerId, setKey) {
  const box = document.getElementById(containerId);
  if (!box) return;
  const selected = setKey === "tool" ? cmsToolIcon : setKey === "cert" ? cmsCertIcon : cmsInterestIcon;
  const icons = CMS_ICON_SETS[setKey];
  box.innerHTML = icons.map(([name, label]) => `
    <button type="button" class="skill-icon-option ${name === selected ? "active" : ""}" data-icon="${name}">
      <i data-lucide="${name}"></i>
      <span>${label}</span>
    </button>
  `).join("");
  box.querySelectorAll("[data-icon]").forEach((button) => {
    button.addEventListener("click", () => {
      const icon = button.getAttribute("data-icon");
      if (setKey === "tool") cmsToolIcon = icon;
      else if (setKey === "cert") cmsCertIcon = icon;
      else cmsInterestIcon = icon;
      renderCmsIconPicker(containerId, setKey);
    });
  });
  if (window.lucide) lucide.createIcons({ root: box });
}

function persistCmsRecord(collection, id, prefix, payload, nameValue) {
  const data = getAppData();
  if (id) {
    const item = data[collection].find((row) => row.id === id);
    if (!item) {
      showToast("Không tìm thấy mục cần sửa.", "error");
      return false;
    }
    Object.assign(item, payload);
    logActivity(`Cập nhật: ${nameValue}`, collection);
  } else {
    const record = { id: `${prefix}-${Date.now()}`, ...payload };
    if (collection === "posts") data.posts.unshift(record);
    else data[collection].push(record);
    logActivity(`Thêm: ${nameValue}`, collection);
  }
  saveAppData(data);
  showToast("Lưu thành công!", "success");
  renderCmsDashboard();
  renderPortfolio();
  return true;
}

function closeCmsModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add("hidden");
}

function openEducationForm(id) {
  const form = document.getElementById("educationForm");
  form.reset();
  document.getElementById("educationFormId").value = id || "";
  document.getElementById("educationFormHeading").textContent = id ? "Sửa học vấn" : "Thêm học vấn";
  document.getElementById("educationCurrentlyStudying").checked = false;
  document.getElementById("educationEndDate").disabled = false;
  if (id) {
    const item = getAppData().education.find((row) => row.id === id);
    if (!item) return;
    document.getElementById("educationInstitution").value = item.institution || "";
    document.getElementById("educationMajor").value = item.major || "";
    document.getElementById("educationLevel").value = item.level || "university";
    document.getElementById("educationStatus").value = item.status || "graduated";
    document.getElementById("educationStartDate").value = item.start_date || "";
    document.getElementById("educationEndDate").value = item.end_date || "";
    document.getElementById("educationCurrentlyStudying").checked = Boolean(item.currently_studying);
    document.getElementById("educationEndDate").disabled = Boolean(item.currently_studying);
    document.getElementById("educationDescription").value = item.description || "";
  } else {
    document.getElementById("educationLevel").value = "university";
    document.getElementById("educationStatus").value = "graduated";
  }
  document.getElementById("educationFormModal").classList.remove("hidden");
  if (window.lucide) lucide.createIcons({ root: document.getElementById("educationFormModal") });
}

function saveEducationForm(event) {
  event.preventDefault();
  const institution = document.getElementById("educationInstitution").value.trim();
  if (!institution) {
    showToast("Vui lòng nhập tên trường học.", "error");
    return;
  }
  const currentlyStudying = document.getElementById("educationCurrentlyStudying").checked;
  const startDate = document.getElementById("educationStartDate").value;
  const endDate = currentlyStudying ? "" : document.getElementById("educationEndDate").value;
  const status = currentlyStudying ? "studying" : document.getElementById("educationStatus").value;
  const payload = {
    institution,
    major: document.getElementById("educationMajor").value.trim(),
    level: document.getElementById("educationLevel").value,
    status,
    start_date: startDate,
    end_date: endDate,
    currently_studying: currentlyStudying,
    timeline: formatEducationTimeline(startDate, endDate, currentlyStudying) || eduStatusLabel(status),
    description: document.getElementById("educationDescription").value.trim()
  };
  if (persistCmsRecord("education", document.getElementById("educationFormId").value, "edu", payload, institution)) {
    closeCmsModal("educationFormModal");
  }
}

function openToolForm(id) {
  const form = document.getElementById("toolForm");
  form.reset();
  pendingToolThumb = null;
  cmsToolIcon = "cpu";
  document.getElementById("toolFormId").value = id || "";
  document.getElementById("toolFormHeading").textContent = id ? "Sửa công cụ" : "Thêm công cụ";
  document.getElementById("toolPublished").checked = true;
  if (id) {
    const item = getAppData().tools.find((row) => row.id === id);
    if (!item) return;
    document.getElementById("toolName").value = item.name || "";
    document.getElementById("toolCategory").value = item.category || "CAD Utility";
    document.getElementById("toolPublished").checked = item.is_published !== false;
    document.getElementById("toolDescription").value = item.description || "";
    document.getElementById("toolPurpose").value = item.purpose || "";
    document.getElementById("toolProblem").value = item.problem_solved || "";
    document.getElementById("toolTechnologies").value = (item.technologies || []).join(", ");
    document.getElementById("toolThumbUrl").value = item.thumbnail_url || "";
    cmsToolIcon = item.icon || "cpu";
  }
  renderCmsIconPicker("toolIconPicker", "tool");
  document.getElementById("toolFormModal").classList.remove("hidden");
  if (window.lucide) lucide.createIcons({ root: document.getElementById("toolFormModal") });
}

function saveToolForm(event) {
  event.preventDefault();
  const name = document.getElementById("toolName").value.trim();
  if (!name) {
    showToast("Vui lòng nhập tên công cụ.", "error");
    return;
  }
  const id = document.getElementById("toolFormId").value;
  const existing = id ? getAppData().tools.find((row) => row.id === id) : null;
  const payload = {
    name,
    category: document.getElementById("toolCategory").value,
    icon: cmsToolIcon,
    is_published: document.getElementById("toolPublished").checked,
    description: document.getElementById("toolDescription").value.trim(),
    purpose: document.getElementById("toolPurpose").value.trim(),
    problem_solved: document.getElementById("toolProblem").value.trim(),
    technologies: parseCommaList(document.getElementById("toolTechnologies").value),
    thumbnail_url: document.getElementById("toolThumbUrl").value.trim() || (existing && existing.thumbnail_url) || "",
    main_features: (existing && existing.main_features) || ["Tự động hóa tác vụ", "Tối ưu quy trình"],
    screenshots: (existing && existing.screenshots) || [],
    demo_url: existing && existing.demo_url || "",
    download_url: existing && existing.download_url || "",
    dev_date: existing && existing.dev_date || "Cập nhật trong CMS"
  };
  if (pendingToolThumb) {
    payload.thumbnail_url = URL.createObjectURL(pendingToolThumb);
  }
  if (persistCmsRecord("tools", id, "tool", payload, name)) {
    pendingToolThumb = null;
    closeCmsModal("toolFormModal");
  }
}

function openCertificateForm(id) {
  const form = document.getElementById("certificateForm");
  form.reset();
  cmsCertIcon = "award";
  document.getElementById("certificateFormId").value = id || "";
  document.getElementById("certificateFormHeading").textContent = id ? "Sửa chứng chỉ" : "Thêm chứng chỉ";
  if (id) {
    const item = getAppData().certificates.find((row) => row.id === id);
    if (!item) return;
    document.getElementById("certificateTitle").value = item.title || "";
    document.getElementById("certificateOrg").value = item.issuing_org || "";
    document.getElementById("certificateScore").value = item.score || "";
    document.getElementById("certificateIssueDate").value = item.issue_date && item.issue_date.includes("-") ? item.issue_date : "";
    document.getElementById("certificateExpiryDate").value = item.expiry_date || "";
    document.getElementById("certificateDescription").value = item.description || "";
    document.getElementById("certificateImageUrl").value = item.image_url || "";
    cmsCertIcon = item.icon || "award";
  }
  renderCmsIconPicker("certificateIconPicker", "cert");
  document.getElementById("certificateFormModal").classList.remove("hidden");
  if (window.lucide) lucide.createIcons({ root: document.getElementById("certificateFormModal") });
}

function saveCertificateForm(event) {
  event.preventDefault();
  const title = document.getElementById("certificateTitle").value.trim();
  if (!title) {
    showToast("Vui lòng nhập tên chứng chỉ.", "error");
    return;
  }
  const payload = {
    title,
    issuing_org: document.getElementById("certificateOrg").value.trim(),
    score: document.getElementById("certificateScore").value.trim(),
    issue_date: document.getElementById("certificateIssueDate").value,
    expiry_date: document.getElementById("certificateExpiryDate").value,
    icon: cmsCertIcon,
    description: document.getElementById("certificateDescription").value.trim(),
    image_url: document.getElementById("certificateImageUrl").value.trim()
  };
  if (persistCmsRecord("certificates", document.getElementById("certificateFormId").value, "cert", payload, title)) {
    closeCmsModal("certificateFormModal");
  }
}

function openInterestForm(id) {
  const form = document.getElementById("interestForm");
  form.reset();
  cmsInterestIcon = "activity";
  document.getElementById("interestFormId").value = id || "";
  document.getElementById("interestFormHeading").textContent = id ? "Sửa sở thích" : "Thêm sở thích";
  if (id) {
    const item = getAppData().interests.find((row) => row.id === id);
    if (!item) return;
    document.getElementById("interestTitle").value = item.title || "";
    document.getElementById("interestCategory").value = item.category || "sports";
    document.getElementById("interestDescription").value = item.description || "";
    document.getElementById("interestImageUrl").value = item.image_url || "";
    document.getElementById("interestTags").value = (item.tags || []).join(", ");
    cmsInterestIcon = item.icon || "activity";
  } else {
    document.getElementById("interestCategory").value = "sports";
  }
  renderCmsIconPicker("interestIconPicker", "interest");
  document.getElementById("interestFormModal").classList.remove("hidden");
  if (window.lucide) lucide.createIcons({ root: document.getElementById("interestFormModal") });
}

function saveInterestForm(event) {
  event.preventDefault();
  const title = document.getElementById("interestTitle").value.trim();
  if (!title) {
    showToast("Vui lòng nhập tên sở thích.", "error");
    return;
  }
  const payload = {
    title,
    category: document.getElementById("interestCategory").value,
    icon: cmsInterestIcon,
    description: document.getElementById("interestDescription").value.trim(),
    image_url: document.getElementById("interestImageUrl").value.trim() || "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800",
    tags: parseCommaList(document.getElementById("interestTags").value)
  };
  if (persistCmsRecord("interests", document.getElementById("interestFormId").value, "intr", payload, title)) {
    closeCmsModal("interestFormModal");
  }
}

function openPostForm(id) {
  const form = document.getElementById("postForm");
  form.reset();
  pendingPostCover = null;
  cmsPostSlugTouched = false;
  document.getElementById("postFormId").value = id || "";
  document.getElementById("postFormHeading").textContent = id ? "Sửa bài viết" : "Thêm bài viết";
  document.getElementById("postCoverPreview").classList.add("hidden");
  if (id) {
    const item = getAppData().posts.find((row) => row.id === id);
    if (!item) return;
    document.getElementById("postTitle").value = item.title || "";
    document.getElementById("postSlug").value = item.slug || slugifyTitle(item.title);
    document.getElementById("postCategory").value = item.category_name || "Kỹ thuật & Workflow";
    document.getElementById("postStatus").value = item.status || "published";
    document.getElementById("postPublishedAt").value = item.published_at || todayInputDate();
    document.getElementById("postCoverUrl").value = item.cover_image_url || "";
    document.getElementById("postExcerpt").value = item.excerpt || "";
    document.getElementById("postContent").value = item.content || "";
    document.getElementById("postTags").value = (item.tags || []).join(", ");
    cmsPostSlugTouched = true;
    const cover = resolvePostCover(item);
    if (cover) {
      document.getElementById("postCoverPreview").src = cover;
      document.getElementById("postCoverPreview").classList.remove("hidden");
    }
  } else {
    document.getElementById("postCategory").value = "Kỹ thuật & Workflow";
    document.getElementById("postStatus").value = "published";
    document.getElementById("postPublishedAt").value = todayInputDate();
  }
  document.getElementById("postFormModal").classList.remove("hidden");
  if (window.lucide) lucide.createIcons({ root: document.getElementById("postFormModal") });
}

async function savePostForm(event) {
  event.preventDefault();
  const title = document.getElementById("postTitle").value.trim();
  if (!title) {
    showToast("Vui lòng nhập tiêu đề bài viết.", "error");
    return;
  }
  const excerpt = document.getElementById("postExcerpt").value.trim();
  const content = document.getElementById("postContent").value.trim();
  if (!excerpt) {
    showToast("Vui lòng nhập tóm tắt ngắn.", "error");
    return;
  }
  if (!content) {
    showToast("Vui lòng nhập nội dung bài viết.", "error");
    return;
  }
  const id = document.getElementById("postFormId").value;
  const existing = id ? getAppData().posts.find((row) => row.id === id) : null;
  let coverUrl = document.getElementById("postCoverUrl").value.trim();
  let coverBlobId = existing && existing.cover_blob_id;
  if (pendingPostCover) {
    coverBlobId = "post-cover-" + Date.now();
    await storeMediaFile(coverBlobId, pendingPostCover);
    const url = URL.createObjectURL(pendingPostCover);
    blobUrlCache.set(coverBlobId, url);
    coverUrl = "";
  }
  const payload = {
    title,
    slug: document.getElementById("postSlug").value.trim() || slugifyTitle(title),
    category_name: document.getElementById("postCategory").value,
    status: document.getElementById("postStatus").value,
    published_at: document.getElementById("postPublishedAt").value || todayInputDate(),
    cover_image_url: coverUrl,
    cover_blob_id: coverBlobId || "",
    excerpt,
    content,
    tags: parseCommaList(document.getElementById("postTags").value),
    views_count: existing && existing.views_count ? existing.views_count : 0
  };
  if (persistCmsRecord("posts", id, "post", payload, title)) {
    pendingPostCover = null;
    closeCmsModal("postFormModal");
  }
}

function initCmsRecordModals() {
  const skillForm = document.getElementById("skillForm");
  if (skillForm) skillForm.addEventListener("submit", saveSkillForm);

  document.getElementById("adminAddEducationBtn").addEventListener("click", () => openEducationForm());
  document.getElementById("educationForm").addEventListener("submit", saveEducationForm);
  document.getElementById("educationCurrentlyStudying").addEventListener("change", (event) => {
    document.getElementById("educationEndDate").disabled = event.target.checked;
    if (event.target.checked) {
      document.getElementById("educationStatus").value = "studying";
      document.getElementById("educationEndDate").value = "";
    }
  });

  document.getElementById("adminAddToolBtn").addEventListener("click", () => openToolForm());
  document.getElementById("toolForm").addEventListener("submit", saveToolForm);
  document.getElementById("toolThumbFile").addEventListener("change", () => {
    const file = document.getElementById("toolThumbFile").files[0];
    if (file) pendingToolThumb = file;
  });

  document.getElementById("adminAddCertBtn").addEventListener("click", () => openCertificateForm());
  document.getElementById("certificateForm").addEventListener("submit", saveCertificateForm);

  document.getElementById("adminAddInterestBtn").addEventListener("click", () => openInterestForm());
  document.getElementById("interestForm").addEventListener("submit", saveInterestForm);

  document.getElementById("adminAddPostBtn").addEventListener("click", () => openPostForm());
  document.getElementById("postForm").addEventListener("submit", savePostForm);
  document.getElementById("postTitle").addEventListener("input", () => {
    if (!cmsPostSlugTouched) document.getElementById("postSlug").value = slugifyTitle(document.getElementById("postTitle").value);
  });
  document.getElementById("postSlug").addEventListener("input", () => {
    cmsPostSlugTouched = Boolean(document.getElementById("postSlug").value.trim());
  });
  document.getElementById("postCoverFile").addEventListener("change", () => {
    const file = document.getElementById("postCoverFile").files[0];
    if (!file) return;
    pendingPostCover = file;
    const preview = document.getElementById("postCoverPreview");
    preview.src = URL.createObjectURL(file);
    preview.classList.remove("hidden");
    document.getElementById("postCoverUrl").value = "";
  });
}
