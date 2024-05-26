//Modal de criar ficha
const chooseSheetModal = document.querySelector('.chooseSheetModal');
const createSheetBtn = document.querySelector('.createSheet');
const closeChooseSheetModalBtn = document.querySelector('#closeChooseSheet');

function openChooseSheetModal() {
  chooseSheetModal.style.display = "flex";
}

function closeChooseSheetModal() {
  chooseSheetModal.style.display = "none";
}
