const toggleBtn = document.getElementById('toggleSidebar');
const closeBtn = document.getElementById('closeSidebarBtn');
const sidebar = document.getElementById('sidebarMenu');
const overlay = document.getElementById('sidebarOverlay');

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
