
    const openAddRaceModalBtn = document.querySelector(".addRace");
    const cancelRaceModalBtn = document.querySelector("#cancel");
    const addRaceModal = document.querySelector(".ModalCreateRace");

    function handleOpenAddRaceModal() {
        addRaceModal.style.display = "flex";
    }

    function handleCloseAddRaceModal() {
        addRaceModal.style.display = "none";
    }

    openAddRaceModalBtn.addEventListener("click", () => handleOpenAddRaceModal());
    cancelRaceModalBtn.addEventListener("click", () => handleCloseAddRaceModal());

    const editButtons = document.querySelectorAll('.editRace');
    const modal = document.getElementById('editRaceModal');
    const closeModalButton = document.getElementById('closeEditModal');
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

            modal.style.display = 'block';
        });
    });

    closeModalButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    cancelEditButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
