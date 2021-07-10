

//fetch for city

//within that fetch use the co-ordinats to get the future data

//you'll need two api's   1: openWeatherMap API    2:  one call weather


//api.openweathermap.org/data/2.5/forecast?q={city name}&appid={aa891061c4eb5441b7aab33d1b619398}

function generateURL(city) {

    var NUMBER_OF_DAYS_TO_REQUEST = 5;

    return `api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=${NUMBER_OF_DAYS_TO_REQUEST}&appid={aa891061c4eb5441b7aab33d1b619398}`

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