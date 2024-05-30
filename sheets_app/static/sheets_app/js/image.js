const imageLink = document.querySelector('.image');
let regex = /https?:\/\/\S+?\.(?:png|jpe?g|gif|bmp|tiff|webp|svg|ico)(?:\?\S*)?(?:#\S*)?/i;

const addImageBtn = document.querySelector('#addImageBtn');
const closeImageBtn = document.querySelector('#closeImageBtn');
const openImageModal = document.querySelector('.openImageBtn');
const imageModal = document.querySelector('.imageModal');

const chooseSheetModal = document.querySelector('.chooseSheetModal');
const createSheetBtn = document.querySelector('.createSheet');
const closeChooseSheetModalBtn = document.querySelector('#closeChooseSheet');

const addImageDiv = document.querySelector('.add_image_div');

const healthPoint = document.querySelector('#healthPoint')

let imageCount = 0;

function submitForm() {
  const editSheetForm = document.querySelector('#form-edit-sheet')
  if (editSheetForm) {
    editSheetForm.submit();
  }
}

function handleCheckImage(url) {
  const proxyUrl = `https://crossorigin.me/${url}`;

  fetch(proxyUrl, { method: 'HEAD' })
    .then(response => {
      if (response.ok) {
        console.log("Image exists");
      } else {
        console.log("Image doesn't exist");
      }
    })
    .catch(error => {
      console.error("Error checking image:", error);
    });
}

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

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', function(event) {
      
      let targetElement = event.target.closest('.openImageBtn');
      if (targetElement) {
          handleOpenImageModal();
          clearImageInput();
      }
  });
});

function clearImageInput() {
  const imageInput = document.querySelector('.image'); 
  if (imageInput) {
      imageInput.value = ''; 
  }
}

function handleErrorImage(message) {
  const imageInput = document.querySelector('.imageInput');
  const existingError = imageInput.children[2]

  const error =       
  `
      <span> 
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-octagon-alert"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
        ${message}
      </span>
    `
    if (existingError && existingError.tagName === 'SPAN' && existingError.value === message) {
      return
    } else if (existingError && existingError.tagName === 'SPAN' && existingError.value !== message) {
      imageInput.removeChild(existingError)
    }
    const node = new DOMParser().parseFromString(error, 'text/html').body.firstElementChild
    imageInput.appendChild(node)
}

function addImageToSheet() {
  const contextImage = document.querySelector('.imageInputCircle');

  let modalImageValue = imageLink.value;
  const imageSrc = imageLink.value ? imageLink.value : contextImage.value;

  if (!regex.test(imageSrc)) {
      if (((!imageSrc.includes("pbs.twimg.com")) && (!imageSrc.includes("avatars.githubusercontent.com")))){
        handleErrorImage('Insira uma URL válida', 'imageInput')
        return
      }

  }

  // if (handleCheckImage(modalImageValue)) {
  //   handleErrorImage('Insira uma URL válida', 'imageInput')
  //   return
  // }

  const image = `
    <button type="button" id="openImageBtn" class="openImageBtn">
      <img src="${imageSrc}" alt="Imagem" class="selectedImage">

      ${healthPoint?.value === "0" ? `<p style="padding-top: 6px; font-weight: 600;">Você morreu!</p>` : ''}
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
  document.querySelector('.imageInputCircle').value = modalImageValue;
  if (healthPoint?.value === "0") {
    document.querySelector('.selectedImage').style.filter = 'grayscale(1)';
  }
  imageCount += 1;
  closeImageModal();
  submitForm()
}


openImageModal.addEventListener('click', () => handleOpenImageModal());
addImageBtn?.addEventListener('click', () => addImageToSheet());
closeImageBtn?.addEventListener('click', () => closeImageModal());