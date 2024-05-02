const inputs = document.querySelectorAll('.sheet-submit');

inputs.forEach(input => {
    input.addEventListener('blur', function() {
        submitForm();
    });
});

function submitForm() {
    document.querySelector('#form-edit-sheet').submit();
}