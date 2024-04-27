document.addEventListener('DOMContentLoaded', function () {
    const diceButton = document.querySelector('.diceButton');
    const diceModal = document.querySelector('.diceModal');
    const closeDice = document.getElementById('closeDice');
    const formDice = document.getElementById('formDice'); 
    const resultDisplay = document.getElementById('resultDisplay');



   
    

    diceButton.addEventListener('click', function() {
        diceModal.style.display = "block";
    });

    closeDice.addEventListener('click', function() {
        diceModal.style.display = "none";
    });

    formDice.onsubmit = function(event) {
        event.preventDefault();
        const quantity = parseInt(document.getElementById('quantityDice').value) || 1;
        
        const diceType = parseInt(document.getElementById('typeDice').value) || 6 ;
        
        const modifier = parseInt(document.getElementById('modDice').value) || 0;
        
        let rolls = [];
        let total = 0;

        for (let i = 0; i < quantity; i++) {
            const roll = Math.floor(Math.random() * diceType) + 1;
            rolls.push(roll);
            total += roll;
        }

        total += modifier;
        resultDisplay.innerHTML = `<strong>Total: </strong> ${total} <br> <strong>Rolagens:</strong> ${rolls.join(', ')}`;
    };

    function dragElement(element) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        element.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            
            if (['INPUT', 'TEXTAREA', 'BUTTON', 'SELECT', 'OPTION'].includes(e.target.tagName)) {
                return; 
            }

            e.preventDefault(); 
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e.preventDefault(); 
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            
            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
           
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    
    dragElement(diceModal);

});