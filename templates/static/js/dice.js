document.addEventListener('DOMContentLoaded', function () {
    const diceButton = document.querySelector('.diceButton');
    const diceModal = document.querySelector('.diceModal');
    const closeDice = document.getElementById('closeDice');
    const formDice = document.getElementById('formDice'); // Corrected from class to id
    const resultDisplay = document.getElementById('resultDisplay');

    diceButton.addEventListener('click', function() {
        diceModal.style.display = "block";
    });

    closeDice.addEventListener('click', function() {
        diceModal.style.display = "none";
    });

    formDice.onsubmit = function(event) {
        event.preventDefault();

        const quantity = parseInt(document.getElementById('quantityDice').value);
        const diceType = parseInt(document.getElementById('typeDice').value);
        const modifier = parseInt(document.getElementById('modDice').value);
        let total = 0;

        for (let i = 0; i < quantity; i++) {
            total += Math.floor(Math.random() * diceType) + 1;
            console.log({total})
        }

        total += modifier;
        resultDisplay.innerHTML = `<strong>Resultado: </strong> ${total}`;
    };
});