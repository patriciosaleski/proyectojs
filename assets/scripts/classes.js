esversion: 6

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
    constructor (mail,countryCode ,areaCode, phoneNumber){
        this.mail = mail;
        this.countryCode = `+${countryCode}`;
        this.areaCode = areaCode;
        this.phoneNumber = phoneNumber;
    }

    contactInfo() {
        console.log(`Datos de contacto: Email: ${this.mail} - Numero de teléfono: ${this.countryCode} ${this.areaCode} ${this.phoneNumber}`);
    }
}


class TravelInfo {
    constructor (destination, date, passengers){
        this.destination = destination;
        this.date = date;
        this.passengers = passengers;
    }
}


const cardType = document.getElementById('card-type');
let activeCard = false;
let cardCheck = new Cleave('.card-number', {
    creditCard: true,
    onCreditCardTypeChanged: function (type) {
        switch (type) {
            case 'diners':
                cardType.classList.add(`fa-cc-diners-club`);
                break;
            case 'unknown':
                cardType.className = "fa-brands";
                break;
            default:
                cardType.classList.add(`fa-cc-${type}`);
                break;
        }
    }
});

let cardCVVCheck = new Cleave('.card-pin', {
    numericOnly: true,
    blocks: [3]
});