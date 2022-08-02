esversion: 6

const addPassenger = document.getElementById('addPassenger');
const removePassenger = document.getElementById('removePassenger');

addPassenger.addEventListener('click', () => {
    let passengerQuantity = parseInt(document.getElementById('passengerQuantity').value);
    if(passengerQuantity < 10) {
        passengerQuantity++;
        document.getElementById('passengerQuantity').value = passengerQuantity;
        addPassengerForm(passengerQuantity);
        setLimits();
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


const submitButton = document.getElementById('form-submit');
submitButton.addEventListener('click', () => {
    if (formValidation()) {
        bookingInfo.splice(0, bookingInfo.length);
        loadTravelInfo();
        loadPassengerInfo();
        loadBookingContact();
        generatePrices();
        removeInputError();
        document.getElementById('error-msg').style.display = 'none';
        Swal.fire({
            icon: 'success',
            title: '¡Reserva confirmada!',
            text: 'La reserva para el viaje ha sido exitosa',
            showConfirmButton: false,
            timer: 3000,
        });
        displayFakeLoading();
        generatePrices();
    } else {
        Swal.fire(
            'Ha ocurrido un error',
            'Uno o mas datos son incorrectos, intente de nuevo.',
            'error'
        );
        document.getElementById('error-msg').style.display = 'block';
        document.getElementById('error-msg').innerHTML = `
            <p>Uno o más datos ingresados son inválidos. Verifiquelos e intente nuevamente.</p>
            <p><i>Todos los campos son obligatorios. Los pasajeros deben ser mayores de 18 años al momento de realizar la reserva.</i></p>
        `
    }
    console.log(bookingInfo);
});


// previene realizar reservas en fechas pasadas
const travelDate = document.getElementById('travelDate');
travelDate.addEventListener('focus', () => {
    let today = new Date().toISOString().split('T')[0];
    travelDate.setAttribute('min', today);
});

// dependiendo el destino seleccionado muestra información del mismo
choosenDestination.addEventListener('change', () => {
    displayDestinationInfo();
});


const CVVHelp = document.getElementById('CVVHelp');
CVVHelp.addEventListener('click', () => {
    Swal.fire({
        title: '¿Donde se encuentra el CSC?',
        text: 'Es un numero de 3 dígitos ubicado en el reverso de la tarjeta.',
        imageUrl: '../img/cvv.png',
        imageWidth: 398,
        imageHeight: 240,
        imageAlt: 'El código de seguridad de la tarjeta se encuentra en el dorso de la misma, consta de 3 dígitos.',
    });
});

// Esconde el formulario de pago para volver a mostrar los datos de la reserva
// en caso de que el usuario quiera realizar un cambio
const backToOrderReview = document.getElementById('back-to-order-review');
backToOrderReview.addEventListener('click', () => {
    document.getElementsByClassName('booking__payment')[0].classList.add('hidden');
    let bookingChildren = document.getElementById('booking').children;
    let i = 0;
    while (bookingChildren[i].className != 'booking__payment hidden') {
        bookingChildren[i].classList.remove('hidden');
        i++;
    }
});


const payButton = document.getElementById('pay-button');
payButton.addEventListener('click', () => {
    if (payment()){
        removeInputError();
        Swal.fire({
            icon: 'success',
            title: '¡Pago realizado correctamente!',
            text: 'En los proximos minutos recibiras un correo con los detalles de la reserva y pasos a seguir.'
        });
    } else {
        Swal.fire(
            'Ha ocurrido un error',
            'Los datos del pago son incorrectos, intente nuevamente.',
            'error'
        );
    }
});
