const nameMagic = document.querySelector('input[name="nameMagic"]');
const description = document.querySelector('textarea[name="descriptionMagic"]')
const element = document.querySelector('input[name="elementMagic"]');
const diceType = document.querySelector('select[name="diceTypeMagic"]');
const diceQuant = document.querySelector('input[name="diceQuantMagic"]');
const attribute = document.querySelector('select[name="attributeMagic"]');

const addMagicBtn = document.querySelector('#addMagicBtn');
const closeMagicModalBtn = document.querySelector('#closeMagicModalBtn')
const openMagicModalBtn = document.querySelector('.openMagicModalBtn')

const magicModal = document.querySelector('.magicModal')

// Editar magia
const editMagicName = document.querySelector('input[name="nameMagicEdit"]');
const editMagicDescription = document.querySelector('textarea[name="descriptionMagicEdit"]')
const editMagicElement = document.querySelector('input[name="elementMagicEdit"]');
const editMagicDiceType = document.querySelector('select[name="diceTypeMagicEdit"]');
const editMagicDiceQuantity = document.querySelector('input[name="diceQuantMagicEdit"]');
const editMagicAttribute = document.querySelector('select[name="attributeMagicEdit"]');

const editMagicBtn = document.querySelector('#editMagicBtn');
const closeEditMagicModalBtn = document.querySelector('#closeEditMagicModalBtn')
const openEditMagicModalBtn = document.querySelector('.openEditMagicModalBtn')
const saveEditMagicBtn = document.querySelector('#saveMagicBtn')

const editMagicModal = document.querySelector('.editMagicModal')

let magicString = '';
let magicList = [];
let selectedMagicToEdit;

function handleCloseMagicModal() {
  magicModal.style.display = 'none';
}

function handleOpenMagicModal() {
  magicModal.style.display = 'flex';
}

