const loginPage = document.querySelector("#login");
const registerPage = document.querySelector("#register");
const registerAnchor = document.querySelector('.registerAnchor');
const loginAnchor = document.querySelector('.loginAnchor');
const login = document.querySelector("#loginzinho");
const register = document.querySelector("#cadastrinho");
const backLogin = document.querySelector("#backLogin");
const backRegister = document.querySelector("#backRegister");
const register1 = document.querySelector("#register1");

// loginAnchor.addEventListener('click', () => {
//   loginPage.style.visibility = "visible";
//   registerPage.style.visibility = "hidden";
//   showToast();
// });

// registerAnchor.addEventListener('click', () => {
//   registerPage.style.visibility = "visible";
//   loginPage.style.visibility = "hidden";
// });

if (register1) {
  // registerPage.classList.add('active');
  // loginPage.classList.remove('active');
  // register.classList.add('active');
  // login.classList.remove('active');
  registerPage.style.visibility = "visible";
  loginPage.style.visibility = "hidden";
  // backRegister.classList.add('active');
  // backLogin.classList.remove('active');
}

loginAnchor.addEventListener('click', () => {
  loginPage.classList.add('active');
  registerPage.classList.remove('active');
  login.classList.add('active');
  register.classList.remove('active');
  loginPage.style.visibility = "visible";
  registerPage.style.visibility = "hidden";
  backLogin.classList.add('active');
  backRegister.classList.remove('active');
  showToast();
});

registerAnchor.addEventListener('click', () => {
  registerPage.classList.add('active');
  loginPage.classList.remove('active');
  register.classList.add('active');
  login.classList.remove('active');
  registerPage.style.visibility = "visible";
  loginPage.style.visibility = "hidden";
  backRegister.classList.add('active');
  backLogin.classList.remove('active');
});