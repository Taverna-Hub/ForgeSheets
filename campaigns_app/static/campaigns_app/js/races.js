// Adicionar raça
const openAddRaceModalBtn = document.querySelector(".addRace");
const cancelAddRaceModalBtn = document.querySelector("#cancelAddRace");
const closeAddRaceModalBtn = document.querySelector(".closeAddModal");
const addRaceModal = document.querySelector(".ModalCreateRace");

function handleOpenAddRaceModal() {
    addRaceModal.style.display = "flex";
}

function handleCloseAddRaceModal() {
    addRaceModal.style.display = "none";
}

openAddRaceModalBtn?.addEventListener("click", handleOpenAddRaceModal);
cancelAddRaceModalBtn?.addEventListener("click", handleCloseAddRaceModal);
closeAddRaceModalBtn?.addEventListener("click", handleCloseAddRaceModal);


// Editar raça
const editButtons = document.querySelectorAll('.editRace');
const editModal = document.querySelector('#editRaceModal');
const closeEditModalButton = document.querySelector('.closeEditModal');
const cancelEditButton = document.querySelector('#cancelEdit');

editButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        const raceId = this.dataset.id;
        const raceName = this.dataset.name;
        const strengthBuff = this.dataset.strength;
        const intelligenceBuff = this.dataset.intelligence;
        const wisdomBuff = this.dataset.wisdom;
        const charismaBuff = this.dataset.charisma;
        const constitutionBuff = this.dataset.constitution;
        const speedBuff = this.dataset.speed;

        document.getElementById('edit_race_id').value = raceId;
        document.getElementById('edit_name').value = raceName;
        document.getElementById('edit_strength_buff').value = strengthBuff;
        document.getElementById('edit_intelligence_buff').value = intelligenceBuff;
        document.getElementById('edit_wisdom_buff').value = wisdomBuff;
        document.getElementById('edit_charisma_buff').value = charismaBuff;
        document.getElementById('edit_constitution_buff').value = constitutionBuff;
        document.getElementById('edit_speed_buff').value = speedBuff;

        editModal.style.display = 'flex';
    });
});

closeEditModalButton?.addEventListener('click', function() {
    editModal.style.display = 'none';
});
cancelEditButton?.addEventListener('click', function() {
    editModal.style.display = 'none';
});

// Deletar raça
const deleteButtons = document.querySelectorAll('.delete_race_button');
const deleteModal = document.querySelector('#deleteRaceModal');
const closeDeleteModalButton = document.querySelector('.closeDeleteModal');
const cancelDeleteButton = document.querySelector('#cancelDelete');
const deleteFormButton = document.querySelector('.delete_race');

deleteButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        const raceId = this.dataset.id;
        document.querySelector('#delete_race_id').value = raceId;
        deleteModal.style.display = 'flex';
    });
});

closeDeleteModalButton?.addEventListener('click', function() {
    deleteModal.style.display = 'none';
});

cancelDeleteButton?.addEventListener('click', function() {
    deleteModal.style.display = 'none';
});


window.addEventListener('click', function(event) {
    if (event.target === editModal) {
        editModal.style.display = 'none';
    }
    if (event.target === deleteModal) {
        deleteModal.style.display = 'none';
    }
});
