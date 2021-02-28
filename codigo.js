// de acá tengo que sacar la localizacion del ip https://geo.ipify.org/docs


var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGlldGE5NiIsImEiOiJja2xuNTRuM3EwZnhkMndxajdlaTIyZWg1In0.nIgbphz0nKrqt5QvaCa38w', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

//--------------------meter en una función
let locationSpan =document.getElementById("location");
let ipAdressSpan =document.getElementById("ip-adress");
let timezoneSpan =document.getElementById("timezone");
let ispSpan =document.getElementById("isp");
// el IP lo sacamos del input
// -------------- sería interesante hacer algún tipo de validación
let ipInput=document.getElementById("ip-input"); 
ipInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        ip=ipInput.value;
        url =`https://geo.ipify.org/api/v1?apiKey=at_YKOtxrjfhl1ZbUVmAAa7XzUwThXDg&ipAddress=${ip}`; 
        fetch(url)
            .then(response => response.json())
            .then(data =>{
                let lat= data.location.lat;
                let lng= data.location.lng ;
                ipAdressSpan=data.ip;
                ispSpan.innerHTML= data.isp;
                timezoneSpan.innerHTML=data.location.timezone;
                locationSpan.innerHTML=`${data.location.city}, ${data.location.region}, ${data.location.country}`;
                console.log(data)
                //marco en el mapa la localización del ID a partir de la latitud y la longitud
                let marker = L.marker([lat, lng]).addTo(mymap);

            })
            // throw agregar por las dudassssssssssssssssssssssssss
     }
});



// -----------------------tengo que hacer una función o algo que me lea el url solo cuando lo tenga y que me lea la info que me devuelve el url

// fetch (url) //devuele promesa encapsulada
// .then (res=> res.text()); //devuelve promesa puede ser '.text' o '.json'
// //.then (res=> console.log (res)); //devuelve texto de la promesa
// // esto es la info que necesitamos de la API
// data.location.country ,
// data.location.region , 
// data.location.city , 
// data.location.lat 
// data.location.lng 
// data.location.timezone, 
// data.isp


//output format
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