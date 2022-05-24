esversion: 6

// - - - - - - - booking.html JS code

const bookingInfo = [];

class Passenger {
    constructor (name, surname, bday, sex, idType, idNumber, nationality){
        this.name = name;
        this.surname = surname;
        this.bday = bday;
        this.sex = sex;
        this.idType = idType;
        this.idNumber = idNumber;
        this.nationality = nationality;
    }

    getBirthday() {
        let today = new Date();
        let bday = new Date(this.bday);
        let yearsLived = today.getFullYear() - bday.getFullYear();  // Devuelve la cantidad de años vivida
        let monthsLived = today.getMonth() - bday.getMonth();   // Devuelve la cantidad de meses vivida
        if (monthsLived < 0 || (monthsLived === 0 && today.getDate() < bday.getDate())) {
            yearsLived--;
        }
        console.log(`El pasajero llamado ${this.name} tiene ${yearsLived} años.`);
    }
}


class ContactData {
    constructor (mail, areaCode, phoneNumber){
        this.mail = mail;
        this.areaCode = areaCode;
        this.phoneNumber = phoneNumber;
    }

    contactInfo() {
        console.log(`Datos de contacto: Email ${this.mail} Numero de teléfono: ${this.areaCode} ${this.phoneNumber}`);
    }
}


class TravelInfo {
    constructor (destination, date, passengers){
        this.destination = destination;
        this.date = date;
        this.passengers = passengers;
    }
}


const passengerData = document.getElementById('passenger__container');
// Crea un form por cada pasajero
function addPassengerForm(passengerQuantity) {
        passengerData.innerHTML += `
        <div class="booking__passenger--container--data" id="passenger-${passengerQuantity}">
        <button class="accordion">Datos del pasajero #${passengerQuantity}</button>
        <div class="accordion__panel">
            <div class="passenger__data--name">
                <form>
                    <div class="wrapper">
                        <label for="name">Nombres</label>
                        <input type="text" name="name" id="passenger-${passengerQuantity}-name" placeholder="Ingrese su nombre" required>
                    </div>
                    <div class="wrapper">
                        <label for="surname">Apellidos</label>
                        <input type="text" name="surname" id="passenger-${passengerQuantity}-surname" placeholder="Ingrese su apellido" required>
                    </div>
                </form>
            </div>
            <div class="passenger__data--birth">
                <form>
                    <div class="wrapper">
                        <label for="birthday">Fecha de nacimiento</label>
                        <input type="date" name="birthday" id="passenger-${passengerQuantity}-birthday">
                    </div>
                    <div class="passenger__data--birth--gender wrapper">
                        Sexo
                        <div class="container">
                            <div>
                                <label for="gender">Hombre</label>
                                <input type="radio" name="passenger-${passengerQuantity}-gender" value="male">
                            </div>
                            <div>
                                <label for="gender">Mujer</label>
                                <input type="radio" name="passenger-${passengerQuantity}-gender" value="female">
                            </div>
                            <div>
                                <label for="gender">Otro</label>
                                <input type="radio" name="passenger-${passengerQuantity}-gender" value="other">
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="passenger__data--id">
                <form class="wrapper">
                    <label for="document">Tipo de documento</label>
                    <select name="document" id="passenger-${passengerQuantity}-document">
                        <option value="" disabled selected>Seleccione una opción</option>
                        <option value="du">Documento Único</option>
                        <option value="passport">Pasaporte</option>
                    </select>
                </form class="wrapper">
                <form class="wrapper">
                    <label for="id-number">Número</label>
                    <input type="number" required min="1" max="120000000" id="passenger-${passengerQuantity}-document-number" placeholder="12.345.678">
                </form>
                <form class="wrapper">
                    <label for="nationality">Nacionalidad</label>
                    <select name="nationality" id="passenger-${passengerQuantity}-nationality">
                        <option value="" disabled selected>Seleccione una opción</option>
                        <option value="argentina">Argentina</option>
                        <option value="bolivia">Boliviana</option>
                        <option value="brazil">Brasileña</option>
                        <option value="chile">Chilena</option>
                        <option value="colombia">Colombiana</option>
                        <option value="ecuador">Ecuatoriana</option>
                        <option value="paraguay">Paraguaya</option>
                        <option value="peru">Peruana</option>
                        <option value="uruguay">Uruguaya</option>
                        <option value="venezuela">Venezolana</option>
                    </select>
                </form>
            </div>
        </div>
    </div>
    `
    accordionUpdate();
}

function removePassengerForm() {
    passengerData.removeChild(passengerData.lastElementChild);
}

const addPassenger = document.getElementById('addPassenger');
const removePassenger = document.getElementById('removePassenger');

