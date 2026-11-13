function applyAlbumAccess(album, visibility, password) {
  album.visibility = visibility;
  if (visibility === "PASSWORD_PROTECTED") {
    if (password && password.trim()) {
      album.password_salt = randomSalt();
      album.password_hash = hashAlbumPasswordSync(password.trim(), album.password_salt);
      album.password_version = (album.password_version || 0) + 1;
      delete album.password;
      revokeAlbumSession(album.id);
      return { ok: true };
    }
    if (!album.password_hash) {
      return { ok: false, message: "Vui lòng đặt mật khẩu cho album cần mật khẩu." };
    }
    return { ok: true };
  }
  delete album.password;
  delete album.password_hash;
  delete album.password_salt;
  revokeAlbumSession(album.id);
  return { ok: true };
}

function bindPasswordToggle(buttonId, inputId) {
  const button = document.getElementById(buttonId);
  const input = document.getElementById(inputId);
  if (!button || !input) return;
  button.addEventListener("click", () => {
    input.type = input.type === "password" ? "text" : "password";
    const icon = button.querySelector("i");
    if (icon) icon.setAttribute("data-lucide", input.type === "password" ? "eye" : "eye-off");
    if (window.lucide) lucide.createIcons({ root: button });
  });
}

function bindFileDrop(zone, onFiles) {
  if (!zone) return;
  ["dragenter", "dragover"].forEach((name) => {
    zone.addEventListener(name, (event) => {
      event.preventDefault();
      zone.classList.add("drag-over");
    });
  });
  ["dragleave", "drop"].forEach((name) => {
    zone.addEventListener(name, (event) => {
      event.preventDefault();
      if (name === "dragleave" && zone.contains(event.relatedTarget)) return;
      zone.classList.remove("drag-over");
    });
  });
  zone.addEventListener("drop", (event) => {
    if (event.dataTransfer && event.dataTransfer.files) onFiles(event.dataTransfer.files);
  });
}

async function saveAlbumFromForm(event) {
  event.preventDefault();
  const id = document.getElementById("albumEditId").value;
  const title = document.getElementById("albumFormTitle").value.trim();
  const description = document.getElementById("albumFormDesc").value.trim();
  const visibility = document.getElementById("albumFormVisibility").value;
  const password = document.getElementById("albumFormPassword").value;
  const coverText = document.getElementById("albumFormCover").value.trim();
  if (!title) {
    showToast("Vui lòng nhập tên album.", "error");
    return;
  }

  const data = getAppData();
  let album = id ? data.albums.find((item) => item.id === id) : null;
  const isNew = !album;
  if (isNew) {
    album = {
      id: "alb-" + Date.now(),
      media_ids: [],
      created_at: new Date().toISOString()
    };
    data.albums.push(album);
  }
  album.title = title;
  album.description = description;
  const access = applyAlbumAccess(album, visibility, password);
  if (!access.ok) {
    if (isNew) data.albums = data.albums.filter((item) => item.id !== album.id);
    showToast(access.message, "error");
    return;
  }

  if (pendingAlbumCover) {
    const coverId = pendingAlbumCover.id;
    const stored = await storeMediaFile(coverId, pendingAlbumCover.file);
    if (!stored) {
      showToast("Không lưu được ảnh bìa.", "error");
      return;
    }
    blobUrlCache.set(coverId, URL.createObjectURL(pendingAlbumCover.file));
    album.cover_blob_id = coverId;
    album.cover_media_id = null;
    album.cover_image_url = "";
    pendingAlbumCover = null;
  } else if (coverText && !coverText.startsWith("blob:")) {
    album.cover_image_url = coverText;
    album.cover_blob_id = null;
    album.cover_media_id = null;
  }

  album.updated_at = new Date().toISOString();
  saveAppData(data);
  document.getElementById("albumEditModal").classList.add("hidden");
  logActivity(isNew ? `Tạo album: ${album.title}` : `Cập nhật album: ${album.title}`, "Albums");
  showToast(isNew ? "Đã tạo album mới!" : "Đã cập nhật album!", "success");
  renderCmsDashboard();
  renderPortfolio();
  if (activeAlbumId === album.id) openAlbumDetail(album.id, true);
}

