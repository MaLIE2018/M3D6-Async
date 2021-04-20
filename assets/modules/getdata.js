export const requestdata = (url) => {
    return new Promise((resolve) => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch((err) => console.log(err))
    })
}

//Google Maps
const createMarker = (map, users) => {
    users.forEach((user) => {
        let myLatlng = new google.maps.LatLng(user.address.geo.lat, user.address.geo.lng);
        let marker = new google.maps.Marker({
            position: myLatlng,
            title: user.name,
            url: `person.html?id="${user.id}`
        });
        google.maps.event.addListener(marker, 'click', function() {
            window.location.href = this.url;
        });
        // To add the marker to the map, call setMap();
        return marker.setMap(map);

    })

}

export const createGoogleMapScript = () => {
    // Create the script tag, set the appropriate attributes
    var script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCTJdaONjCrIrgW_703W_yfGBaEtxAZCJM&callback=initMap';
    script.async = true;

    // Attach your callback function to the `window` object
    window.initMap = function(map, users) {
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 2,
        });
        createMarker(map, users)
            // JS API is loaded and available
    };

    // Append the 'script' element to 'head'
    document.head.appendChild(script);

}