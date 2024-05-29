const campaignCode = document.querySelector(".code")
const copyCodeBtn = document.querySelector(".copyCode")
const animationContainer = document.querySelector(".lottieAnimation")

const animationItem = bodymovin.loadAnimation({
  wrapper: animationContainer,
  animType: "svg",
  loop: false,
  autoplay: false,
  path: "https://lottie.host/6175c2bc-23e9-48a3-a5f8-82ac2427f731/atQ5qM9sIA.json"
})

function handleCopyCodeToClipboard() {
  navigator.clipboard.writeText(campaignCode.textContent);
  animationContainer.classList.remove("hide");
  animationItem.setSpeed(2);
  animationItem.goToAndPlay(0, true);
}

copyCodeBtn.addEventListener("click", () => handleCopyCodeToClipboard())
animationItem.addEventListener("complete", () => {
  animationContainer.classList.add("hide");
})

document.addEventListener('DOMContentLoaded', function() {
  const menuIcon = document.getElementById('menu');
  const dropdownMenu = document.querySelector('.dropdown-menu');

  menuIcon.addEventListener('click', function(event) {
      event.stopPropagation();
      dropdownMenu.classList.toggle('show');
  });
})

const editTitle = document.getElementById('edit-title');
const modalTitle = document.getElementById('modal-title');

editTitle.addEventListener('click', function () {
  if (modalTitle.style.display === 'block') {
    modalTitle.style.display = 'none';
  } else {
    modalTitle.style.display = 'block';
  }
});

const editDescription = document.getElementById('edit-description');
const modalDescription = document.getElementById('modal-description');

editDescription.addEventListener('click', function () {
  if (modalDescription.style.display === 'block') {
    modalDescription.style.display = 'none';
  } else {
    modalDescription.style.display = 'block';
  }
});

const editImage = document.getElementById('edit-image');
const modalImage = document.getElementById('modal-image');

editImage.addEventListener('click', function () {
  if (modalImage.style.display === 'block') {
    modalImage.style.display = 'none';
  } else {
    modalImage.style.display = 'block';
  }
});

const editDelete = document.getElementById('edit-delete');
const modalDelete = document.getElementById('modal-delete');

editDelete.addEventListener('click', function () {
  if (modalDelete.style.display === 'block') {
    modalDelete.style.display = 'none';
  } else {
    modalDelete.style.display = 'block';
  }
});

document.addEventListener("DOMContentLoaded", function() {
  var closeButtons = document.querySelectorAll(".close");

  closeButtons.forEach(function(button) {
      button.addEventListener("click", function() {
          var modalId = button.getAttribute("data-modal");
          var modal = document.getElementById(modalId);
          modal.style.display = "none";
      });
  });
});

const titleError = document.getElementById('titleError');

if (titleError) {
  if (modalTitle.style.display === 'block') {
    modalTitle.style.display = 'none';
  } else {
    modalTitle.style.display = 'block';
  }
}

const imageError = document.getElementById('imageError');

if (imageError) {
  if (modalImage.style.display === 'block') {
    modalImage.style.display = 'none';
  } else {
    modalImage.style.display = 'block';
  }
}

const descriptionError = document.getElementById('descriptionError');

if (descriptionError) {
  if (modalDescription.style.display === 'block') {
    modalDescription.style.display = 'none';
  } else {
    modalDescription.style.display = 'block';
  }
}