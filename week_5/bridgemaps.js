//Array with latitude and longtitude
let usMap = [36,-96.30]
let zoomLevel = 3.5

// building a new icon class

var bridgeIcon = L.Icon.extend({
    options: {
        iconSize:     [38, 95],
        iconAnchor:   [22, 94],
        popupAnchor:  [-3, -76]
    }
})

var newIcon = new bridgeIcon({
    iconUrl: 'bridge.png'
})





//Create the map
let map = L.map('bridges-map').setView(usMap, zoomLevel)

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoieGQzMjYybmQiLCJhIjoiY2s2bDltNHU0MDhqcTNscGZobmdsaWg0cCJ9.x2gxZA4T44mIuxP2CSv0pA'
}).addTo(map)


let bridges = [
    {'name':'Verrazano-Narrows Bridge', 'city,state': 'New York, NY', 'Span(meters)': '1298.4', 'Location(latitude,longtitude)': [40.6066,-74.0447]},
    {'name':'Golden Gate Bridge', 'city,state': 'San Francisco and Mairin, CA', 'Span(meters)': '1280.2', 'Location(latitude,longtitude)': [37.8199,-122.4783]},
    {'name':'Mackinac Bridge', 'city,state': 'Mackinaw and St Ignace, MI', 'Span(meters)': '1158.0', 'Location(latitude,longtitude)': [45.8174,-84.7278]},
    {'name':'George Washington Bridge', 'city,state': 'New York, NY and New Jersey, NJ', 'Span(meters)': '1067.0', 'Location(latitude,longtitude)': [40.8517, -73.9527]},
    {'name':'Tacoma Narrows Bridge', 'city,state': 'Tacoma and Kitsap, WA', 'Span(meters)': '853.44', 'Location(latitude,longtitude)': [47.2690, -122.5517]}
]

for (var i in bridges){
    let each = bridges[i]
    let coordinates = each["Location(latitude,longtitude)"]
    let spans = each["Span(meters)"]
    console.log(coordinates)
    let marker = L.marker(coordinates, {icon:newIcon})
        .bindPopup(`Name: ${each.name} Span: ${spans}`)
        .addTo(map)
}

// TODO Part 2a (Optional for extra credit +3 points) instead of the default marker, draw a bridge icon at the locations. You'll find a tutorial at Leaflet's website. Example icon: https://www.flaticon.com/free-icon/bridge_183412
{/* <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}
