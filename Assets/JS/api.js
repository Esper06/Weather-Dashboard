function generateURL(city) {

    var NUMBER_OF_DAYS_TO_REQUEST = 5;

    return `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=${NUMBER_OF_DAYS_TO_REQUEST}&appid={aa891061c4eb5441b7aab33d1b619398}`

}

function makeRequest(endpoint) {
    return fetch(endpoint).then(function (res) {
        return res.json();
    });

}

var city = "Birmingham"

var endpoint = generateEndpoint(city)

makeRequest(endpoint).then(function(weatherInfo){
    
})