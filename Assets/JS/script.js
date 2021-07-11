//Elements grabbed from html

var cityTextBox = document.getElementById("cityTextBox") //selects the search box from html 
var searchButton = document.getElementById("searchButton") //selects the button from html
var selectedCity = document.getElementById("mainCardCity") //selects the large text in the main forecast section
var mainTemp = document.getElementById("mainTemp") //selects the span element inside the list item, inside the main card div 

//Some variables we make to be used later on
var endpoint
mainTemp = ""
//this function makes a url from the api to be used. The city is a variable that depends on the user
function generateEndpoint(city) { 
    event.preventDefault(); //stops the browser from refreshing the page

    var city = cityTextBox.value //sets it so that whatever the client types in is the city that is searched

                //assigns the url for the api to the variable endpoint
    endpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=aa891061c4eb5441b7aab33d1b619398&units=metric`

    selectedCity.innerHTML = city
}


//endpoint is the url of the above function, we run a fetch command on it and then return the response as an object
function makeRequest() {
    event.preventDefault();

    
    return fetch(endpoint).then(function (res) { //fetch url result
        return res.json(); //turn result in object
    })
    .then(function(data){
        console.log(data)
        mainTemp.innerText = data.list[0].main.temp //sets the inner html of the main temperature span to be whatever the response of the api is
    })

}

searchButton.addEventListener('click', generateEndpoint) //creates the url when the button is clicked
searchButton.addEventListener('click', makeRequest) //makes a request to the url gotten from generateEndpoint once the button is clicked

