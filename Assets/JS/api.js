function generateEndpoint(city) { //this function makes a url from the api to be used. The city and number of days bits are variables

    var NUMBER_OF_DAYS_TO_REQUEST = 5; //we hard code the number of days as we only want 5

    return `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=${NUMBER_OF_DAYS_TO_REQUEST}&appid={aa891061c4eb5441b7aab33d1b619398}`

}

var endpoint = generateEndpoint(city) //makes it so that endpoint is the url result of generateEndpoint


//endpoint is the url of the above function, we run a fetch command on it and then return the response as an object
function makeRequest(endpoint) {
    return fetch(endpoint).then(function (res) { //fetch url result
        return res.json(); //turn result in object
    });

}


var city = "Birmingham" //only here as a test, remember to remove


makeRequest(endpoint).then(function(weatherInfo){ 
    
});

makeRequest();