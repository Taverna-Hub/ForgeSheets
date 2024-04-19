const imageLink = document.querySelector('.image');
let regex = '^(?:https?|ftp):\/\/(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+(?:\/[^\s?]*)?(?:\?[^\s]*)?$';

const addImageBtn = document.querySelector('#addImageBtn');
const closeImageBtn = document.querySelector('#closeImageBtn');
const openImageModal = document.querySelector('.openImageBtn');
const imageModal = document.querySelector('.imageModal');

const chooseSheetModal = document.querySelector('.chooseSheetModal');
const createSheetBtn = document.querySelector('.createSheet');
const closeChooseSheetModalBtn = document.querySelector('#closeChooseSheet');

const addImageDiv = document.querySelector('.add_image_div');

let imageCount = 0;

function closeImageModal() {
  const error = document.querySelector('.imageInput').lastElementChild;
  if (error.tagName === 'SPAN') {
    document.querySelector('.imageInput').removeChild(error);
  }
  imageModal.style.display = 'none';
}

function handleOpenImageModal() {
  imageModal.style.display = 'flex';
}

function handleErrorImage(message) {
  const error =       
  `
      <span> 
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-octagon-alert"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
        ${message}
      </span>
    `
    const node = new DOMParser().parseFromString(error, 'text/html').body.firstElementChild
    document.querySelector('.imageInput').appendChild(node);
}


function addImageToSheet() {
  const contextImage = document.querySelector('.imageInputCircle');

  let image_test = imageLink.value;
  const imageSrc = imageLink.value ? imageLink.value : contextImage.value;

  if (!regex.image_test) {
    handleErrorImage('Insira uma URL válida', 'imageInput')
  }

  const image = `
    <button type="button" onclick="handleOpenImageModal()">
      <img src="${imageSrc}" alt="Imagem" class="selectedImage">
    </button>
  ` 

  const node = new DOMParser().parseFromString(image, 'text/html').body.firstElementChild

  if (imageCount === 0) {
    addImageDiv.removeChild(openImageModal);
  }

  if (imageCount !== 0) {
    addImageDiv.removeChild(addImageDiv.lastElementChild);
  }

  addImageDiv.appendChild(node);
  document.querySelector('.imageInputCircle').value = image_test;
  imageCount += 1;
  closeImageModal();
}

openImageModal.addEventListener('click', () => handleOpenImageModal());
addImageBtn?.addEventListener('click', () => addImageToSheet());
closeImageBtn?.addEventListener('click', () => closeImageModal());