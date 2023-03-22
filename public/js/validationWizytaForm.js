function validateForm() {

    const klientInput = document.getElementById('klient');
    const uslugaInput = document.getElementById('usluga');
    const cenaInput = document.getElementById('cena');
    const dataInput = document.getElementById('data');

    const errorKlient = document.getElementById('errorKlient');
    const errorUsluga = document.getElementById('errorUsluga');
    const errorCena = document.getElementById('errorCena');
    const errorData = document.getElementById('errorData');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([klientInput, uslugaInput, cenaInput, dataInput], [errorKlient, errorUsluga, errorCena, errorData], errorsSummary);

    let valid = true;

    if (!checkRequired(klientInput.value)) {
        valid = false;
        klientInput.classList.add("error-input");
        errorKlient.innerText = "Pole jest wymagane";
    }
    if (!checkRequired(uslugaInput.value)) {
        valid = false;
        uslugaInput.classList.add("error-input");
        errorUsluga.innerText = "Pole jest wymagane";
    }
    if (!checkRequired(cenaInput.value)) {
        valid = false;
        cenaInput.classList.add("error-input");
        errorCena.innerText = "Pole jest wymagane";
    } else if (!checkNumber(cenaInput.value)) {
        valid = false;
        cenaInput.classList.add("error-input");
        errorCena.innerText = "Pole powinno byc liczbą"
    } else if (!checkNumberRange(cenaInput.value, 50, 500)) {
        valid = false;
        cenaInput.classList.add("error-input");
        errorCena.innerText = "Pole powinno byc liczba w zakresie 50 do 500";
    }

    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + nowDate.getDate(),
        year = nowDate.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    const nowString = [year, month, day].join('-');

    if (!checkRequired(dataInput.value)) {
        valid = false;
        dataInput.classList.add("error-input");
        errorData.innerText = "Pole jest wymagane";
    } else if (!checkDateIfBefore(dataInput.value, nowString)) {
        valid = false;
        dataInput.classList.add("error-input");
        errorData.innerText = "Data nie moze byc z przeszlosci"
    } else if (!checkDate(dataInput.value)) {
        valid = false;
        dataInput.classList.add("error-input");
        errorData.innerText = "Pole powinnno zawierac date w formacie yyyy-mm-dd (np.2000-01-01)";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera bledy";
    }
    return valid;
}