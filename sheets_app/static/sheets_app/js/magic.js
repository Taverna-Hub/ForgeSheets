const nameMagic = document.querySelector('input[name="nameMagic"]');
const description = document.querySelector('textarea[name="descriptionMagic"]')
const element = document.querySelector('input[name="elementMagic"]');
const damage = document.querySelector('input[name="damageMagic"]');
const attribute = document.querySelector('select[name="attributeMagic"]');

const addMagicBtn = document.querySelector('#addMagicBtn');
const closeMagicModalBtn = document.querySelector('#closeMagicModalBtn')
const openMagicModalBtn = document.querySelector('.openMagicModalBtn')

const magicModal = document.querySelector('.magicModal')

// Editar magia
const editMagicName = document.querySelector('input[name="nameMagicEdit"]');
const editMagicDescription = document.querySelector('textarea[name="descriptionMagicEdit"]')
const editMagicElement = document.querySelector('input[name="elementMagicEdit"]');
const editMagicDamage = document.querySelector('input[name="damageMagicEdit"]');
const editMagicAttribute = document.querySelector('select[name="attributeMagicEdit"]');

const editMagicBtn = document.querySelector('#editMagicBtn');
const closeEditMagicModalBtn = document.querySelector('#closeEditMagicModalBtn')
const openEditMagicModalBtn = document.querySelector('.openEditMagicModalBtn')
const saveEditMagicBtn = document.querySelector('#saveMagicBtn')

const openEditMagicBtn = document.querySelectorAll('.editMagic');
const removeMagicBtn = document.querySelectorAll('.removeMagic')

const editMagicModal = document.querySelector('.editMagicModal')

const magicsName = document.querySelectorAll('.magicList > li > div > input[name="mgcName"]');
const magicsDiv = document.querySelectorAll('.magicList > li > div');

let magicString = '';
let magicList = [];
let selectedMagicToEdit;
let selectedMagicToEditRaw;
let magicNode;
let magicsNamesList = [];
let previousClassName;

magicsDiv.forEach(div => {
  const id = div.parentNode.getAttribute('data-id');
  const inputs = div.querySelectorAll('input');
  const values = [];
  
  inputs.forEach(input => {
    values.push(input.value);
  });

  const magic = {
    local_id: id,
    name: values[0],
    description: values[1], 
    element: values[2],
    damage: values[3],
    attribute: values[4]
  };

  magicList.push(magic);
});

magicsName.forEach(input => {
  magicsNamesList.push(input.value);
});

openEditMagicBtn.forEach(input => {
  input.onclick = () => handleGetEditMagicInfo(input);
});

removeMagicBtn.forEach(input => {
  input.onclick = () => handleDeleteMagic(input);
});

// Edit sheet function
function submitForm() {
  const editSheetForm = document.querySelector('#form-edit-sheet')
  if (editSheetForm) {
    editSheetForm.submit();
  }
}
// =========================

function handleCloseMagicModal() {
  magicModal.style.display = 'none';

  if (document.querySelector(`.${previousClassName}`)?.children[2] && document.querySelector(`.${previousClassName}`).children[2].tagName === 'SPAN') {
    document.querySelector(`.${previousClassName}`).removeChild(document.querySelector(`.${previousClassName}`).children[2])

    nameMagic.value = '';
    description.value = '';  
    element.value = '' ;
    damage.value = '' ;
    attribute.value = '' ;
  }
}

function handleOpenMagicModal() {
  magicModal.style.display = 'flex';
  magicModal.firstElementChild.scrollTo({ top: 0, behavior: 'smooth' });;
  previousClassName = null;
}

function handleMagicError(message, className) {
  const existingError = document.querySelector(`.${className}`).children[2]

  const error =       
    `
      <span class="nameError"> 
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-octagon-alert"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
        ${message}
      </span>
    `
    
  if (existingError && existingError.tagName === 'SPAN' && existingError.value === message) {
    return
  } else if (existingError && existingError.tagName === 'SPAN' && existingError.value !== message) {
    document.querySelector(`.${className}`).removeChild(existingError)
  }

  if (previousClassName && previousClassName !== className) {
    const previousElement = document.querySelector(`.${previousClassName}`);
    const previousError = previousElement.children[2];
    previousElement.removeChild(previousError);
  } 

  const node = new DOMParser().parseFromString(error, 'text/html').body.firstElementChild
  document.querySelector(`.${className}`).appendChild(node)

  previousClassName = className;
}

