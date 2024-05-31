//Modal deletar ficha
const modal = document.querySelector('.deleteSheetModal');
const cancelDeleteBtn = document.querySelector('.cancel')
const deleteBtn = document.querySelector('.delete')
const deleteSheetBtn = document.querySelectorAll('.deleteSheet');
const form = document.querySelector('#formDeleteSheet')
let deleteUrl;

function openDeleteSheetModal() {
  modal.style.display = "flex";
}

function closeDeleteSheetModal() {
  modal.style.display = "none";
}


deleteSheetBtn.forEach(button => {
  button?.addEventListener('click', () => {

    openDeleteSheetModal();
    
    deleteUrl = button.getAttribute('data-url');
  })
})

deleteBtn?.addEventListener('click', () => {
  form.action = deleteUrl;
})

cancelDeleteBtn?.addEventListener('click', () => {
  closeDeleteSheetModal();
})