const name = document.querySelector('input[name="name"]');
const quantity = document.querySelector('input[name="quantity"]');
const attack = document.querySelector('input[name="attack"]');
const defense = document.querySelector('input[name="defense"]');

const addEquipmentBtn = document.querySelector('#addEquipmentBtn');
const closeEquipmentBtn = document.querySelector('#closeEquipmentBtn')
const openEquipmentModal = document.querySelector('.openEquipmentBtn')
const equipmentModal = document.querySelector('.equipmentModal')

let context = document.getElementById('context').getAttribute('data-context');
if (context) {
  context = JSON.parse(context.replace(/'/g, '"'));
}

let equipmentString = '';
let equipmentList = [];


const StorageService = {
  saveData() {
    localStorage.setItem('equipments', JSON.stringify(equipmentList))
  },
  getData() {
    return  JSON.parse(localStorage.getItem('equipments')) || []
  },
  removeData() {
    localStorage.removeItem('equipments')
  }
}

function closeEquipmentModal() {
  equipmentModal.style.display = 'none';
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

function addEquipmentToList() {
  const equipment = {
    name: name.value,
    quantity: Number(quantity.value), 
    attack: Number(attack.value),
    defense: Number(defense.value)
  };

  if (equipment.name === '') {
    handleError('Esse campo não pode ser vazio', 'equipmentName')
    return
  }
  if (equipment.name.length > 55) {
    handleError('O nome deve ser menor que 55 caracteres', 'equipmentName')
    return
  }
  if (equipment.name.length < 2) {
    console.log(equipment.name.length)
    handleError('Este campo deve ter mais de 2 caracteres', 'equipmentName')
    return
  }

  if (equipment.quantity < 1) {
    handleError('A quantidade não pode ser inferior a 1', 'equipmentQuantity')
    return
  }

  if (equipment.attack < 0) {
    handleError('O valor de ataque não pode ser inferior a 0', 'equipmentAttack')
    return
  }

  if (equipment.defense < 0) {
    handleError('O valor de defesa não pode ser inferior a 0', 'equipmentDefense')
    return
  }

  if (!Number.isInteger(equipment.quantity)) {
    handleError('Utilize apenas números inteiros', 'equipmentQuantity')
    return
  }

  if (!Number.isInteger(equipment.attack)) {
    handleError('Utilize apenas números inteiros', 'equipmentAttack')
    return
  }

  if (!Number.isInteger(equipment.defense)) {
    handleError('Utilize apenas números inteiros', 'equipmentDefense')
    return
  }

  equipmentList.push(equipment);
  StorageService.saveData();

  equipmentString +=
    `
    <li>
      <div>
        <input type="hidden" name="equipmentName" value="${equipment.name}" />
        <input type="hidden" name="equipmentQnt" value="${equipment.quantity}" />
        <input type="hidden" name="equipmentAtk" value="${equipment.attack}" />
        <input type="hidden" name="equipmentDef" value="${equipment.defense}" />
      </div>
      ${equipment.quantity}x ${equipment.name} - Atk: ${equipment.attack} | Def: ${equipment.defense}
        <i data-lucide="log-out" width="40" height="40"></i>

    </li>
    `;

  const node = new DOMParser().parseFromString(equipmentString, 'text/html').body.firstElementChild
  document.querySelector('.equipmentList').appendChild(node)
  closeEquipmentModal();
  equipmentString = '';
  name.value = '';
  equipment.value = 1;
  attack.value = 0;
  defense.value = 0;
}

function loadEquipmentList() {
  equipmentList = StorageService.getData();

  equipmentList.forEach((equipment) => {
    equipmentString +=
    `
    <li>
      <div>
        <input type="hidden" name="equipmentName" value="${equipment.name}" />
        <input type="hidden" name="equipmentQnt" value="${equipment.quantity}" />
        <input type="hidden" name="equipmentAtk" value="${equipment.attack}" />
        <input type="hidden" name="equipmentDef" value="${equipment.defense}" />
      </div>
        ${equipment.name}
        <i data-lucide="log-out" width="40" height="40"></i>

    </li>
    `;

    const node = new DOMParser().parseFromString(equipmentString, 'text/html').body.firstElementChild
    document.querySelector('.equipmentList').appendChild(node)
  });

  equipmentString = '';
}

openEquipmentModal?.addEventListener('click', () => {
  equipmentModal.style.display = 'flex';
});
addEquipmentBtn?.addEventListener('click', () => addEquipmentToList());
closeEquipmentBtn?.addEventListener('click', () => closeEquipmentModal());

window.onload = () => {
  if (context.length >= 1) {
    loadEquipmentList();
  } else {
    StorageService.removeData();
  }
}