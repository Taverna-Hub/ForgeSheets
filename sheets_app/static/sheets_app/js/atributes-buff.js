const raceSelect = document.getElementById('race');
const strengthInput = document.getElementById('strength_buff');
const intelligenceInput = document.getElementById('intelligence_buff');
const wisdomInput = document.getElementById('wisdom_buff');
const charismaInput = document.getElementById('charisma_buff');
const constitutionInput = document.getElementById('constitution_buff');
const speedInput = document.getElementById('speed_buff');

raceSelect.addEventListener('change', function () {
    const selectedOption = raceSelect.options[raceSelect.selectedIndex];
    strengthInput.textContent = `${selectedOption.getAttribute('data-strength') > 0 ? '+' : ''}${selectedOption.getAttribute('data-strength')}`;
    intelligenceInput.textContent = `${selectedOption.getAttribute('data-intelligence') > 0 ? '+' : ''}${selectedOption.getAttribute('data-intelligence')}`;
    wisdomInput.textContent = `${selectedOption.getAttribute('data-wisdom') > 0 ? '+' : ''}${selectedOption.getAttribute('data-wisdom')}`;
    charismaInput.textContent = `${selectedOption.getAttribute('data-charisma') > 0 ? '+' : ''}${selectedOption.getAttribute('data-charisma')}`;
    constitutionInput.textContent = `${selectedOption.getAttribute('data-constitution') > 0 ? '+' : ''}${selectedOption.getAttribute('data-constitution')}`;
    speedInput.textContent = `${selectedOption.getAttribute('data-speed') > 0 ? '+' : ''}${selectedOption.getAttribute('data-speed')}`;
});

