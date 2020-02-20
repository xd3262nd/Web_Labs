var url ='https://api.wheretheiss.at/v1/satellites/25544'

var issLat = document.querySelector('#iss-lat')
var issLong = document.querySelector('#iss-long')

var issMarker

let max_failed_attempts = 3
iss(max_failed_attempts)

//new icon class
var shipIcon = L.icon({
    iconUrl: 'ship_icon.png',
    iconSize: [50,50],
    iconAnchor: [25,25]
})

var update = 10000 // 10 seconds

var dateTime = document.querySelector('#date-time')
var sec = document.querySelector('#update-seconds')

//create the map
var map = L.map('iss-map').setView([0,0],1) //to center at 0,0 and MAX Zoom out of the map

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 7,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoieGQzMjYybmQiLCJhIjoiY2s2bDltNHU0MDhqcTNscGZobmdsaWg0cCJ9.x2gxZA4T44mIuxP2CSv0pA'
}).addTo(map)

iss()



// setInterval(iss, update) //Call the iss function to every update seconds



function iss(attempt){
    fetch(url)
        .then(res => res.json()  )
        // * Information *
        //this get the response (res) that contains JSON but as a String
        //then converted into an object and returns (res.join()) with a promise
        // the result of the promise will be handled in the next then() block when the promise resolves

        .then( issData => {
            console.log(issData)
            // issData is the JS object 
            // is also the resolved result of res.json()
            
            sec.innerHTML = update/1000

            let date = Date()
            dateTime.innerHTML = date

            let lat = issData.latitude
            let long = issData.longitude
            
            issLat.innerHTML = lat
            issLong.innerHTML = long
            // alert('is 10 seconds')

            // let issMarker = L.marker([lat,long], addTo(map))
            // let issMarker = L.marker([lat,long]).addTo(map)

            if (!issMarker){
                issMarker = L.marker([lat,long], {icon: shipIcon}).addTo(map) //to create the marker
            } else {
                issMarker.setLatLng([lat,long]) //move the existed lat and long to a new location
            }
        })
        .catch( err =>{
            console.log(err)
        })
        .finally( ()=> {
            // Finally will runs whether the fetch() worked or failed
            // Call the iss function after a delay of update miliseconds
            // to update the position
            setInterval(iss, update, attempt)
        })
}