addPassenger.addEventListener('click', () => {
    let passengerQuantity = parseInt(document.getElementById('passengerQuantity').value);
    if(passengerQuantity < 10) {
        passengerQuantity++;
        document.getElementById('passengerQuantity').value = passengerQuantity;
        addPassengerForm(passengerQuantity);
    }
});


removePassenger.addEventListener('click', () => {
    let passengerQuantity = parseInt(document.getElementById('passengerQuantity').value);
    if(passengerQuantity > 1) {
        passengerQuantity--;
        document.getElementById('passengerQuantity').value = passengerQuantity;
        removePassengerForm(passengerQuantity);
    }
});


const choosenDestination = document.getElementById('destination');
const noDestination = document.getElementById('no-destination');
const travelToDestination = document.getElementById('travel-time');
const moonSelect = document.getElementById('moon-select');
const marsSelect = document.getElementById('mars-select');
choosenDestination.value = sessionStorage.getItem('choosen-destination');

function displayDestinationInfo() {
    if (choosenDestination.value == 'moon') {
        moonSelect.classList.add('active');
        marsSelect.classList.remove('active');
        noDestination.classList.remove('active');
        travelToDestination.innerHTML = `<i class="fa-regular fa-clock"></i> 4 Días`;
    } else if (choosenDestination.value == 'mars') {
        marsSelect.classList.add('active');
        moonSelect.classList.remove('active');
        noDestination.classList.remove('active');
        travelToDestination.innerHTML = `<i class="fa-regular fa-clock"></i> 7 Meses`;
    } else {
        marsSelect.classList.remove('active');
        moonSelect.classList.remove('active');
        noDestination.classList.add('active');
        travelToDestination.innerHTML = `<i class="fa-regular fa-clock"></i> --`;
        choosenDestination.value = '';
    }
}

displayDestinationInfo();
// Dependiendo el destino seleccionado muestra información del mismo
choosenDestination.addEventListener('change', () => {
    displayDestinationInfo();
});

const accor = document.getElementsByClassName('accordion');
// Funcion para crear el menu desplegable en base a la cantidad de pasajeros ingresada
function accordionUpdate(){
    for (let i = 0; i < accor.length; i++) {
        accor[i].addEventListener('click', function() {
            this.classList.toggle('open');
            let accordionPanel = this.nextElementSibling;
            accordionPanel.style.display = accordionPanel.style.display == 'grid' ?  'none' : 'grid';
        });
    }
}
accordionUpdate();


function loadTravelInfo() {
    let destination = document.getElementById('destination').value;
    let date = document.getElementById('travelDate').value;
    let passengers = document.getElementById('passengerQuantity').value;
    bookingInfo.push(new TravelInfo(destination, date, passengers));
    return bookingInfo;
}

// Funcion que guarda los datos de cada pasajero por reserva separados
function loadPassengerInfo() {
    let passengerQuantity = document.getElementById('passengerQuantity').value;
    for (let i = 1; i <= passengerQuantity; i++) {
        let name = document.getElementById(`passenger-${i}-name`).value;
        let surname = document.getElementById(`passenger-${i}-surname`).value;
        let bday = document.getElementById(`passenger-${i}-birthday`).value;
        let sex = document.querySelector(`input[name='passenger-${i}-gender']:checked`).value;
        let idType = document.getElementById(`passenger-${i}-document`).value;
        let idNumber = document.getElementById(`passenger-${i}-document-number`).value;
        let nationality = document.getElementById(`passenger-${i}-nationality`).value;
        bookingInfo.push(new Passenger(name, surname, bday, sex, idType, idNumber, nationality));
    }
    return bookingInfo;
}


function loadBookingContact() {
    let mail = document.getElementById('booking-email').value;
    let areaCode = document.getElementById('phone-area').value;
    let phoneNumber = document.getElementById('phone-number').value;
    bookingInfo.push(new ContactData(mail, areaCode, phoneNumber));
    return bookingInfo;
}

const submitButton = document.getElementById('form-submit');
submitButton.addEventListener('click', () => {
    formValidation();
    if (formValidation) {
        loadTravelInfo();
        loadPassengerInfo();
        loadBookingContact();
    }
    console.log(bookingInfo);
});

const travelDate = document.getElementById('travelDate');
travelDate.addEventListener('focus', () => {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    let day = today.getDate() + 1;
    let dateString = `${year}-${month}-${day}`;
    travelDate.setAttribute('min', dateString);
});


// Form validator

function inputError(array, index) {
    let targetInput = document.getElementById(array[index].id);
    targetInput.classList.add('input-error');
    return false;
}

function formValidation() {
    let inputs = document.querySelectorAll('select, input[type="text"], input[type="number"], input[type="date"], input[type="radio"]:checked, input[type="tel"], input[type="email"]');
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value || inputError(inputs, i);
    }
    if (inputError == false) {
        return false;
    } else {
        return true;
    }
}
