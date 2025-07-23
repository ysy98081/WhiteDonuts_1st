const toggleBtn = document.getElementById('toggleSidebar');
const sidebar = document.getElementById('sidebarMenu');

toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});
