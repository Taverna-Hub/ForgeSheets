const name = document.querySelector('input[name="createEquipmentName"]');
const quantity = document.querySelector('input[name="quantity"]');
const attack = document.querySelector('input[name="attack"]');
const defense = document.querySelector('input[name="defense"]');

const editName = document.querySelector('input[name="editName"]');
const editQuantity = document.querySelector('input[name="editQuantity"]');
const editAttack = document.querySelector('input[name="editAttack"]');
const editDefense = document.querySelector('input[name="editDefense"]');

const addEquipmentBtn = document.querySelector('#addEquipmentBtn');
const closeEquipmentBtn = document.querySelector('#closeEquipmentBtn')

const editEquipmentBtn = document.querySelector('#editEquipmentBtn');
const closeEditEquipmentBtn = document.querySelector('#closeEditEquipmentBtn')

const openEquipmentModal = document.querySelector('.openEquipmentBtn')
const openEditEquipmentBtn = document.querySelectorAll('.editEquipment'); // cu
const removeEquipmentBtn = document.querySelectorAll('.removeEquipment')// cu

const equipmentModal = document.querySelector('.equipmentModal')
const editEquipmentModal = document.querySelector('.editEquipmentModal')

const equipmentsNames = document.querySelectorAll('.equipmentList > li > div > input[name="equipmentName"]');
const equipmentsDiv = document.querySelectorAll('.equipmentList > li > div');

let equipmentString = '';
let equipmentList = [];
let selectedEquipmentToEdit;
let equipmentNode;
let equipmentsNamesList = [];

equipmentsDiv.forEach(div => {
  const id = div.parentNode.getAttribute('data-id');
  const inputs = div.querySelectorAll('input');
  const values = [];
  
  inputs.forEach(input => {
    values.push(input.value);
  });

  const equipment = {
    local_id: Number(id),
    name: values[0],
    quantity: Number(values[1]),
    attack: Number(values[2]),
    defense: Number(values[3])
  };

  equipmentList.push(equipment);
});

equipmentsNames.forEach(input => {
  equipmentsNamesList.push(input.value);
});

openEditEquipmentBtn.forEach(input => {
  input.onclick = () => handleGetEditEquipmentInfo(input);
});

removeEquipmentBtn.forEach(input => {
  input.onclick = () => handleDeleteEquipment(input);
});

// Edit sheet function
function submitForm() {
  const editSheetForm = document.querySelector('#form-edit-sheet')
  if (editSheetForm) {
    editSheetForm.submit();
  }
}
// =========================

function handleCloseEquipmentModal() {
  equipmentModal.style.display = 'none';
}

function handleOpenEquipmentModal() {
  equipmentModal.style.display = 'flex';
}

function handleCloseEditEquipmentModal() {
  editEquipmentModal.style.display = 'none';
}

function handleOpenEditEquipmentModal(selectedEquipment) {
  editEquipmentModal.style.display = 'flex';
  editName.value = selectedEquipment.name;
  editQuantity.value = selectedEquipment.quantity;
  editAttack.value = selectedEquipment.attack;
  editDefense.value = selectedEquipment.defense;
}

function handleEquipmentError(message, className) {
  const error =       
  `
    <span> 
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-octagon-alert"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
      ${message}
    </span>
  `
  const node = new DOMParser().parseFromString(error, 'text/html').body.firstElementChild
  document.querySelector(`.${className}`).appendChild(node)
}

function handleLoadEquipmentList(equipment) {
  return (
    `
    <li data-id="${ equipment.local_id }">
      <div>
        <input type="hidden" name="equipmentName" value="${equipment.name}" />
        <input type="hidden" name="equipmentQnt" value="${equipment.quantity}" />
        <input type="hidden" name="equipmentAtk" value="${equipment.attack}" />
        <input type="hidden" name="equipmentDef" value="${equipment.defense}" />
      </div>
      ${equipment.quantity}x ${equipment.name}
      ${equipment.attack > 0 ? `- Atk: ${equipment.attack} ` : ''}
      ${equipment.defense > 0 & equipment.attack > 0 ? `| Def: ${equipment.defense}` : ''}
      ${equipment.defense > 0 & equipment.attack <= 0 ? `- Def: ${equipment.defense}` : ''}

      <button type="button" class="removeEquipment" onclick=handleDeleteEquipment(this)>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
      </button>
      <button type="button" class="editEquipment" onclick=handleGetEditEquipmentInfo(this)>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
      </button>
    </li>
    `
  )
}

