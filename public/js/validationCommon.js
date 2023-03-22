function resetErrors(inputs, errorTexts, errorInfo) {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove("error-input");
    }
    for (let i = 0; i < errorTexts.length; i++) {
        errorTexts[i].innerText = "";
    }
    errorInfo.innerText = "";
}

function checkRequired(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    if (value === "") {
        return false;
    }
    return true;
}

function notText(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    return value.length >= 2 && value.length <= 60 && !value.match(/[^a-zA-Z ]/);
}
function checkTextLengthRange(value, min, max) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const length = value.length;
    if (length < min || length > max) {
        return false;
    }
    return true;
}

function checkTelNum(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const re = value.replace(/[^\d]/g, ""); // remove non-numeric characters
    return re.length >= 9 && re.length <= 12 && re.match(/^[0-9]+$/);


}

function checkNumber(value) {
    if (!value) {
        return false;
    }
    if (isNaN(value)) {
        return false;
    }
    return true;
}

function checkNumberRange(value, min, max) {
    if (!value) {
        return false;
    }
    if (isNaN(value)) {
        return false;
    }
    value = parseFloat(value);
    if (value < min || value > max) {
        return false;
    }
    if (value < min || value > max) {
        return false;
    }
    if (value > max) {
        return false;
    }
    return true;
}

function checkDate(value) {
    if (!value) {
        return false;
    }
    const pattern = /(\d{4})-(\d{2})-(\d{2})/;
    return pattern.test(value);
}

function checkDateIfBefore(value, compareTo) {
    if (!value) {
        return false;
    }
    if (!compareTo) {
        return false;
    }
    const pattern = /(\d{4})-(\d{2})-(\d{2})/;
    if (!pattern.test(compareTo)) {
        return false;
    }
    const valueDate = new Date(value);
    const compareToDate = new Date(compareTo);
    if (valueDate.getTime() < compareToDate.getTime()) {
        return false;
    }
    return true;
}
