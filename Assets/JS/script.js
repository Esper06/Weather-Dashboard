//Elements grabbed from html

var cityList = document.getElementById("cityList") //selects the ul item in html for the previous searches
var cityTextBox = document.getElementById("cityTextBox") //selects the search box from html 
var searchButton = document.getElementById("searchButton") //selects the button from html
var selectedCity = document.getElementById("mainCardCity") //selects the large text in the main forecast section
var mainTemp = document.getElementById("mainTemp") //selects the span element inside the list item, inside the main card div 
var mainWind = document.getElementById("mainWind") // selects the span element inside the list item, inside the main card div
var mainHumid = document.getElementById("mainHumid") // same as above 
var mainDate = document.getElementById("mainCardDate") //selects the span inside the header for the main card

var futTempOne = document.getElementById("futTempOne")
var futTempTwo = document.getElementById("futTempTwo")
var futTempThree = document.getElementById("futTempThree") //selects the elements inside the future forecasts for the temperature
var futTempFour = document.getElementById("futTempFour")
var futTempFive = document.getElementById("futTempFive")

var futWindOne = document.getElementById("futWindOne")
var futWindTwo = document.getElementById("futWindTwo")
var futWindThree = document.getElementById("futWindThree") //selects the elements inside the future forecasts for the Wind speed
var futWindFour = document.getElementById("futWindFour")
var futWindFive = document.getElementById("futWindFive")

var futHumidOne = document.getElementById("futHumidOne")
var futHumidTwo = document.getElementById("futHumidTwo")
var futHumidThree = document.getElementById("futHumidThree") //selects the elements inside the future forecasts for humidity
var futHumidFour = document.getElementById("futHumidFour")
var futHumidFive = document.getElementById("futHumidFive")

//Some variables we make to be used later on

var endpoint
var date = new Date //grabs todays date


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
    .then(function(data){ //this functions sets the inner html of the elements as the results from the api
        //console.log(data)
        mainTemp.innerText = data.list[0].main.temp //sets the inner html of the main temperature span to be whatever the response of the api is
        mainWind.innerText = data.list[0].wind.speed // sets the inner html of the main wind span to be whatever the response of the api is
        mainHumid.innerText = data.list[0].main.humidity //same as above but for humidity

        futTempOne.innerText = data.list[10].main.temp 
        futWindOne.innerText = data.list[10].wind.speed //sets inner html of the first future forecast card
        futHumidOne.innerText = data.list[10].main.humidity

        futTempTwo.innerText = data.list[18].main.temp
        futWindTwo.innerText = data.list[18].wind.speed //sets inner html for the second card
        futHumidTwo.innerText = data.list[18].main.humidity

        futTempThree.innerText = data.list[26].main.temp
        futWindThree.innerText = data.list[26].wind.speed //sets inner html for the third card
        futHumidThree.innerText = data.list[26].main.humidity

        futTempFour.innerText = data.list[34].main.temp
        futWindFour.innerText = data.list[34].wind.speed //sets inner html for the fourth card
        futHumidFour.innerText = data.list[34].main.humidity

        futTempFive.innerText = data.list[39].main.temp
        futWindFive.innerText = data.list[39].wind.speed   //sets inner html for the fifth card
        futHumidFive.innerText = data.list[39].main.humidity
    })

}

//adds searched citys as a list item to an unordered list under the search bar
function addToList (city) {
    event.preventDefault; //stops it form refreshing

    var city = cityTextBox.value //sets the city value to be whatever was typed
    
    var cityName = document.createElement("li") //creates the list element 

    var cityText = document.createTextNode(city) //creates the text and sets the text as the value of 'city'
    cityName.appendChild(cityText); //adds the text to the list item

    cityList.appendChild(cityName) //adds the list item to the unordered list

    localStorage.setItem("City", city) //adds the searched city to local storage

}

function setDates () {
    var currentDate = new Date;
    
    day = currentDate.getDate(),
    month = currentDate.getMonth() + 1,
    year = currentDate.getFullYear(),
    
    text = (day + "/" + month + "/" + year);
    
    mainDate.innerText = text;
}



searchButton.addEventListener('click', generateEndpoint) //creates the url when the button is clicked
searchButton.addEventListener('click', makeRequest) //makes a request to the url gotten from generateEndpoint once the button is clicked
searchButton.addEventListener('click', addToList) // adds the searched city to the top of the recent searched items list. Also saves it to local storage
searchButton.addEventListener('click', setDates) //adds the correct dates to the forecast cards