const name = document.querySelector('input[name="mgcName"]');
const description = document.querySelector('input[name="mgcDesc"]')
const element = document.querySelector('input[name="mgcElement"]');
const diceType = document.querySelector('input[name="mcgDiceType"]');
const diceQuant = document.querySelector('input[name="mgcDiceQuant"]');
const atribute = document.querySelector('input[name="mgcAtribute"]');

const addMagicBtn = document.querySelector('#addMagicBtn');
const closeMagicModalBtn = document.querySelector('#closeMagicBtn')
const openMagicModalBtn = document.querySelector('.openMagicBtn')

const magicModal = document.querySelector('.magicModal')
let context = document.getElementById('context').getAttribute('data-context');
if (context) {
  context = JSON.parse(context.replace(/'/g, '"'));
}


let magicString = '';
let magicList = [];

function handleCloseMagicModal() {
    magicModal.style.display = 'none';
  }

function handleOpenMagicModal() {
    magicModal.style.display = 'flex';
  }

function handleError(message, className) {
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
/* #TODO: sophia mude a forma de apresentar a magia */
function handleLoadHtmlList(magic) { 
    return (
      `
        <li data-id="${magic.local_id}">
        <div>
          <input type="hidden" name="Name" value="${magic.name}" />
          <input type="hidden" name="Qnt" value="${magic.quantity}" />
          <input type="hidden" name="equipmentAtk" value="${magic.attack}" />
          <input type="hidden" name="equipmentDef" value="${magic.defense}" />
        </div>
        ${equipment.quantity}x ${equipment.name}- Atk: ${equipment.attack} | Def: ${equipment.defense}
        <button type="button" class="removeEquipment" onclick="handleDeleteEquipment(this)">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
        </button>
        <button type="button" class="editEquipment" onclick="handleGetEditEquipmentInfo(this)" style="margin-right: -10px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
        </button>
      </li>
      `
    )
  }

function handleAddMagicToList() {
  const magic = {
    local_id: Math.random(),
    name: name.value,
    description: (description.value), 
    element: (element.value),
    diceType: (diceType.value),
    diceQuant: Number(diceQuant.value),
    atribute: (atribute.value)
  };

  const nameExists = magicList.some(
    (magicItem) => magicItem.name.toLowerCase() === magic.name.toLowerCase());

  if (magic.name === '') {
    handleError('Esse campo não pode ser vazio', '#TODO')
    return
  }
  if (nameExists) {
    handleError('Essa magia/habilidade já existe', '#TODO')
    return
  }
  if (magic.name.length > 55) {
    handleError('O nome deve ser menor que 55 caracteres', '#TODO')
    return
  }
  if (magic.name.length < 2) {
    handleError('Este campo deve ter mais de 2 caracteres', '#TODO')
    return
  }

  if (magic.diceQuant < 1) {
    handleError('A quantidade não pode ser inferior a 1', '#TODO')
    return
  }

  if (magic.element.length === 0) {
    handleError('Esse campo não pode ser vazio', '#TODO')
    return
  }

  if (magic.element > 15) {
    handleError('Esse campo não pode ter mais de 15 caracteres', '#TODO')
    return
  }

  if (!Number.isInteger(magic.diceQuant)) {
    handleError('Utilize apenas números inteiros', '#TODO')
    return
  }

  if (magic.description.length > 200){
    handleError('Esse campo deve ter no máximo 200 caracteres', '#TODO')
    return
  }
  magicList.push(magic);

  magicString += handleLoadHtmlList(magic);

  const node = new DOMParser().parseFromString(magicString, 'text/html').body.firstElementChild
  document.querySelector('.magicList').appendChild(node)
  handleCloseMagicModal();
  magicString = ''; 
  name.value = '';
  description.value = '';  
  element.value = '' ;
  diceType.value = '' ; // #TODO D4, D6, D8, D10, D12, D20
  diceQuant.value = 1;
  atribute.value = '' ;
}

openMagicModalBtn?.addEventListener('click', () => handleOpenMagicModal());
addMagicBtn?.addEventListener('click', () => handleAddMagicToList());
closeMagicModalBtn?.addEventListener('click', () => handleCloseMagicModal());