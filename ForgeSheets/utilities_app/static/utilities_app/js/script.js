const loginPage = document.querySelector("#login");
const registerPage = document.querySelector("#register");
const registerAnchor = document.querySelector('.registerAnchor');
const loginAnchor = document.querySelector('.loginAnchor');
const login = document.querySelector("#loginzinho");
const register = document.querySelector("#cadastrinho");

// loginAnchor.addEventListener('click', () => {
//   loginPage.style.visibility = "visible";
//   registerPage.style.visibility = "hidden";
//   showToast();
// });

// registerAnchor.addEventListener('click', () => {
//   registerPage.style.visibility = "visible";
//   loginPage.style.visibility = "hidden";
// });

loginAnchor.addEventListener('click', () => {
  login.classList.remove('deactive');
  login.classList.add('active');
  register.classList.remove('active');
  register.classList.add('deactive');
  loginPage.style.visibility = "visible";
  registerPage.style.visibility = "hidden";
  showToast();
});

registerAnchor.addEventListener('click', () => {
  register.classList.remove('deactive');
  register.classList.add('active');
  login.classList.remove('active');
  login.classList.add('deactive');
  registerPage.style.visibility = "visible";
  loginPage.style.visibility = "hidden";
});


