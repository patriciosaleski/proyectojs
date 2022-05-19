// - - - - - - - destionations.html JS code
const marsButton = document.getElementById('mars');
const moonButton = document.getElementById('moon');
const container = document.getElementById('container');

marsButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

moonButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});


const travelToMars = document.getElementById('travel-to-mars');
const travelToMoon = document.getElementById('travel-to-moon');

travelToMars.addEventListener('click', () => {
    let destination = 'mars';
    sessionStorage.setItem('choosen-destination', destination);
    window.location='./booking.html'
});

travelToMoon.addEventListener('click', () => {
    let destination = 'moon';
    sessionStorage.setItem('choosen-destination', destination);
    window.location='./booking.html'
});