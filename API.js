// fetch() function 
// URL and backs come the DATA 
// JSON Format ... .json
// REST API => conventional form of API ...
// Authentication Requiremnets ? for the API'S ...
// Rate Limits => how many times you need to request the api ...
// endpoints
// browser extension for JSON ..


// what we have done ?
/*
    1. fetch data from the web api 
    2. Converted that data into JSON
    3. and then post that data on the canvas
*/

  // Making a Map and Tiles ..
    // Setting a higher zoom to make effect more obvious
    const mapID = L.map('mapID').setView([0, 0], 100); 

    

    // Attritribution...    from the Open Street Map ..
    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'; // format of the URL not an actual URL ..
    const tiles = L.tileLayer(tileUrl, {attribution} );
    tiles.addTo(mapID);

    const iss200 = L.icon({
        iconUrl: './iss200.png',
        iconSize: [50,32],
        iconAnchor: [25, 16],
    });
    

    const ISS_API = "https://api.wheretheiss.at/v1/satellites/25544";
    const marker = L.marker([0, 0], {icon: iss200}).addTo(mapID) // adding the Marker on the MAP...


let firstTime =  true;

async function getISS(){
    const response = await fetch(ISS_API);
    const data = await response.json();
    const {latitude, longitude} = data;

    marker.setLatLng([latitude, longitude]);
    if(firstTime){
        mapID.setView([latitude, longitude], 5);
        firstTime = false;
    }
    document.getElementById("lat").textContent = latitude.toFixed(2);
    document.getElementById("long").textContent = longitude.toFixed(2);
}



getISS();
// WE WILL USE set Interval in order to fetch api again and again ...

setInterval(getISS , 3000);