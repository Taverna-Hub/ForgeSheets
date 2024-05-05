//Modal deletar ficha
const modal = document.querySelector('.deleteSheetModal');
const cancelDeleteBtn = document.querySelector('.cancel')
const deleteBtn = document.querySelector('.delete')
const deleteSheetBtn = document.querySelectorAll('.deleteSheet');
const closedeleteSheetModalBtnX = document.querySelector('#closeDeleteSheet');
const form = document.querySelector('#formDeleteSheet')
let deleteUrl;

function opendeleteSheetModal() {
  modal.style.display = "flex";
}

function closedeleteSheetModal() {
  modal.style.display = "none";
}

closedeleteSheetModalBtnX?.addEventListener('click', () => closedeleteSheetModal());

deleteSheetBtn.forEach(button => {
  button?.addEventListener('click', () => {

    opendeleteSheetModal();
    
    deleteUrl = button.getAttribute('data-url');
  })
})

deleteBtn?.addEventListener('click', () => {
  form.action = deleteUrl;
})

cancelDeleteBtn?.addEventListener('click', () => {
  closedeleteSheetModal();
})