function initCmsMediaAlbumControls() {
  const mediaInput = document.getElementById("mediaFileInput");
  const mediaZone = document.getElementById("mediaDropZone");
  const progressBox = document.getElementById("uploadProgressContainer");
  if (progressBox) progressBox.addEventListener("click", (event) => event.stopPropagation());
  if (mediaZone && mediaInput) {
    mediaZone.addEventListener("click", (event) => {
      if (event.target === mediaInput) return;
      mediaInput.click();
    });
    bindFileDrop(mediaZone, (files) => handleMediaUpload(files, null));
  }
  if (mediaInput) {
    mediaInput.addEventListener("change", () => {
      handleMediaUpload(mediaInput.files, null);
      mediaInput.value = "";
    });
  }
  const cancelBtn = document.getElementById("cancelUploadBtn");
  if (cancelBtn) {
    cancelBtn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      uploadCancelled = true;
      showToast("Đang hủy các tệp còn lại...", "info");
    });
  }

  const searchInput = document.getElementById("mediaSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      currentMediaSearch = searchInput.value.trim();
      mediaPage = 1;
      renderUpgradedMedia();
    });
  }
  document.querySelectorAll(".btn-filter-pill").forEach((button) => {
    button.addEventListener("click", () => {
      currentMediaFilter = button.getAttribute("data-type") || "all";
      mediaPage = 1;
      document.querySelectorAll(".btn-filter-pill").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderUpgradedMedia();
    });
  });
  const sortSelect = document.getElementById("mediaSortSelect");
  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      currentMediaSort = sortSelect.value;
      renderUpgradedMedia();
    });
  }
  const selectAllMedia = document.getElementById("selectAllMediaCheck");
  if (selectAllMedia) {
    selectAllMedia.addEventListener("change", () => {
      if (selectAllMedia.checked) lastFilteredMediaIds.forEach((id) => selectedMediaIds.add(id));
      else lastFilteredMediaIds.forEach((id) => selectedMediaIds.delete(id));
      renderUpgradedMedia();
    });
  }
  const downloadSelected = document.getElementById("downloadSelectedMediaBtn");
  if (downloadSelected) {
    downloadSelected.addEventListener("click", () => {
      const data = getAppData();
      const items = data.media.filter((item) => selectedMediaIds.has(item.id));
      downloadMediaAsZip(items, "thu-vien-media.zip");
    });
  }
  const deleteSelected = document.getElementById("deleteSelectedMediaBtn");
  if (deleteSelected) {
    deleteSelected.addEventListener("click", () => {
      if (selectedMediaIds.size === 0) return;
      showCustomConfirm("Xóa vĩnh viễn", `Xóa ${selectedMediaIds.size} tệp khỏi Thư viện Media và gỡ khỏi mọi album?`, async () => {
        const ids = [...selectedMediaIds];
        const data = getAppData();
        data.media = data.media.filter((item) => !selectedMediaIds.has(item.id));
        data.albums.forEach((album) => {
          album.media_ids = (album.media_ids || []).filter((mediaId) => !selectedMediaIds.has(mediaId));
          if (ids.includes(album.cover_media_id)) album.cover_media_id = null;
        });
        saveAppData(data);
        for (const id of ids) {
          await deleteMediaFile(id);
          blobUrlCache.delete(id);
        }
        selectedMediaIds.clear();
        showToast("Đã xóa các tệp đã chọn.", "info");
        renderCmsDashboard();
        renderPortfolio();
        if (activeAlbumId) openAlbumDetail(activeAlbumId, true);
      });
    });
  }

  const addAlbumBtn = document.getElementById("adminAddAlbumBtn");
  if (addAlbumBtn) addAlbumBtn.addEventListener("click", () => openAlbumEditModal(null));
  const albumForm = document.getElementById("albumEditForm");
  if (albumForm) albumForm.addEventListener("submit", saveAlbumFromForm);
  const visSelect = document.getElementById("albumFormVisibility");
  if (visSelect) {
    visSelect.addEventListener("change", () => {
      updatePermissionUI(
        visSelect,
        document.getElementById("albumPasswordGroup"),
        document.getElementById("permissionExplanation")
      );
    });
  }
  const coverInput = document.getElementById("albumCoverFileInput");
  if (coverInput) {
    coverInput.addEventListener("change", () => {
      const file = coverInput.files && coverInput.files[0];
      coverInput.value = "";
      if (!file) return;
      const check = classifyUploadFile(file);
      if (!check.ok || check.type !== "image") {
        showToast(check.ok ? "Ảnh bìa chỉ nhận JPG, PNG, WEBP hoặc GIF." : check.message, "error");
        return;
      }
      pendingAlbumCover = { id: "cover-" + Date.now(), file };
      const preview = document.getElementById("albumCoverPreview");
      if (preview) {
        preview.src = URL.createObjectURL(file);
        preview.classList.remove("hidden");
      }
      document.getElementById("albumFormCover").value = "";
    });
  }
  bindPasswordToggle("toggleAlbumFormPassBtn", "albumFormPassword");
  bindPasswordToggle("toggleQuickPermPassBtn", "quickPermPasswordInput");

  const quickSelect = document.getElementById("quickPermSelect");
  const quickBox = document.getElementById("quickPermPasswordBox");
  if (quickSelect && quickBox) {
    quickSelect.addEventListener("change", () => {
      quickBox.classList.toggle("hidden", quickSelect.value !== "PASSWORD_PROTECTED");
    });
  }
  const quickForm = document.getElementById("quickPermissionForm");
  if (quickForm) {
    quickForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const albumId = document.getElementById("quickPermAlbumId").value;
      const data = getAppData();
      const album = data.albums.find((item) => item.id === albumId);
      if (!album) return;
      const access = applyAlbumAccess(album, quickSelect.value, document.getElementById("quickPermPasswordInput").value);
      if (!access.ok) {
        showToast(access.message, "error");
        return;
      }
      album.updated_at = new Date().toISOString();
      saveAppData(data);
      document.getElementById("albumPermissionModal").classList.add("hidden");
      logActivity(`Đổi quyền album: ${album.title}`, "Albums");
      showToast("Đã cập nhật quyền truy cập.", "success");
      renderCmsDashboard();
      renderPortfolio();
      if (activeAlbumId === album.id) openAlbumDetail(album.id, true);
    });
  }

  const backBtn = document.getElementById("backToAlbumsListBtn");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      document.getElementById("albumDetailView").classList.add("hidden");
      document.getElementById("albumsListView").classList.remove("hidden");
      renderUpgradedAlbums();
    });
  }
  const editInfoBtn = document.getElementById("albumDetailEditInfoBtn");
  if (editInfoBtn) editInfoBtn.addEventListener("click", () => activeAlbumId && openAlbumEditModal(activeAlbumId));
  const changePermBtn = document.getElementById("albumDetailChangePermBtn");
  if (changePermBtn) changePermBtn.addEventListener("click", () => activeAlbumId && openQuickPermissionModal(activeAlbumId));

  const albumInput = document.getElementById("albumDetailFileInput");
  const albumUploadBtn = document.getElementById("albumDetailUploadBtn");
  if (albumUploadBtn && albumInput) albumUploadBtn.addEventListener("click", () => albumInput.click());
  if (albumInput) {
    albumInput.addEventListener("change", () => {
      handleMediaUpload(albumInput.files, activeAlbumId);
      albumInput.value = "";
    });
  }
  const albumDrop = document.getElementById("albumDetailDropzone");
  if (albumDrop) {
    albumDrop.addEventListener("click", () => albumInput && albumInput.click());
    bindFileDrop(albumDrop, (files) => handleMediaUpload(files, activeAlbumId));
  }
  const pickBtn = document.getElementById("albumDetailPickMediaBtn");
  if (pickBtn) pickBtn.addEventListener("click", openAlbumMediaPicker);
  const downloadAllBtn = document.getElementById("albumDetailDownloadAllBtn");
  if (downloadAllBtn) downloadAllBtn.addEventListener("click", () => activeAlbumId && downloadAlbumZip(activeAlbumId));

  const selectAllAlbum = document.getElementById("selectAllAlbumMediaCheck");
  if (selectAllAlbum) {
    selectAllAlbum.addEventListener("change", () => {
      if (selectAllAlbum.checked) lastAlbumMediaIds.forEach((id) => selectedAlbumMediaIds.add(id));
      else selectedAlbumMediaIds.clear();
      const data = getAppData();
      const album = data.albums.find((item) => item.id === activeAlbumId);
      if (album) renderAlbumDetailMediaGrid(album);
    });
  }
  const albumDownloadSelected = document.getElementById("albumDownloadSelectedBtn");
  if (albumDownloadSelected) {
    albumDownloadSelected.addEventListener("click", () => {
      const data = getAppData();
      const items = data.media.filter((item) => selectedAlbumMediaIds.has(item.id));
      const album = data.albums.find((item) => item.id === activeAlbumId);
      downloadMediaAsZip(items, `${(album && album.title) || "album"}-da-chon.zip`);
    });
  }
  const albumRemoveSelected = document.getElementById("albumRemoveSelectedBtn");
  if (albumRemoveSelected) {
    albumRemoveSelected.addEventListener("click", () => {
      if (!activeAlbumId || selectedAlbumMediaIds.size === 0) return;
      showCustomConfirm("Gỡ tệp khỏi album", `Gỡ ${selectedAlbumMediaIds.size} tệp khỏi album? Tệp gốc vẫn nằm trong Thư viện Media.`, () => {
        const data = getAppData();
        const album = data.albums.find((item) => item.id === activeAlbumId);
        if (!album) return;
        album.media_ids = (album.media_ids || []).filter((id) => !selectedAlbumMediaIds.has(id));
        album.updated_at = new Date().toISOString();
        saveAppData(data);
        selectedAlbumMediaIds.clear();
        showToast("Đã gỡ các tệp đã chọn khỏi album.", "info");
        openAlbumDetail(album.id, true);
        renderPortfolio();
      });
    });
  }

  const confirmPick = document.getElementById("confirmAddMediaToAlbumBtn");
  if (confirmPick) {
    confirmPick.addEventListener("click", () => {
      if (!activeAlbumId || pickerSelectedMediaIds.size === 0) {
        showToast("Hãy chọn ít nhất một tệp.", "info");
        return;
      }
      const data = getAppData();
      const album = data.albums.find((item) => item.id === activeAlbumId);
      if (!album) return;
      if (!album.media_ids) album.media_ids = [];
      let added = 0;
      pickerSelectedMediaIds.forEach((id) => {
        if (!album.media_ids.includes(id)) {
          album.media_ids.push(id);
          added += 1;
        }
      });
      album.updated_at = new Date().toISOString();
      saveAppData(data);
      pickerSelectedMediaIds.clear();
      document.getElementById("albumMediaPickerModal").classList.add("hidden");
      showToast(added ? `Đã thêm ${added} tệp vào album.` : "Các tệp đã có trong album.", added ? "success" : "info");
      openAlbumDetail(album.id, true);
      renderPortfolio();
    });
  }
  const pickerSearch = document.getElementById("pickerSearchInput");
  if (pickerSearch) {
    pickerSearch.addEventListener("input", () => {
      const data = getAppData();
      const album = data.albums.find((item) => item.id === activeAlbumId);
      if (album) renderPickerMediaGrid(album);
    });
  }
  const captionForm = document.getElementById("mediaCaptionForm");
  if (captionForm) {
    captionForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const mediaId = document.getElementById("captionMediaId").value;
      const caption = document.getElementById("captionInput").value.trim();
      const data = getAppData();
      const item = data.media.find((media) => media.id === mediaId);
      if (!item) return;
      item.caption = caption;
      saveAppData(data);
      document.getElementById("mediaCaptionModal").classList.add("hidden");
      showToast("Đã lưu chú thích.", "success");
      renderCmsDashboard();
      renderPortfolio();
      if (activeAlbumId && !document.getElementById("albumDetailView").classList.contains("hidden")) {
        openAlbumDetail(activeAlbumId, true);
      }
    });
  }
  const pdfDownload = document.getElementById("pdfPreviewDownloadBtn");
  if (pdfDownload) {
    pdfDownload.addEventListener("click", () => {
      if (pdfPreviewMediaId) handleMediaDownload(pdfPreviewMediaId);
    });
  }
}
