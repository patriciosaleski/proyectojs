const regEx = {
    names: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    phone: /^\d{1,4}?[-.\s]?\d{1,3}?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
    number: /^([1-9]|[1-9]\d{1,7}|1[01]\d{7}|120000000)$/,
    cardNumber: /^(?:\d[ \-]*){15,16}$/,
    cardPin: /^(?:\d[ \-]*){3,4}$/
}

function inputError(array, log){
    let target = array.id
    document.getElementById(target).classList.add('input-error');
    log.push(false);
    return;
}

function isOverEighteen(birthDay){
	let passengerBirthday = new Date(birthDay);
	let today = new Date().toISOString().slice(0,10);
	let passengerAge = ~~((Date.now(today) - passengerBirthday) / (31557600000));
    return (passengerAge < 18) ? false : true;
}

function destinyValidation(){
    let inputs = document.querySelectorAll('select[name="destination"], input[name="date-of-travel"]');
    for (let i = 0; i < inputs.length; i++){
        inputs[i].value || inputError(inputs[i]);
    }
    return (inputs[0].value && inputs[1].value) ? true : false;
}

function passengerValidation(){
    let inputs = document.getElementById('passenger__container').querySelectorAll('select, input[type="text"], input[type="number"], input[type="date"]');
    let log = [];
    for (let i = 0; i < inputs.length; i++){
        let object = inputs[i];
        let name = inputs[i].name;
        switch (name){
            case 'name': case 'surname':
                regEx.names.test(object.value) || inputError(inputs[i], log);
                break;
            case 'birthday':
                isOverEighteen(object.value) || inputError(inputs[i], log);
                break;
            case 'document':
                (object.value == 'du' || object.value == 'passport') || inputError(inputs[i], log);
                break;
            case 'id-number':
                regEx.number.test(object.value) || inputError(inputs[i], log);
                break;
            case 'nationality': case 'gender':
                object.value != '' || inputError(inputs[i], log);
                break;
        }
    }
    return (!log.includes(false)) ? true : false;
}

function checkEmailAddress(){
    let email = document.querySelector('input[type="email"]');
    return (regEx.email.test(email.value)) ? true : (inputError(email), false);
}

function checkPhoneNumber(){
    let phoneArray = document.querySelectorAll('input[name="country-code"], input[name="area-code"], input[name="phone-number"]');
    let number = "";
    for (let i=0; i<phoneArray.length; i++){
        number += phoneArray[i].value;
    }
    if (regEx.phone.test(number)){
        return true;
    } else {
        document.getElementById('contact-phone').classList.add('input-error');
        return false;
    }
}

function formValidation(){
    let a = destinyValidation();
    let b = passengerValidation();
    let c = checkEmailAddress();
    let d = checkPhoneNumber();
    return a && b && c && d;
}

// validacion del metodo de pago
function payment(){
    const inputs = document.querySelectorAll('.booking__payment--card input, .booking__payment--card select');
    const CURRENT_MONTH = new Date().toISOString().split('-')[1];
    const CURRENT_YEAR = new Date().toISOString().split('-')[0];
    let log = [];
    for (let i = 0; i < inputs.length; i++){
        let object = inputs[i];
        let name =  inputs[i].name;
        switch (name){
            case 'card-number':
                regEx.cardNumber.test(object.value) || inputError(inputs[i], log);
                break;
            case 'card-name':
                regEx.names.test(object.value) || inputError(inputs[i], log);
                break;
            case 'expiration-month':
                (object.value != '' && object.value >= CURRENT_MONTH) || inputError(inputs[i], log);
                break;
            case 'expiration-year':
                (object.value != '' && object.value >= CURRENT_YEAR) || inputError(inputs[i], log);
                break;
            case 'card-pin':
                regEx.cardPin.test(object.value) || inputError(inputs[i], log);
                break;
        }
    }
    console.log((!log.includes(false)) ? true : false);
    return (!log.includes(false)) ? true : false;
}