function handleLoadMagicList(magic) { 
  return (
    `
      <li data-id="${magic.local_id}">
        <div>
            <input type="hidden" name="mgcName" value="${magic.name}" />
            <input type="hidden" name="mgcDesc" value="${magic.description}" />
            <input type="hidden" name="mgcElement" value="${magic.element}" />
            <input type="hidden" name="mgcDamage" value="${magic.damage}" />
            <input type="hidden" name="mgcAttribute" value="${magic.attribute}" />
        </div>
        ${magic.name} 
        ${magic.damage ? `| ${magic.damage}` : ''}
        ${magic.element ? ` | ${magic.element} ` : ''}
        <button type="button" class="removeMagic" onclick="handleDeleteMagic(this)">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
        </button>
        <button type="button" class="editMagic" onclick="handleGetEditMagicInfo(this)" >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
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
    damage: (damage.value),
    attribute: (attribute.value)
  };

  const nameExists = magicList.some(
    (magicItem) => magicItem.name.toLowerCase() === magic.name.toLowerCase());

  const nameExistsInListedList = magicsNamesList.some(
    (name) => name.toLowerCase() === magic.name.toLowerCase());

  if (magic.name === '') {
    handleMagicError('Esse campo não pode ser vazio', 'magicName')
    return
  }
  if (nameExists || nameExistsInListedList) {
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

  if (magic.damage.length > 50){
    handleMagicError('Esse campo deve ter no máximo 50 caracteres', 'magicDamage')
    return
  }

  if (magic.element.length > 15) {
    handleMagicError('Esse campo não pode ter mais de 15 caracteres', 'magicElement')
    return
  }

  if (magic.description.length > 200) {
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
  damage.value = '' ;
  attribute.value = '' ;

  submitForm()
}

// Edit
function handleCloseEditMagicModal() {
  if (document.querySelector(`.${previousClassName}`)?.children[2] && document.querySelector(`.${previousClassName}`).children[2].tagName === 'SPAN') {
    document.querySelector(`.${previousClassName}`).removeChild(document.querySelector(`.${previousClassName}`).children[2])

    selectedMagicToEdit.name = selectedMagicToEditRaw.name;
    selectedMagicToEdit.description = selectedMagicToEditRaw.description; 
    selectedMagicToEdit.element = selectedMagicToEditRaw.element; 
    selectedMagicToEdit.damage = selectedMagicToEditRaw.damage; 
    selectedMagicToEdit.attribute = selectedMagicToEditRaw.attribute; 
  }

  editMagicModal.style.display = 'none';
}

function handleOpenEditMagicModal(selectedMagic) {
  editMagicModal.style.display = 'flex';
  editMagicModal.firstElementChild.scrollTo({ top: 0, behavior: 'smooth' });
  previousClassName = null;
  editMagicName.value = selectedMagic.name;
  editMagicDescription.value = selectedMagic.description;
  editMagicElement.value = selectedMagic.element; 
  editMagicDamage.value = selectedMagic.damage;
  editMagicAttribute.value = selectedMagic.attribute;
}

function handleGetEditMagicInfo(magic) {
  const selectedMagicId = magic.parentNode.getAttribute('data-id'); // pega id
  const selectedMagicElement = document.querySelector(`li[data-id="${selectedMagicId}"] > div`)
  magicNode = magic.parentNode;  // atribui id

  const selectedMagic = magicList.filter((magicItem) => magicItem.local_id == selectedMagicId)[0]; // peag 1

  selectedMagicToEdit = selectedMagic; // atribui oq pego

  selectedMagicToEditRaw = {
    local_id: selectedMagicId,
    name: selectedMagicElement.children[0].value,
    description: selectedMagicElement.children[1].value, 
    element: selectedMagicElement.children[2].value, 
    damage: selectedMagicElement.children[3].value, 
    attribute: selectedMagicElement.children[4].value, 
  }

  handleOpenEditMagicModal(selectedMagicToEdit)
}
  
function handleEditMagic() {
  selectedMagicToEdit.name = editMagicName.value;
  selectedMagicToEdit.description = editMagicDescription.value; 
  selectedMagicToEdit.element = editMagicElement.value; 
  selectedMagicToEdit.damage = editMagicDamage.value; 
  selectedMagicToEdit.attribute = editMagicAttribute.value; 

  const nameExistsInListedList = magicsNamesList.some(
    (name) => name.toLowerCase() === selectedMagicToEdit.name.toLowerCase());

  if (selectedMagicToEdit.name === '') {
    handleMagicError('Esse campo não pode ser vazio', 'editMagicName')
    return
  }
  if (nameExistsInListedList && selectedMagicToEdit.name !== selectedMagicToEditRaw.name) {
    handleMagicError('Essa magia/habilidade já existe', 'editMagicName')
    return
  }
  if (selectedMagicToEdit.name.length > 55) {
    handleMagicError('O nome deve ser menor que 55 caracteres', 'editMagicName')
    return
  }
  if (selectedMagicToEdit.name.length < 2) {
    handleMagicError('Este campo deve ter mais de 2 caracteres', 'editMagicName')
    return
  }

  if (selectedMagicToEdit.damage.length > 50){
    handleMagicError('Esse campo deve ter no máximo 50 caracteres', 'editMagicDamage')
    return
  }

  if (selectedMagicToEdit.element.length > 15) {
    handleMagicError('Esse campo não pode ter mais de 15 caracteres', 'editMagicElement')
    return
  }

  if (selectedMagicToEdit.description.length > 200){
    handleMagicError('Esse campo deve ter no máximo 200 caracteres', 'editMagicDescription')
    return
  }

  if (JSON.stringify(selectedMagicToEditRaw) === JSON.stringify(selectedMagicToEdit)) {
    handleCloseEditMagicModal()
    return
  }

  document.querySelector('.magicList').innerHTML = ''; 
  magicList.forEach((magicItem) => {
    magicString += handleLoadMagicList(magicItem); 
  })

  document.querySelector('.magicList').innerHTML = magicString; 
  magicString = ''; 
  handleCloseEditMagicModal(); 

  if (!String(selectedMagicToEdit.local_id).includes('.')) {
    const editMagicForm = document.querySelector('.editMagicModal form')
    editMagicForm.action = `/fichas/editar_magia/${selectedMagicToEdit.local_id}`
    editMagicForm.submit();
  }
}
  
async function handleDeleteMagic(magic) {
  const selectedMagicId = selectedMagicToEdit.parentNode.getAttribute('data-id'); // pega id
  const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

  const listItemToRemove = document.querySelector(`.magicList > li[data-id="${selectedMagicId}"]`);
  listItemToRemove.parentNode.removeChild(listItemToRemove);

  const actualIndex = magicList.findIndex(magicItem => magicItem.id == selectedMagicId); // acha idnex na lista
  magicList.splice(actualIndex, 1) // remove ok

  if (!selectedMagicId.includes('.')) {
    await fetch(`/fichas/deletar_magia/${selectedMagicId}`, {
      method: 'POST',
      headers: {
        'X-CSRFToken': csrfToken
      },
      mode: 'same-origin'
    })

    location.reload();
  }
}

openMagicModalBtn?.addEventListener('click', () => handleOpenMagicModal());
addMagicBtn?.addEventListener('click', () => handleAddMagicToList());
closeMagicModalBtn?.addEventListener('click', () => handleCloseMagicModal());

// Editar
closeEditMagicModalBtn?.addEventListener('click', () => handleCloseEditMagicModal());
saveEditMagicBtn?.addEventListener('click', () => handleEditMagic())