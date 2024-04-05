lucide.createIcons();

const menuHamburguerBtn = document.querySelector('#menuHamburguer');

function toggleMenuHamburguer() {
  const nav = document.querySelector('#sidebarNav');
  nav.classList.toggle('active');
}

menuHamburguer.addEventListener('click', () => toggleMenuHamburguer());
