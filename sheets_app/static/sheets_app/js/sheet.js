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

closeChooseSheetModalBtn?.addEventListener('click', () => closeChooseSheetModal());
createSheetBtn?.addEventListener('click', () => openChooseSheetModal());

//Modal de deletar ficha
const deleteSheetModal = document.querySelector('.deleteSheetModal');
const deleteSheetBtn = document.querySelectorAll('.deleteSheet');
const closedeleteSheetModalBtn = document.querySelector('#closeDeleteSheet');


function opendeleteSheetModal() {
  deleteSheetModal.style.display = "flex";
}

function closedeleteSheetModal() {
  deleteSheetModal.style.display = "none";
}

closedeleteSheetModalBtn?.addEventListener('click', () => closedeleteSheetModal());
deleteSheetBtn.forEach(button => {
  button?.addEventListener('click', () => opendeleteSheetModal());
})