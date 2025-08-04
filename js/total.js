const toggleBtn = document.getElementById('toggleSidebar');
const closeBtn = document.getElementById('closeSidebarBtn');
const sidebar = document.getElementById('sidebarMenu');
const overlay = document.getElementById('sidebarOverlay');

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const innersearchInput = document.getElementById("search-input-inner");
const innersearchButton = document.getElementById("search-button-inner");

// 사이드바 열기
toggleBtn.addEventListener('click', () => {
  sidebar.classList.add('active');
  overlay.classList.add('active');
});

// 사이드바 닫기 (사이드바 내 버튼)
closeBtn.addEventListener('click', () => {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
});

// 오버레이 클릭 시 닫기
overlay.addEventListener('click', () => {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
});

document.querySelectorAll(".sidebar-slide-item").forEach(li => {
  li.addEventListener("click", () => {
    const link = li.querySelector("a");
    if (link) link.click();
  });
});

document.querySelectorAll(".uploaderlink").forEach(li => {
  li.addEventListener("click", (e) => {
    e.preventDefault(); // a 태그 기본 동작 방지
    const link = li.querySelector("a");
    const uploader = link?.getAttribute("title");
    if (link && uploader) {
      const href = `html/subscribe.html?uploader=${encodeURIComponent(uploader)}`;
      window.location.href = href;
    }
  });
});

document.querySelectorAll(".inneruploaderlink").forEach(li => {
  li.addEventListener("click", (e) => {
    e.preventDefault(); // a 태그 기본 동작 방지
    const link = li.querySelector("a");
    const uploader = link?.getAttribute("title");
    if (link && uploader) {
      const href = `subscribe.html?uploader=${encodeURIComponent(uploader)}`;
      window.location.href = href;
    }
  });
});

if (searchButton && searchInput) {
  searchButton.addEventListener("click", () => {
    const keyword = searchInput.value.trim();
    if (keyword) {
      window.location.href = `index.html?search=${encodeURIComponent(keyword)}`;
    }
  });

  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      searchButton.click();
    }
  });
}

if (innersearchButton && innersearchInput) {
  innersearchButton.addEventListener("click", () => {
    const keyword = innersearchInput.value.trim();
    if (keyword) {
      window.location.href = `../index.html?search=${encodeURIComponent(keyword)}`;
    }
  });

  innersearchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      innersearchButton.click();
    }
  });
}

