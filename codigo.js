// Mapa a partir de leaflet
var mymap = L.map('mapid').setView([51.505, -0.09], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGlldGE5NiIsImEiOiJja2xuNTRuM3EwZnhkMndxajdlaTIyZWg1In0.nIgbphz0nKrqt5QvaCa38w', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token',
    setZoom: 13
}).addTo(mymap);

// Tomamos los elementos de HTML que completaremos con la info del IP
let locationSpan =document.getElementById("location");
let ipAdressSpan =document.getElementById("ip-adress");
let timezoneSpan =document.getElementById("timezone");
let ispSpan =document.getElementById("isp");

// Armamos una función para mostrar en pantalla la información que viene del IP
function showDataIP(ip,location,timezone,isp){
    ipAdressSpan.innerHTML=ip;
    ispSpan.innerHTML= isp;
    timezoneSpan.innerHTML=timezone;
    locationSpan.innerHTML=location;
};

let ipInput=document.getElementById("ip-input"); 
let ipInputButton =document.getElementById ("ip-input-button");

// Toma la data del IP
function getDataFromApi(ipValue){
    ip=ipValue;
    url =`https://geo.ipify.org/api/v1?apiKey=at_YKOtxrjfhl1ZbUVmAAa7XzUwThXDg&domain=${ip}`;
    fetch(url)
    .then(response => response.json())
    .then(data =>{
        let lat= data.location.lat;
        let lng= data.location.lng ;
        // Ejecutamos la función showDataIp para mostrar en pantalla los valores que necesitamos
        showDataIP (ip,
            `${data.location.city}, ${data.location.region}, ${data.location.country}`,
            data.location.timezone,
            data.isp);
        // Marcamos en el mapa la localización del ID a partir de la latitud y la longitud, lo centramos
        let marker = L.marker([lat, lng]).addTo(mymap);
        // Centramos el mapa en la nueva coordenada
        mymap.panTo(new L.LatLng(lat, lng));
        mymap.setZoom(13);
    })
    .catch(function(error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
        alert('Hubo un problema con la petición Fetch:' + error.message + '\n También es posible que se haya ingresado un valor incorrecto.')
      });
}

// Cuando cargamos la página toma el IP 8.8.8.8 y ejecuta la función que llama a la api
document.addEventListener("DOMContentLoaded", function(event) {
    getDataFromApi ("8.8.8.8");
});

// Al introducir el input y tocar enter o el botón se muestra en pantalla la data del ip
ipInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13  ) {
        let ipInput=document.getElementById("ip-input").value;
        getDataFromApi(ipInput)     
    } 
});
ipInputButton.addEventListener("click", function(event) {
    let ipInput=document.getElementById("ip-input").value; 
    if (ipInput.value!="") {
        getDataFromApi(ipInput)
    } 
});

// Data útil: output format de la API
// {
//     "ip": "8.8.8.8",
//     "location": {
//         "country": "US",
//         "region": "California",
//         "city": "Mountain View",
//         "lat": 37.40599,
//         "lng": -122.078514,
//         "postalCode": "94043",
//         "timezone": "-07:00",
//         "geonameId": 5375481
//     },
//     "domains": [
//         "0d2.net",
//         "003725.com",
//         "0f6.b0094c.cn",
//         "007515.com",
//         "0guhi.jocose.cn"
//     ],
//     "as": {
//         "asn": 15169,
//         "name": "Google LLC",
//         "route": "8.8.8.0/24",
//         "domain": "https://about.google/intl/en/",
//         "type": "Content"
//     },
//     "isp": "Google LLC",
//     "proxy": {
//         "proxy": false,
//         "vpn": false,
//         "tor": false
//     },
// }