const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownContent = document.querySelector('.dropdown-content');

dropdownBtn.addEventListener('mouseleave', () => {
  dropdownContent.classList.remove('show');
});