lucide.createIcons();

const menuHamburguerBtn = document.querySelector('#menuHamburguer');

function toggleMenuHamburguer() {
  const nav = document.querySelector('#sidebarNav');
  nav.classList.toggle('active');
  menuHamburguerBtn.classList.toggle('is-active')
}

menuHamburguerBtn.addEventListener('click', () => toggleMenuHamburguer());
