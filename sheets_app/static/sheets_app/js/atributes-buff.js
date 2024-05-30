document.addEventListener('DOMContentLoaded', function () {
    const raceSelect = document.getElementById('race');
    const strengthInput = document.getElementById('strength_buff');
    const intelligencInput = document.getElementById('intelligence_buff');
    const wisdomInput = document.getElementById('wisdom_buff');
    const charismaInput = document.getElementById('charisma_buff');
    const constitutionInput = document.getElementById('constitution_buff');
    const speedInput = document.getElementById('speed_buff');

    raceSelect.addEventListener('change', function () {
        const selectedOption = raceSelect.options[raceSelect.selectedIndex];
        strengthInput.value = selectedOption.getAttribute('data-strength');
        intelligencInput.value = selectedOption.getAttribute('data-intelligence');
        wisdomInput.value = selectedOption.getAttribute('data-wisdom');
        charismaInput.value = selectedOption.getAttribute('data-charisma');
        constitutionInput.value = selectedOption.getAttribute('data-constitution');
        speedInput.value = selectedOption.getAttribute('data-speed');
    });
});

