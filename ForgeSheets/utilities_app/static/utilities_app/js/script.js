const loginPage = document.querySelector("#login");
const registerPage = document.querySelector("#register");
const registerAnchor = document.querySelector('.registerAnchor');
const loginAnchor = document.querySelector('.loginAnchor');

function showToast(message = "Cu") {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
   }).showToast()
}

loginAnchor.addEventListener('click', () => {
  loginPage.style.visibility = "visible";
  registerPage.style.visibility = "hidden";
  showToast();
});

registerAnchor.addEventListener('click', () => {
  registerPage.style.visibility = "visible";
  loginPage.style.visibility = "hidden";
});

