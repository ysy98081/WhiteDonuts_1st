const toggleBtn = document.getElementById('toggleSidebar');
const sidebar = document.getElementById('sidebarMenu');
const overlay = document.getElementById('overlay');

toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('active');
  overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
});
