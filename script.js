//Housekeeping
var searchHistoryContainer = document.getElementById("searchHistoryContainer");
var searchHistory = [""];
var searchButton = document.getElementById("searchButton");
var searchInput = document.getElementById("searchInput");
var forecastInfo = document.getElementById("forecastInfo");

var maxHistorySize = 15;
var APIKey = "82e69b1bac198153d5780bdb914ac0e3";




//added function to append the array values to the page as buttons
//added button styling and changed maxHistory var to 15
//added a seperate id to each entryButton
//added event listenr to entry buttons
function updateSearchHistory() {
    searchHistoryContainer.innerHTML = "";
    searchHistory.slice(-maxHistorySize).forEach(function (entry, index) {
        var entryButton = document.createElement("button");
        entryButton.textContent = entry;
        entryButton.className = "btn btn-secondary m-1";
        entryButton.id = "entryButton_" + index;
    
        entryButton.addEventListener('click', function (event) {
            var clickedCity = entryButton.textContent;
            var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + clickedCity + "&appid=" + APIKey;
    
            fetch(queryURL)
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    console.log("Weather information for " + clickedCity + ":", data);
                });
        });
    
        searchHistoryContainer.appendChild(entryButton);
    });
}

//added event listener to search button
//added functionality to event listner to log user input to an array
//updated the function to be used inline with the updateSearchHistory function. With the new maxHistory var, search history is capped at 6 so things dont get out of control. I may change this number later depending on how it looks with all of the styling completed. 
//updated function to clear search history after searching and log weather data to console
searchButton.addEventListener('click', function (event) {
    var inputValue = searchInput.value.trim();

    if (inputValue !== "") {
        var city = searchInput.value;
        var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
        searchHistory.push(inputValue);

        if (searchHistory.length > maxHistorySize) {
            searchHistory.shift();
        }

        updateSearchHistory();
        fetch(queryURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log("Weather information for " + city + ":", data);
            updateCurrentWeather(data);
            update5DayForecast(data);
        });
       searchInput.value = "";
    }
});

//added function to format the date and loose all the additional info from the unix timestamp
function formatDate(date) {
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    return month + '/' + day + '/' + year;
}

//wrote a function to collect data from the api and append data as p elements in the html
//updated function to include timestamp and weather icon and did some very basic styling
//updated function to work with formateDate function
//added code to convert temperature from kelvin to farenheit because duh
function updateCurrentWeather(data) {
    var currentForecastContainer = document.getElementById("forecastInfo");
    currentForecastContainer.innerHTML = "";

    var timestamp = data.list[0].dt;
    var currentDate = new Date(timestamp * 1000);
    var currentDateDisplay = document.createElement("p");
    currentDateDisplay.textContent = formatDate(currentDate);
    currentForecastContainer.appendChild(currentDateDisplay);

    var cityInfo = document.createElement("p");
    cityInfo.textContent = data.city.name;
    currentForecastContainer.appendChild(cityInfo);
    cityInfo.style.fontWeight = "bold";
    cityInfo.style.fontSize = "30px";

    var iconCode = data.list[0].weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
    var iconImg = document.createElement("img");
    iconImg.src = iconUrl;
    iconImg.style.width = "50px";
    iconImg.style.height = "50px";
    iconImg.style.display = "block";
    iconImg.style.margin = "auto";
    currentForecastContainer.appendChild(iconImg);

    var temperatureKelvin = data.list[0].main.temp;
    var temperatureFahrenheit = (temperatureKelvin - 273.15) * 9/5 + 32;

    var temperatureP = document.createElement("p");
    temperatureP.textContent = "Temperature: " + temperatureFahrenheit.toFixed(2) + " °F";
    forecastInfo.appendChild(temperatureP);

    var windSpeedP = document.createElement("p");
    windSpeedP.textContent = "Wind Speed: " + data.list[0].wind.speed;
    currentForecastContainer.appendChild(windSpeedP);

    var humidityP = document.createElement("p");
    humidityP.textContent = "Humidity: " + data.list[0].main.humidity;
    currentForecastContainer.appendChild(humidityP);
}

//added function for the 5 day forecast to display as seperate cards in the 5 day forecast container. doesnt do the correct dates yet

function update5DayForecast(data) {
    var fiveDayForecastContainer = document.getElementById("cardContainer");
    fiveDayForecastContainer.innerHTML = "";
    
    var fiveDayForecastData = data.list.slice(1, 6);

    fiveDayForecastData.forEach(function (forecast) {
        var timestamp = forecast.dt;
        var currentDate = new Date(timestamp * 1000);

        var cardContainer = document.createElement("div");
        cardContainer.className = "card";

        var currentDateDisplay = document.createElement("p");
        currentDateDisplay.textContent = formatDate(currentDate);
        cardContainer.appendChild(currentDateDisplay);

        var temperatureKelvin = data.list[0].main.temp;
        var temperatureFahrenheit = (temperatureKelvin - 273.15) * 9/5 + 32;

        var temperatureP = document.createElement("p");
        temperatureP.textContent = "Temp: " + temperatureFahrenheit.toFixed(2) + " °F";
        cardContainer.appendChild(temperatureP);

        var windSpeedP = document.createElement("p");
        windSpeedP.textContent = "Wind Speed: " + forecast.wind.speed;
        cardContainer.appendChild(windSpeedP);

        var humidityP = document.createElement("p");
        humidityP.textContent = "Humidity: " + forecast.main.humidity;
        cardContainer.appendChild(humidityP);

        fiveDayForecastContainer.appendChild(cardContainer);
    });
}