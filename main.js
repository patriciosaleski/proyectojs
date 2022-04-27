esversion: 6
document.addEventListener("DOMContentLoaded", () => {
    const signUpButton = document.getElementById('mars');
    const signInButton = document.getElementById('moon');
    const container = document.getElementById('container');
    
    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });
    
    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });
});