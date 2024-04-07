const image = document.querySelector('input[name="imageLink"]');

const addImagetBtn = document.querySelector('#addImagetBtn');
const closeImagetBtn = document.querySelector('#closeImagetBtn');
const openImagetModal = document.querySelector('.openImagetBtn');
const imagetModal = document.querySelector('.imageModal');

function closeImageModal() {
  imagetModal.style.display = 'none';
}

function handleError(message, classImage) {
  const error =       
  `
    <span> 
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-octagon-alert"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
      ${message}
    </span>
  `
  const node = new DOMParser().parseFromString(error, 'text/html').body.firstElementChild
  document.querySelector(`.${classImage}`).appendChild(node)
}

function addImageToSheet() {
  const imagePath = imageInput.value;
}

openImagetModal.addEventListener('click', () => {
  imagetModal.style.display = 'flex';
});
addImagetBtn.addEventListener('click', () => addImageToSheet());
closeImagetBtn.addEventListener('click', () => closeImageModal());