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

    const editButtons = document.querySelectorAll('.conseditClass');
    const editModal = document.getElementById('editClassModal');
    const closeEditModalButton = document.getElementById('closeEditModal');
    const cancelEditButton = document.getElementById('cancelEdit');

editButtons.forEach(button => {
    button.addEventListener('click', function(event){
    const classId = this.dataset.id;
    const className = this.dataset.name;
    const classRole = this.dataset.role;

    document.getElementById('edit_class_id').value = classId;
    document.getElementById('edit_name').value = className;
    document.getElementById('edit_role').value = classRole;

    editModal.style.display = 'flex';
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
openAddClassModalBtn.addEventListener("click", () => handleOpenAddClassModal());
cancelAddClassModalBtn.addEventListener("click", () => handleCloseAddClassModal());