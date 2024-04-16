document.addEventListener('DOMContentLoaded', function () {
    const diceButton = document.querySelector('.diceButton');
    const diceModal = document.querySelector('.diceModal');
    const closeDice = document.getElementById('closeDice');

    diceButton.addEventListener('click', function() {
        diceModal.style.display = "block";
    });

    closeDice.addEventListener('click', function() {
        diceModal.style.display = "none";
    });
    
});