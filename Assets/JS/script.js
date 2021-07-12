//Elements grabbed from html

var cityList = document.getElementById("cityList") //selects the ul item in html for the previous searches
var cityTextBox = document.getElementById("cityTextBox") //selects the search box from html 
var searchButton = document.getElementById("searchButton") //selects the button from html
var selectedCity = document.getElementById("mainCardCity") //selects the large text in the main forecast section
var mainTemp = document.getElementById("mainTemp") //selects the span element inside the list item, inside the main card div 
var mainWind = document.getElementById("mainWind") // selects the span element inside the list item, inside the main card div
var mainHumid = document.getElementById("mainHumid") // same as above 
var mainUV = document.getElementById("mainUV") //selects the UV index in the main card
var mainIcon = document.getElementById("mainIcon")  //selects the weather icon in the main card

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

var iconOne = document.getElementById("iconOne")
var iconTwo = document.getElementById("iconTwo")
var iconThree = document.getElementById("iconThree") //selects the img element inside the future forecasts
var iconFour = document.getElementById("iconFour")
var iconFive = document.getElementById("iconFive")

//Some variables we make to be used later on

var endpoint
var date = new Date //grabs todays date
var lat  //sets a new variable for the latitude
var lon  //sets a new variable for the longitude

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

    
    return fetch(endpoint)
    .then(function (res) { //fetch url result

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


      //here we also set the lon and lat values to be the latitude and longitude of the chosen city
        lon = data.city.coord.lon
                                    //This is so I can use the data from this function in another function later
        lat = data.city.coord.lat


        //Next we use the data to get the icons for the weather so we can display them

        var iconCodeMain = data.list[0].weather[0].icon
        var iconCodeOne = data.list[10].weather[0].icon
        var iconCodeTwo = data.list[18].weather[0].icon
        var iconCodeThree = data.list[26].weather[0].icon //gets the weather icon id for each card and assigns it to a variable
        var iconCodeFour = data.list[34].weather[0].icon
        var iconCodeFive = data.list[39].weather[0].icon
        
        var iconMainUrl = "http://openweathermap.org/img/w/" + iconCodeMain + ".png";
        var iconOneUrl = "http://openweathermap.org/img/w/" + iconCodeOne + ".png";
        var iconTwoUrl = "http://openweathermap.org/img/w/" + iconCodeTwo + ".png";
        var iconThreeUrl = "http://openweathermap.org/img/w/" + iconCodeThree + ".png";
        var iconFourUrl = "http://openweathermap.org/img/w/" + iconCodeFour + ".png";
        var iconFiveUrl = "http://openweathermap.org/img/w/" + iconCodeFive + ".png";
        
        mainIcon.src = iconMainUrl;
        iconOne.src = iconOneUrl;
        iconTwo.src = iconTwoUrl;
        iconThree.src = iconThreeUrl;
        iconFour.src = iconFourUrl;
        iconFive.src = iconFiveUrl;

    })
    .then(function getUV() { //this long string of .then statements is so that after we get the lat and lon of the city we can then put it into another api
        //we set endpointUV to have the value of the new api url, and have the lat and lon variables equal whatever the city lat lon was
        endpointUV = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=aa891061c4eb5441b7aab33d1b619398`
        
        return fetch(endpointUV) //we fetch the data of the new api
    })
    .then(function (res) {
        return res.json(); //turn it into an object
    })
    .then(function (data) {
        //console.log(data)

       
        mainUV.innerText = data.current.uvi //finally we set the text of mainUV to be the value of uvi in that object
        
        if (mainUV.innerText < 6) {
            
            mainUV.classList.remove('highUV')
            mainUV.classList.remove('mediumUV')
            mainUV.classList.add('lowUV');
        } 
        else if (mainUV.innerText < 8) {

            mainUV.classList.remove('lowUV')
            mainUV.classList.remove('highUV')
            mainUV.classList.add('mediumUV')
        }
         else {

            mainUV.classList.remove('mediumUV')
            mainUV.classList.remove('lowUV')
            mainUV.classList.add('highUV')
        }
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

    var cityListItems = document.querySelector("li");
    cityListItems.id = "cityListItems";
}

//This functions creates and assigns dates to each of the cards
function setDates () {
    //First we create the date and get it's individual parts
    var currentDate = new Date(),
    day = currentDate.getDate(),
    month = currentDate.getMonth() + 1, //we add 1 to the month as it always seems to be a month behind
    year = currentDate.getFullYear(),
    
    text = (day + "/" + month + "/" + year);  //we put these parts together in an order we choose and assign it to 'text'
    
    document.getElementById("mainCardDate").innerHTML = text; //then we set the variable 'text' to be the innerHTML of the date container

    //Same as above however we're added +1 to the date to show that it's tomorrow
    day = currentDate.getDate() + 1,
    month = currentDate.getMonth() + 1,
    year = currentDate.getFullYear(),

    futTextOne = (day + "/" + month + "/" + year);

    document.getElementById("futDateOne").innerHTML = futTextOne;

    //future card 2
    day = currentDate.getDate() +2,
    month = currentDate.getMonth() +1,
    year = currentDate.getFullYear(),

    futTextTwo = (day + "/" + month + "/" + year);

    document.getElementById("futDateTwo").innerHTML = futTextTwo;

    //future card 3
    day = currentDate.getDate() +3,
    month = currentDate.getMonth() +1,
    year = currentDate.getFullYear(),

    futTextThree = (day + "/" + month + "/" + year);

    document.getElementById("futDateThree").innerHTML = futTextThree;

    //future card 4
    day = currentDate.getDate() +4,
    month = currentDate.getMonth() +1,
    year = currentDate.getFullYear(),

    futTextFour = (day + "/" + month + "/" + year);

    document.getElementById("futDateFour").innerHTML = futTextFour;

    //future card 5
    day = currentDate.getDate() +5,
    month = currentDate.getMonth() +1,
    year = currentDate.getFullYear(),

    futTextFive = (day + "/" + month + "/" + year);

    document.getElementById("futDateFive").innerHTML = futTextFive;
}


function accessPreviousCity () {

    var city = document.getElementsById("cityListItems").innerHTML

    console.log(city)
}


document.getElementById("cityListItems").onclick = function() {accessPreviousCity};

searchButton.addEventListener('click', generateEndpoint) //creates the url when the button is clicked
searchButton.addEventListener('click', makeRequest) //makes a request to the url gotten from generateEndpoint once the button is clicked
searchButton.addEventListener('click', addToList) // adds the searched city to the top of the recent searched items list. Also saves it to local storage
searchButton.addEventListener('click', setDates) //adds the correct dates to the forecast cards