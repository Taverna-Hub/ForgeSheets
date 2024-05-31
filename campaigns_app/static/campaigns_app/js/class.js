// Adicionar classe
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

// Editar classe
const editButtons = document.querySelectorAll('.editClass');
const editModal = document.querySelector('.editClassModal');
const cancelEditButton = document.querySelector('#cancelEdit');

const rolesIds = ['editSpellDamage', 'editPhysicalDamage', 'editSupport', 'editTank'];

function handleClearEditFields() {
  document.getElementById('edit_class_id').value = '';
  document.getElementById('edit_name').value = '';

  rolesIds.forEach((role) => {
    document.querySelector(`#${role}`).checked = false;
  })
}

editButtons.forEach(button => {
  button.addEventListener('click', function() {
    handleClearEditFields();
    const classId = this.dataset.id;
    const className = this.dataset.name;
    const classRoles = this.dataset.roles;

    document.getElementById('edit_class_id').value = classId;
    document.getElementById('edit_name').value = className;

    if (classRoles.length !== 2) {
      const classRolesList = classRoles.replaceAll("'", "").replace("[", "").replace("]", "").split(",");
      classRolesList.forEach((role) => {
        const roleName = role.trim().split("_");
        let roleNameTreated;

        if (roleName.length > 1) {
          roleNameTreated = `edit${roleName[0].charAt(0).toUpperCase() + roleName[0].slice(1)}${roleName[1].charAt(0).toUpperCase() + roleName[1].slice(1)}`;
          document.querySelector(`#${roleNameTreated}`).checked = true;
        }  else {
          roleNameTreated = `edit${roleName[0].charAt(0).toUpperCase() + roleName[0].slice(1)}`
          document.querySelector(`#${roleNameTreated}`).checked = true;
        }
      })
    }

    editModal.style.display = 'flex';
  });
});

cancelEditButton?.addEventListener('click', function() {
  editModal.style.display = 'none';
});

// Deletar classe 
const deleteButtons = document.querySelectorAll('.delete_class_button');
const deleteModal = document.querySelector('#deleteClassModal');
const cancelDeleteButton = document.querySelector('#cancelDelete');

deleteButtons.forEach(button => {
  button.addEventListener('click', function(event) {
    event.preventDefault();
    const raceId = this.dataset.id;
    document.querySelector('#delete_class_id').value = raceId;
    deleteModal.style.display = 'flex';
  });
});


cancelDeleteButton?.addEventListener('click', function() {
  deleteModal.style.display = 'none';
});


