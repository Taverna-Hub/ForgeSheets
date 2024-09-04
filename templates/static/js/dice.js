document.addEventListener('DOMContentLoaded', function () {
  const diceButton = document.querySelector('.diceButton');
  const diceModal = document.querySelector('.diceModal');
  const closeDice = document.getElementById('closeDice');
  const formDice = document.getElementById('formDice');
  const resultDisplay = document.getElementById('resultDisplay');
  const maxDiceCount = 20;
  const allowedDiceTypes = [4, 6, 8, 10, 12, 20, 100];

  diceButton.addEventListener('click', function () {
    diceModal.style.display = 'block';
  });

  closeDice.addEventListener('click', function () {
    diceModal.style.display = 'none';
  });

  formDice.onsubmit = function (event) {
    event.preventDefault();
    const quantityInputs = document
      .getElementById('quantityDice')
      .value.split(' ')
      .filter((val) => val.trim() !== '')
      .map(Number);
    const diceTypeInputs = document
      .getElementById('typeDice')
      .value.split(' ')
      .filter((val) => val.trim() !== '')
      .map(Number);
    const modifierInputs = document
      .getElementById('modDice')
      .value.split(' ')
      .filter((val) => val.trim() !== '')
      .map(Number);
    const quantityError = document.getElementById('quantityError');
    const typeError = document.getElementById('typeError');
    const modifierError = document.getElementById('modifierError');
    quantityError.innerHTML = '';
    typeError.innerHTML = '';
    modifierError.innerHTML = '';
    let hasError = false;

    const totalDice = quantityInputs.reduce((acc, val) => acc + val, 0);
    if (quantityInputs.length !== diceTypeInputs.length) {
      quantityError.innerHTML = `<span> <i data-lucide="octagon-alert"></i>Adicione a quantidade de dados rolados para cada tipo de dado.</span>`;
      hasError = true;
    }
    if (modifierInputs.some((val) => val > 20 || val < -20)) {
      modifierError.innerHTML = `<span> <i data-lucide="octagon-alert"></i>Insira um número entre -20 e 20.</span>`;
      hasError = true;
    }
    if (totalDice > maxDiceCount) {
      quantityError.innerHTML = `<span> <i data-lucide="octagon-alert"></i>Não é possível rolar mais de ${maxDiceCount} dados de uma vez.</span>`;
      hasError = true;
    }
    if (!diceTypeInputs.every((val) => allowedDiceTypes.includes(val))) {
      typeError.innerHTML = `<span> <i data-lucide="octagon-alert"></i>Somente D4, D6, D8, D10, D12, D20, e D100 são permitidos.</span>`;
      hasError = true;
    }

    if (quantityInputs.some((val) => val === 0)) {
      quantityError.innerHTML = `<span> <i data-lucide="octagon-alert"></i>A quantidade de dados não pode ser zero.</span>`;
      hasError = true;
    }
    if (quantityInputs==''){
      quantityError.innerHTML = `<span> <i data-lucide="octagon-alert"></i>Campo obrigatório.</span>`;
      hasError = true;

    }

    function validateIntegerInputs(inputs) {
      return inputs.every(Number.isInteger);
    }

    if (!validateIntegerInputs(quantityInputs)) {
      quantityError.innerHTML = `<span> <i data-lucide="octagon-alert"></i>A quantidade de dados deve ser composta apenas por números inteiros.</span>`;
      hasError = true;
    }

    if (!validateIntegerInputs(diceTypeInputs)) {
      typeError.innerHTML = `<span> <i data-lucide="octagon-alert"></i>Os tipos dos dados devem ser composto apenas por números inteiros.</span>`;
      hasError = true;
    }

    if (!validateIntegerInputs(modifierInputs)) {
      hasError = true;
      modifierError.innerHTML = `<span> <i data-lucide="octagon-alert"></i>Os modificadores devem ser compostos apenas por números inteiros.</span>`;
    }

    if (hasError) {
      lucide.createIcons();
      return;
    }

    let results = [];
    let diceResults = [];
    let overallTotal = 0;

    quantityInputs.forEach((quantity, index) => {
      const diceType = parseInt(
        diceTypeInputs[Math.min(index, diceTypeInputs.length - 1)] || '6',
      );
      const modifier = parseInt(
        modifierInputs[Math.min(index, modifierInputs.length - 1)] || '0',
      );

      let quantityRolls = [];
      let subtotal = 0;

      for (let i = 0; i < quantity; i++) {
        const roll = Math.floor(Math.random() * diceType) + 1;
        quantityRolls.push(roll);
        subtotal += roll;
      }

      subtotal += modifier;
      overallTotal += subtotal;
      diceResults.push({
        rolls: quantityRolls,
        subtotal: subtotal,
        type: diceType,
        modifier: modifier,
      });
      const modifierDisplay =
        modifier !== 0 ? `${modifier >= 0 ? '+' : ''}${modifier}` : '';
      results.push(
        `(${quantity}d${diceType}${modifierDisplay}): ${subtotal} [${quantityRolls.join(
          ', ',
        )}]`,
      );
    });

    resultDisplay.innerHTML = `<strong>Total: </strong> <p>${overallTotal}</p>  <strong>Detalhes:</strong> <p>${results.join(
      '<br>',
    )}</p>`;
    rollDice(diceResults);
  };
  function rollDice(diceResults) {
    const diceContainer = document.getElementById('diceContainer');
    diceContainer.innerHTML = '';

    diceResults.forEach((result) => {
      result.rolls.forEach((roll, i) => {
        const dice = document.createElement('div');
        dice.className = `dice-face dice-${result.type}`;
        dice.style.backgroundImage = getDiceImageUrl(result.type);
        dice.style.backgroundSize = 'contain';
        dice.textContent = '...';
        diceContainer.appendChild(dice);

        setTimeout(() => {
          dice.textContent = roll;
          dice.style.animation = 'none';
        }, 350 * (i + 1));
      });
    });

    diceContainer.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  }

  function getDiceImageUrl(diceType) {
    const urls = {
      4: 'https://utfs.io/f/b4b53167-45c5-454b-aaaa-93417478cf69-2fk.png',
      6: 'https://utfs.io/f/d1aca81d-17a1-48d7-a7be-ceee748f4361-2fm.png',
      8: 'https://utfs.io/f/7fcca6b6-a4f2-49ff-8e9f-77ee83363a95-2fo.png',
      10: 'https://utfs.io/f/06f0436a-ead7-4bb9-a942-49a3d402dca8-23cz.png',
      12: 'https://utfs.io/f/8c038c6d-e41f-4632-9cb2-681de6986ead-23d1.png',
      20: 'https://utfs.io/f/17da7839-eb61-4b51-8927-ebab31a83eef-23du.png',
      100: 'https://utfs.io/f/115694a7-ef00-4044-88c0-22709d68e642-1sw7h.png',
    };
    return `url('${urls[diceType]}')`;
  }

  // function dragElement(element) {
  //     let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  //     element.onmousedown = dragMouseDown;

  //     function dragMouseDown(e) {

  //         if (['INPUT', 'TEXTAREA', 'BUTTON', 'SELECT', 'OPTION'].includes(e.target.tagName)) {
  //             return;
  //         }

  //         e.preventDefault();
  //         pos3 = e.clientX;
  //         pos4 = e.clientY;
  //         document.onmouseup = closeDragElement;
  //         document.onmousemove = elementDrag;
  //     }

  //     function elementDrag(e) {
  //         e.preventDefault();
  //         pos1 = pos3 - e.clientX;
  //         pos2 = pos4 - e.clientY;
  //         pos3 = e.clientX;
  //         pos4 = e.clientY;

  //         element.style.top = (element.offsetTop - pos2) + "px";
  //         element.style.left = (element.offsetLeft - pos1) + "px";
  //     }

  //     function closeDragElement() {

  //         document.onmouseup = null;
  //         document.onmousemove = null;
  //     }
  // }

  // dragElement(diceModal);
});
