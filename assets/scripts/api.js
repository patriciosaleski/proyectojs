esversion: 6

const marsHighTemp = document.getElementById('mars-hi-temp');
const marsLowTemp = document.getElementById('mars-lo-temp');

fetch('https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json')
.then(async response => {
    // verifica que los datos sean .json y de ser verdadero se guardan en la constante data, caso contrario da null.
    const JSONCheck = response.headers.get('content-type')?.includes('application/json');
    const data = JSONCheck ? await response.json() : null;

    if (response.ok) {
        // muestra los datos de la API en la pagina
        let upToDateData = data.soles[0]
        marsHighTemp.innerHTML = `Max ${upToDateData.max_temp} °C`
        marsLowTemp.innerHTML = `Min ${upToDateData.min_temp} °C`
    } else if (!response.ok) {
        // recibe el error del API o el response status
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
    }
})
.catch(error => {
    const element = document.getElementById('error-msg');
    element.style.display = 'block'
    element.innerHTML = `API error: ${error}`
    marsHighTemp.innerHTML = `N/A`
    marsLowTemp.innerHTML = `N/A`
});