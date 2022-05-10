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
