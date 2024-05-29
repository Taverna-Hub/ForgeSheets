document.addEventListener('DOMContentLoaded', function() {
    const openAddRaceModalBtn = document.querySelector(".addRace");
    const cancelAddRaceModalBtn = document.querySelector("#cancelAddRace");
    const addRaceModal = document.querySelector(".ModalCreateRace");

    function handleOpenAddRaceModal() {
        addRaceModal.style.display = "flex";
    }

    function handleCloseAddRaceModal() {
        addRaceModal.style.display = "none";
    }

    if (openAddRaceModalBtn) {
        openAddRaceModalBtn.addEventListener("click", handleOpenAddRaceModal);
    }

    if (cancelAddRaceModalBtn) {
        cancelAddRaceModalBtn.addEventListener("click", handleCloseAddRaceModal);
    }

   
    const editButtons = document.querySelectorAll('.editRace');
    const editModal = document.querySelector('.editRaceModal');
    const closeEditModalButton = document.getElementById('closeEditModal');
    const cancelEditButton = document.getElementById('cancelEdit');
    const editForm = document.getElementById('editRaceForm');

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

            editmodal.style.display = 'flex';
        });
    });

    if (closeEditModalButton) {
        closeEditModalButton.addEventListener('click', function() {
            editModal.style.display = 'none';
   
        });
    }

    if (cancelEditButton) {
        cancelEditButton.addEventListener('click', function() {
            editModal.style.display = 'none';
        });
    }

    const deleteButtons = document.querySelectorAll('.deleteRace');
    const deleteModal = document.querySelector('.deleteRaceModal');
    const closeDeleteModalButton = document.querySelector('.deleteRaceModal .close');
    const cancelDeleteButton = document.getElementById('cancel');
    const deleteFormButton = document.querySelector('.delete_race');

    deleteButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const raceId = this.dataset.id;
            deleteFormButton.dataset.id = raceId;
            deleteModal.style.display = 'flex';
        });
    });

    if (closeDeleteModalButton) {
        closeDeleteModalButton.addEventListener('click', function() {
            deleteModal.style.display = 'none';
        });
    }

    if (cancelDeleteButton) {
        cancelDeleteButton.addEventListener('click', function() {
            deleteModal.style.display = 'none';
        });
    }

    deleteFormButton.addEventListener('click', function() {
        const raceId = this.dataset.id;
        console.log('Delete race with ID:', raceId);
        deleteModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === editModal) {
            editModal.style.display = 'none';
        }
    });
});
