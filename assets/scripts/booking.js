esversion: 6

// - - - - - - - booking.html JS code

// Array con los datos de cada reserva
const bookingInfo = [];
// Clase con los datos de cada pasajero
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
}

// Clase con los datos de contacto de la reserva
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

// Clase con la informacion del viaje, destino, fecha y cantidad de pasajeros de la reserva (no el total)
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
        <div class="passenger__data" id="passenger-${passengerQuantity}">
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
                        <option>Seleccione una opción</option>
                        <option value="du">Documento Único</option>
                        <option value="passport">Pasaporte</option>
                    </select>
                </form class="wrapper">
                <form class="wrapper">
                    <label for="id-number">Número</label>
                    <input type="number" required min="1" max="120000000" id="passenger-${passengerQuantity}-document-number">
                </form>
                <form class="wrapper">
                    <label for="nationality">Nacionalidad</label>
                    <select name="nationality" id="passenger-${passengerQuantity}-nationality">
                        <option>Seleccione una opción</option>
                        <option value="argentina">Argentina</option>
                        <option value="bolivia">Boliviana</option>
                        <option value="paraguay">Paraguaya</option>
                        <option value="peru">Peruana</option>
                        <option value="chile">Chilena</option>
                        <option value="uruguay">Uruguaya</option>
                        <option value="ecuador">Ecuatoriana</option>
                        <option value="colombia">Colombiana</option>
                        <option value="venezuela">Venezolana</option>
                        <option value="brazil">Brasileña</option>
                    </select>
                </form>
            </div>
        </div>
    </div>
    `
    accordionUpdate();
}

// Remueve el último formulario para coincidir con la cantidad de pasajeros
function removePassengerForm() {
    passengerData.removeChild(passengerData.lastElementChild);
}

const addPassenger = document.getElementById('addPassenger');
const removePassenger = document.getElementById('removePassenger');
// Agrega pasajeros, maximo 10
addPassenger.addEventListener('click', () => {
    let passengerQuantity = parseInt(document.getElementById('passengerQuantity').value);
    if(passengerQuantity < 10) {
        passengerQuantity++;
        document.getElementById('passengerQuantity').value = passengerQuantity;
        addPassengerForm(passengerQuantity);
    }
});

// Remueve pasajeros
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
// Dependiendo el destino seleccionado muestra información del mismo
choosenDestination.addEventListener('change', () => {
    let status = choosenDestination.value;
    if (status == 'moon') {
        moonSelect.classList.add('active');
        marsSelect.classList.remove('active');
        noDestination.classList.remove('active');
        travelToDestination.innerHTML = `<i class="fa-regular fa-clock"></i> 4 Días`;
    } else if (status == 'mars') {
        marsSelect.classList.add('active');
        moonSelect.classList.remove('active');
        noDestination.classList.remove('active');
        travelToDestination.innerHTML = `<i class="fa-regular fa-clock"></i> 7 Meses`;
    } else {
        marsSelect.classList.remove('active');
        moonSelect.classList.remove('active');
        noDestination.classList.add('active');
        travelToDestination.innerHTML = `<i class="fa-regular fa-clock"></i> --`;
    }
});

const accor = document.getElementsByClassName('accordion');
// Funcion para crear el menu desplegable en base a la cantidad de pasajeros ingresada
function accordionUpdate(){
    for (let i = 0; i < accor.length; i++) {
        accor[i].addEventListener('click', function() {
            this.classList.toggle('open');
    
            let accordion__panel = this.nextElementSibling;
            if (accordion__panel.style.display == 'grid') {
                accordion__panel.style.display = 'none';
            } else {
                accordion__panel.style.display = 'grid';
            }
        });
    }
}
accordionUpdate();

// Funcion que guarda los datos del destino, fecha y cantidad de pasajeros por reserva
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
        console.log(i);
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

// Funcion que guarda los datos de contacto de cada reserva
function loadBookingContact() {
    let mail = document.getElementById('booking-email').value;
    let areaCode = document.getElementById('phone-area').value;
    let phoneNumber = document.getElementById('phone-number').value;
    bookingInfo.push(new ContactData(mail, areaCode, phoneNumber));
    return bookingInfo;
}

const submitButton = document.getElementById('form-submit');
// Cuando el usuario complete todo el formulario y le de click 
// al boton Finalizar se procede a cargar los datos en el array
submitButton.addEventListener('click', () => {
    loadTravelInfo();
    loadPassengerInfo();
    loadBookingContact();
    console.log(bookingInfo);
});
