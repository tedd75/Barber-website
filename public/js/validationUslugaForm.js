function validateForm() {

    const nazwaInput = document.getElementById('nazwa');
    const rodzajInput = document.getElementById('rodzaj');

    const errorNazwa = document.getElementById('errorNazwa');
    const errorRodzaj = document.getElementById('errorRodzaj');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([nazwaInput, rodzajInput], [errorNazwa, errorRodzaj], errorsSummary);


    let valid = true;

    if (!checkRequired(nazwaInput.value)) {
        valid = false;
        nazwaInput.classList.add("error-input");
        errorNazwa.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(nazwaInput.value, 2, 60)) {
        valid = false;
        nazwaInput.classList.add("error-input");
        errorNazwa.innerText = "Pole powinno zawierac od 2 do 60 znakow";
    } else if (!notText(nazwaInput.value)) {
        valid = false;
        nazwaInput.classList.add("error-input");
        errorNazwa.innerText = "Pole nie powinno zawierac innego znaku niz tekst";
    }

    if (!checkRequired(rodzajInput.value)) {
        valid = false;
        rodzajInput.classList.add("error-input");
        errorRodzaj.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(rodzajInput.value, 2, 60)) {
        valid = false;
        rodzajInput.classList.add("error-input");
        errorRodzaj.innerText = "Pole powinno zawierac od 2 do 60 znakow";
    } else if (!notText(rodzajInput.value)) {
        valid = false;
        rodzajInput.classList.add("error-input");
        errorRodzaj.innerText = "Pole nie powinno zawierac innego znaku niz tekst";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera bledy";
    }

    return valid;

} 