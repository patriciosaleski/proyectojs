esversion: 6

// - - - - - - - booking.html JS code

const TODAY = new Date().toISOString().split('T')[0]; // devuelve AAAA-MM-DD del dia actual UTC-3

const passengerData = document.getElementById('passenger__container');
// crea un form por cada pasajero
function addPassengerForm(passengerQuantity) {
        passengerData.innerHTML += `
        <div class="booking__passenger--container--data" id="passenger-${passengerQuantity}">
        <button class="accordion">Datos del pasajero #${passengerQuantity}</button>
        <div class="accordion__panel">
            <div class="passenger__data--name">
                <form>
                    <div class="flex-column">
                        <label for="name">Nombres</label>
                        <input type="text" name="name" id="passenger-${passengerQuantity}-name" placeholder="Ingrese su nombre" required>
                    </div>
                    <div class="flex-column">
                        <label for="surname">Apellidos</label>
                        <input type="text" name="surname" id="passenger-${passengerQuantity}-surname" placeholder="Ingrese su apellido" required>
                    </div>
                </form>
            </div>
            <div class="passenger__data--birth">
                <form>
                    <div class="flex-column">
                        <label for="birthday">Fecha de nacimiento</label>
                        <input name="birthday" class="birthday" id="passenger-${passengerQuantity}-birthday" placeholder="AAAA-MM-DD">
                    </div>
                    <div class="passenger__data--birth--gender flex-column">
                                <form class="flex-column">
                                    <label for="gender">Sexo</label>
                                    <select name="gender" id="passenger-${passengerQuantity}-gender">
                                        <option value="" disabled selected>Seleccione una opción</option>
                                        <option value="male">Hombre</option>
                                        <option value="female">Mujer</option>
                                        <option value="other">Otro</option>
                                    </select>
                                </form>
                            </div>
                </form>
            </div>
            <div class="passenger__data--id">
                <form class="flex-column">
                    <label for="document">Tipo de documento</label>
                    <select name="document" id="passenger-${passengerQuantity}-document">
                        <option value="" disabled selected>Seleccione una opción</option>
                        <option value="du">Documento Único</option>
                        <option value="passport">Pasaporte</option>
                    </select>
                </form class="flex-column">
                <form class="flex-column">
                    <label for="id-number">Número</label>
                    <input type="number" class="id-number" name="id-number" required id="passenger-${passengerQuantity}-document-number" placeholder="12.345.678">
                </form>
                <form class="flex-column">
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

// borra el ultimo formulario de pasajeros creado
function removePassengerForm() {
    passengerData.removeChild(passengerData.lastElementChild);
}

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


const accor = document.getElementsByClassName('accordion');
// funcion para crear el menu desplegable en base a la cantidad de pasajeros ingresada
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

// funcion que guarda los datos de cada pasajero por reserva separados
function loadPassengerInfo() {
    let passengerQuantity = document.getElementById('passengerQuantity').value;
    for (let i = 1; i <= passengerQuantity; i++) {
        let name = document.getElementById(`passenger-${i}-name`).value;
        let surname = document.getElementById(`passenger-${i}-surname`).value;
        let bday = document.getElementById(`passenger-${i}-birthday`).value;
        let sex = document.getElementById(`passenger-${i}-gender`).value;
        let idType = document.getElementById(`passenger-${i}-document`).value;
        let idNumber = document.getElementById(`passenger-${i}-document-number`).value;
        let nationality = document.getElementById(`passenger-${i}-nationality`).value;
        bookingInfo.push(new Passenger(name, surname, bday, sex, idType, idNumber, nationality));
    }
    return bookingInfo;
}

function loadBookingContact() {
    let mail = document.getElementById('booking-email').value;
    let countryCode = document.getElementById('country-code').value;
    let areaCode = document.getElementById('phone-area').value;
    let phoneNumber = document.getElementById('phone-number').value;
    bookingInfo.push(new ContactData(mail,countryCode , areaCode, phoneNumber));
    return bookingInfo;
}

// simulador de loading
function displayFakeLoading(){
    const element = document.getElementById('fake-loading');
    const paymentForm = document.getElementById('payment--form');
    element.classList.remove('hidden');
    for (let sibling of element.parentNode.children) {
        if (sibling != element) {
            sibling.classList.add('hidden');
        }
    }
    setTimeout(() => {
        element.classList.add('hidden');
        paymentForm.classList.remove('hidden');
    }, '5500')
}

const transportPrice = document.getElementById('transport-price');
const travelPrice = document.getElementById('travel-price');
const airportFees = document.getElementById('airport-fees');
const securityFees = document.getElementById('security-fees');
const subTotal = document.getElementById('price-subtotal');
const IVAPercent = document.getElementById('price-iva');
const total = document.getElementById('price-total');

// precios expresados en USD
const PRICES = {
    flightToCape: 850,
    moon: 125000,
    mars: 450000,
    airportFees: 25,
    securityFees: 55,
    IVA: 0.07 // 7%
}

function removeInputError(){
    const inputsWithError = document.querySelectorAll('.input-error');
    inputsWithError.forEach(el => el.classList.remove('input-error'));
}

function generatePrices(){
    const pricesParent = document.getElementsByClassName('item');
    let passengers = document.getElementById('passengerQuantity').value;
    let destination = document.getElementById('destination').value;
    let price = 0;

    transportPrice.innerHTML = `${Math.round(PRICES.flightToCape * passengers)}`;
    travelPrice.innerHTML = `${Math.round(PRICES[destination] * passengers)}`
    airportFees.innerHTML = `${Math.floor(PRICES.airportFees * passengers)}`
    securityFees.innerHTML = `${Math.floor(PRICES.securityFees * passengers)}`

    for (let i = 0; i < pricesParent.length; i++) {
        price += parseInt(pricesParent[i].children[1].innerHTML);
    }

    subTotal.innerHTML = `USD ${price}`
    IVAPercent.innerHTML = `USD ${(price * PRICES.IVA).toFixed(2)}`
    total.innerHTML = `USD ${price + (price * PRICES.IVA)}`
}
