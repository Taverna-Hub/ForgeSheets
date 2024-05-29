//Modal de criar ficha / página de "Fichas"
const chooseSheetModal = document.querySelector('.chooseSheetModal');
const createSheetBtn = document.querySelector('.createSheet');
const closeChooseSheetModalBtn = document.querySelector('#closeChooseSheet');
const sheets = document.querySelectorAll('.sheetCard')

sheets.forEach((sheet) => {
  const menuBtn = sheet.firstElementChild;
  const dropdownMenu = sheet.lastElementChild.lastElementChild;

  menuBtn.addEventListener("click", () => {
    dropdownMenu.classList.toggle("show");
  })
})

function openChooseSheetModal() {
  chooseSheetModal.style.display = "flex";
}

function closeChooseSheetModal() {
  chooseSheetModal.style.display = "none";
}

closeChooseSheetModalBtn?.addEventListener('click', () => closeChooseSheetModal());
createSheetBtn?.addEventListener('click', () => openChooseSheetModal());