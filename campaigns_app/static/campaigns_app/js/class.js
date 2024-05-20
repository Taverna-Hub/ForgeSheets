const openAddClassModalBtn = document.querySelector(".addClass");
const cancelAddClassModalBtn = document.querySelector("#cancelAddClassModal");
// const closeAddClassModalBtn = document.querySelector("");

const classModal = document.querySelector(".addClassModal");

function handleOpenAddClassModal() {
  classModal.style.display = "flex";
}

function handleCloseAddClassModal() {
  classModal.style.display = "none";
}

openAddClassModalBtn.addEventListener("click", () => handleOpenAddClassModal());
cancelAddClassModalBtn.addEventListener("click", () => handleCloseAddClassModal());