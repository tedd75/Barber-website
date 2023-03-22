function validateForm() {

    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const telNumInput = document.getElementById('telNum');

    const errorFirstName = document.getElementById('errorFirstName');
    const errorLastName = document.getElementById('errorLastName');
    const errorTelNum = document.getElementById('errorTelNum');
    const errorsSummary = document.getElementById('errorsSummary');

    const reqMessage = document.getElementById('errorMessage-required').innerText;

    resetErrors([firstNameInput, lastNameInput, telNumInput], [errorFirstName, errorLastName, errorTelNum], errorsSummary);

    let valid = true;

    if (!checkRequired(firstNameInput.value)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = reqMessage;
    } else if (!checkTextLengthRange(firstNameInput.value, 2, 60)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole powinno zawierac od 2 do 60 znakow";
    } else if (!notText(firstNameInput.value)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole nie powinno zawierac innego znaku niz tekst";
    }

    if (!checkRequired(lastNameInput.value)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(lastNameInput.value, 2, 60)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole powinno zawierac od 2 do 60 znakow";
    } else if (!notText(lastNameInput.value)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole nie powinno zawierac innego znaku niz tekst";
    }

    if (!checkRequired(telNumInput.value)) {
        valid = false;
        telNumInput.classList.add("error-input");
        errorTelNum.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(telNumInput.value, 9, 12)) {
        valid = false;
        telNumInput.classList.add("error-input");
        errorTelNum.innerText = "Pole powinno zawierac od 9 do 12 znakow";
    } else if (!checkTelNum(telNumInput.value)) {
        valid = false;
        telNumInput.classList.add("error-input");
        errorTelNum.innerText = "Pole powinno zawierac prawidlowy numer telefonu";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera bledy";
    }

    return valid;

} 