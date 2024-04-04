const loginPage = document.querySelector("#login");
const registerPage = document.querySelector("#register");
const registerAnchor = document.querySelector('.registerAnchor');
const loginAnchor = document.querySelector('.loginAnchor');

loginAnchor.addEventListener('click', () => {
  loginPage.style.visibility = "visible";
  registerPage.style.visibility = "hidden";
  showToast();
});

registerAnchor.addEventListener('click', () => {
  registerPage.style.visibility = "visible";
  loginPage.style.visibility = "hidden";
});