function handleMagicError(message, className) {
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

function handleLoadMagicList(magic) { 
    return (
      `
        <li data-id="${magic.local_id}">
          <div>
              <input type="hidden" name="mgcName" value="${magic.name}" />
              <input type="hidden" name="mgcDesc" value="${magic.description}" />
              <input type="hidden" name="mgcElement" value="${magic.element}" />
              <input type="hidden" name="mgcDiceType" value="${magic.dice_type}" />
              <input type="hidden" name="mgcDiceQuant" value="${magic.dice_quantity}" />
              <input type="hidden" name="mgcAttribute" value="${magic.attribute}" />
          </div>
          ${magic.name} | ${magic.element} 
          <button type="button" class="removeMagic" onclick="handleDeleteMagic(this)">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
          </button>
          <button type="button" class="editMagic" onclick="handleGetEditMagicInfo(this)" style="margin-right: -10px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
          </button>
        </li>
      `
    )
  }

function handleAddMagicToList() {
  const magic = {
    local_id: Math.random(),
    name: nameMagic.value,
    description: (description.value), 
    element: (element.value),
    dice_type: (diceType.value),
    dice_quantity: Number(diceQuant.value),
    attribute: (attribute.value)
  };


  const nameExists = magicList.some(
    (magicItem) => magicItem.name.toLowerCase() === magic.name.toLowerCase());

  if (magic.name === '') {
    handleMagicError('Esse campo não pode ser vazio', 'magicName')
    return
  }
  if (nameExists) {
    handleMagicError('Essa magia/habilidade já existe', 'magicName')
    return
  }
  if (magic.name.length > 55) {
    handleMagicError('O nome deve ser menor que 55 caracteres', 'magicName')
    return
  }
  if (magic.name.length < 2) {
    handleMagicError('Este campo deve ter mais de 2 caracteres', 'magicName')
    return
  }

  if (magic.dice_quantity < 1) {
    handleMagicError('A quantidade não pode ser inferior a 1', 'magicDiceQuant')
    return
  }

  if (magic.element.length === 0) {
    handleMagicError('Esse campo não pode ser vazio', 'magicElement')
    return
  }

  if (magic.element > 15) {
    handleMagicError('Esse campo não pode ter mais de 15 caracteres', 'magicElement')
    return
  }

  if (!Number.isInteger(magic.dice_quantity)) {
    handleMagicError('Utilize apenas números inteiros', 'magicDiceQuant')
    return
  }

  if (magic.description.length > 200){
    handleMagicError('Esse campo deve ter no máximo 200 caracteres', 'magicDescription')
    return
  }
  magicList.push(magic);

  magicString += handleLoadMagicList(magic);

  const node = new DOMParser().parseFromString(magicString, 'text/html').body.firstElementChild
  document.querySelector('.magicList').appendChild(node)
  handleCloseMagicModal();
  magicString = ''; 
  nameMagic.value = '';
  description.value = '';  
  element.value = '' ;
  diceType.value = '' ; // #TODO D4, D6, D8, D10, D12, D20
  diceQuant.value = 1;
  attribute.value = '' ;
}

// Editar
function handleCloseEditMagicModal() {
  editMagicModal.style.display = 'none';
}

function handleOpenEditMagicModal(selectedMagic) {
  editMagicModal.style.display = 'flex';
  editMagicName.value = selectedMagic.name;
  editMagicDescription.value = selectedMagic.description;
  editMagicElement.value = selectedMagic.element; 
  editMagicDiceType.value = selectedMagic.dice_type;
  editMagicDiceQuantity.value = selectedMagic.dice_quantity;
  editMagicAttribute.value = selectedMagic.attribute;
}


function handleGetEditMagicInfo(magic) {
  const selectedMagicId = magic.parentNode.getAttribute('data-id'); // pega id
  magicNode = magic.parentNode;  // atribui id

  const selectedMagic = magicList.filter((magicItem) => magicItem.local_id == selectedMagicId)[0]; // peag 1
  selectedMagicToEdit = selectedMagic; // atribui oq pego

  handleOpenEditMagicModal(selectedMagicToEdit)
}
  
function handleEditMagic() {
  selectedMagicToEdit.name = editMagicName.value;
  selectedMagicToEdit.description = (editMagicDescription.value); 
  selectedMagicToEdit.element = (editMagicElement.value); 
  selectedMagicToEdit.dice_type = (editMagicDiceType.value); 
  selectedMagicToEdit.dice_quantity = Number(editMagicDiceQuantity.value); 
  selectedMagicToEdit.attribute = (editMagicAttribute.value); 

  const magicListFiltered = magicList.filter((item, index, self) =>
    index === self.findIndex((t) => (
      t.local_id === item.local_id 
    ))
  );

  document.querySelector('.magicList').innerHTML = ''; 
  magicListFiltered.forEach((magicItem) => {
    console.log(magicItem)
    magicString += handleLoadMagicList(magicItem); 
  })

  document.querySelector('.magicList').innerHTML = magicString; 
  magicString = ''; 
  handleCloseEditMagicModal(); 
}
  
function handleDeleteMagic(magic) {
  const selectedMagicId = magic.parentNode.getAttribute('data-id'); // pega id
  const actualIndex = magicList.findIndex(magicItem => magicItem.id == selectedMagicId); // acha idnex na lista
  magicList.splice(actualIndex, 1) // remove ok

  magicList.forEach((magicItem) => {
    magicString += handleLoadMagicList(magicItem); // carrega dnv
  })

  document.querySelector('.magicList').innerHTML = magicString;
  magicString = '';
}

openMagicModalBtn?.addEventListener('click', () => handleOpenMagicModal());
addMagicBtn?.addEventListener('click', () => handleAddMagicToList());
closeMagicModalBtn?.addEventListener('click', () => handleCloseMagicModal());

// Editar
closeEditMagicModalBtn?.addEventListener('click', () => handleCloseEditMagicModal());
saveEditMagicBtn?.addEventListener('click', () => handleEditMagic())