function handleAddEquipmentToList() {
  const equipment = {
    local_id: Math.random(),
    name: name.value,
    quantity: Number(quantity.value), 
    attack: Number(attack.value),
    defense: Number(defense.value)
  };

  const nameExists = equipmentList.some(
    (equipmentItem) => equipmentItem.name.toLowerCase() === equipment.name.toLowerCase());

  const nameExistsInListedList = equipmentsNamesList.some(
    (name) => name.toLowerCase() === equipment.name.toLowerCase());

  if (equipment.name === '') {
    handleEquipmentError('Esse campo não pode ser vazio', 'equipmentName')
    return
  }
  if (nameExists || nameExistsInListedList) {
    handleEquipmentError('Esse equipamento já existe', 'equipmentName')
    return
  }
  if (equipment.name.length > 55) {
    handleEquipmentError('O nome deve ser menor que 55 caracteres', 'equipmentName')
    return
  }
  if (equipment.name.length < 2) {
    handleEquipmentError('Este campo deve ter mais de 2 caracteres', 'equipmentName')
    return
  }

  if (equipment.quantity < 1) {
    handleEquipmentError('A quantidade não pode ser inferior a 1', 'equipmentQuantity')
    return
  }

  if (equipment.attack < 0) {
    handleEquipmentError('O valor de ataque não pode ser inferior a 0', 'equipmentAttack')
    return
  }

  if (equipment.defense < 0) {
    handleEquipmentError('O valor de defesa não pode ser inferior a 0', 'equipmentDefense')
    return
  }

  if (!Number.isInteger(equipment.quantity)) {
    handleEquipmentError('Utilize apenas números inteiros', 'equipmentQuantity')
    return
  }

  if (!Number.isInteger(equipment.attack)) {
    handleEquipmentError('Utilize apenas números inteiros', 'equipmentAttack')
    return
  }

  if (!Number.isInteger(equipment.defense)) {
    handleEquipmentError('Utilize apenas números inteiros', 'equipmentDefense')
    return
  }

  equipmentList.push(equipment);

  equipmentString += handleLoadEquipmentList(equipment);

  const node = new DOMParser().parseFromString(equipmentString, 'text/html').body.firstElementChild
  document.querySelector('.equipmentList').appendChild(node)
  handleCloseEquipmentModal();
  equipmentString = ''; 
  name.value = '';
  quantity.value = 1;
  attack.value = 0;
  defense.value = 0;

  submitForm()
}

function handleGetEditEquipmentInfo(equipment) {
  const selectedEquipmentId = equipment.parentNode.getAttribute('data-id');
  equipmentNode = equipment.parentNode;

  const selectedEquipment = equipmentList.filter((equipmentItem) => equipmentItem.local_id == selectedEquipmentId)[0];
  selectedEquipmentToEdit = selectedEquipment;

  handleOpenEditEquipmentModal(selectedEquipment)
}

async function handleEditEquipment() {
  selectedEquipmentToEdit.name = editName.value; 
  selectedEquipmentToEdit.quantity = Number(editQuantity.value); 
  selectedEquipmentToEdit.attack = Number(editAttack.value); 
  selectedEquipmentToEdit.defense = Number(editDefense.value); 

  document.querySelector('.equipmentList').innerHTML = '';

  equipmentList.forEach((equipmentItem) => {
    equipmentString += handleLoadEquipmentList(equipmentItem);
  })

  document.querySelector('.equipmentList').innerHTML = equipmentString;
  equipmentString = '';
  handleCloseEditEquipmentModal();

  if (!String(selectedEquipmentToEdit.local_id).includes('.')) {
    const editEquipmentForm = document.querySelector('.editEquipmentModal form')
    editEquipmentForm.action = `/fichas/editar_equipamento/${selectedEquipmentToEdit.local_id}`
    console.log(editEquipmentForm)
  }
}

async function handleDeleteEquipment(equipment) {
  const selectedEquipmentId = equipment.parentNode.getAttribute('data-id');
  const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
  
  const listItemToRemove = document.querySelector(`.equipmentList > li[data-id="${selectedEquipmentId}"]`);
  listItemToRemove.parentNode.removeChild(listItemToRemove);

  const actualIndex = equipmentList.findIndex(equipmentItem => equipmentItem.local_id == selectedEquipmentId);
  equipmentList.splice(actualIndex, 1);

  if (!selectedEquipmentId.includes('.')) {
    await fetch(`/fichas/deletar_equipamento/${selectedEquipmentId}`, {
      method: 'POST',
      headers: {
        'X-CSRFToken': csrfToken
      },
      mode: 'same-origin'
    })

    location.reload();
  }
}


openEquipmentModal?.addEventListener('click', () => handleOpenEquipmentModal());
addEquipmentBtn?.addEventListener('click', () => handleAddEquipmentToList());
editEquipmentBtn?.addEventListener('click', () => handleEditEquipment());
closeEquipmentBtn?.addEventListener('click', () => handleCloseEquipmentModal());
closeEditEquipmentBtn?.addEventListener('click', () => handleCloseEditEquipmentModal());
