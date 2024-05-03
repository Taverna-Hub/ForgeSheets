const inputs = document.querySelectorAll('.sheet-submit');

inputs.forEach(input => {
    const inputValue = input.value
    input.addEventListener('blur', function(event) {
        if (event.target.value === inputValue) {
            return 
        } else {
            submitForm()
        }
    });
});

function submitForm() {
    document.querySelector('#form-edit-sheet').submit();
}