const openAddRaceModalBtn = document.querySelector(".addRace")
const cancelRaceModalBtn = document.querySelector("#cancel")

const addRaceModal = document.querySelector(".ModalCreateRace")

function handleOpenAddRaceModal () {
    addRaceModal.style.display = "flex"
}

function handleCloseAddRaceModal (){
    addRaceModal.style.display = "none"
}

openAddRaceModalBtn.addEventListener("click", () => handleOpenAddRaceModal());
cancelRaceModalBtn.addEventListener("click", () => handleCloseAddRaceModal());