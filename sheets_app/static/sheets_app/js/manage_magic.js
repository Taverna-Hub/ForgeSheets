const nameMagic = document.querySelector('input[name="nameMagicEdit"]');
const description = document.querySelector('textarea[name="descriptionMagicEdit"]')
const element = document.querySelector('input[name="elementMagicEdit"]');
const diceType = document.querySelector('select[name="diceTypeMagicEdit"]');
const diceQuant = document.querySelector('input[name="diceQuantMagicEdit"]');
const attribute = document.querySelector('select[name="attributeMagicEdit"]');

const editMagicBtn = document.querySelector('#editMagicBtn');
const closeEditMagicModalBtn = document.querySelector('#closeEditMagicModalBtn')
const openEditMagicModalBtn = document.querySelector('.openEditMagicModalBtn')

const editMagicModal = document.querySelector('.editMagicModal')

let magicString = '';
let magicList = [];
let selectedmagicToEdit;
let magicNode;


function handleCloseEditMagicModal() {
    magicModal.style.display = 'none';
  }


function handleOpenEditMagicModal() {
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

  function handleOpenEditMagicModal(selectedMagic) {
    editMagicModal.style.display = 'flex';
    editMagicName.value = selectedMagic.magicName;
    editMagicDescription.value = selectedMagic.magicDescription;
    editMagicElement.value = selectedMagic.element; // mude dps o9 nome ok;
    editMagicDiceType.value = selectedMagic.dice_type;
    editMagicDiceQuantity.value = selectedMagic.dice_quantity;
    editMagicAttribute.value = selectedMagic.attribute;
  }


  function handleGetEditMagicInfo(magic) {
    const selectedMagicId = magic.parentNode.getAttribute('data-id'); // pega id
    magicNode = magic.parentNode;  // atribui id
  
    const selectedMagic = magicList.filter((magicItem) => magicItem.local_id == selectedMagicId)[0]; // peag 1
    selectedMagicToEdit = selectedMagic; // atribui oq pego
  
    handleOpenEditMagicModal(selectedMagic)
  }
  
  function handleEditMagic() {
    selectedMagicToEdit.magicName = editMagicName.value; // atruniu novo
    selectedMagicToEdit.magicDescription = (editMagicDescription.value); 
    selectedMagicToEdit.element = (editMagicElement.value); 
    selectedMagicToEdit.dice_type = (editMagicDiceType.value); 
    selectedMagicToEdit.dice_quantity = Number(editMagicDiceQuantity.value); 
    selectedMagicToEdit.attribute = (editMagicAttribute.value); 
  
    const MagicListFiltered = magicList.filter((item, index, self) =>
      index === self.findIndex((t) => (
        t.local_id === item.local_id // n sei mas funciona, bota magic
      ))
    );
  
    document.querySelector('.magicList').innerHTML = ''; // magic list
  
    MagicListFiltered.forEach((magicItem) => {
      magicString += handleLoadMagicList(magicItem); // carrega arry novo
    })
  
    document.querySelector('.magicList').innerHTML = magicString; // bota os ovos
    magicString = ''; // zera
    handleCloseEditMagicModal(); // fecha
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
  editMagicBtn?.addEventListener('click', () => handleGetEditMagicInfo()); // ?????
  closeMagicModalBtn?.addEventListener('click', () => handleCloseMagicModal());

