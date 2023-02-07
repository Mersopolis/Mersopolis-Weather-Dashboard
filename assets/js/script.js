// GIVEN a weather dashboard with form inputs
// WHEN I search for a city, THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I click on a city in the search history THEN I am again presented with current and future conditions for that city

// Defines HTML element variables
var searchButton = document.getElementById("searchButton");
var cityInput = document.getElementById("cityInput");
var stateInput = document.getElementById("stateInput");
var countryInput = document.getElementById("countryInput");
var searchHistoryEl = document.getElementById("searchHistory");
var currentDateEl = document.getElementById("currentDate");
var cityNameEl = document.getElementById("cityName");
var currentWeatherEl = document.getElementById("current");
var currentWeatherIconEl = document.getElementById("currentWeatherIcon");
var currentIconCaptionEl = document.getElementById("currentIconCaption");
var currentTempEl = document.getElementById("currentTemp");
var currentHumidityEl = document.getElementById("currentHumidity");
var currentWindEl = document.getElementById("currentWind");

// Defines displayDate function
function displayDate() {
  // Sets current date from DayJS as a variable in a certain format
  var today = dayjs().format("MMM DD, YYYY");
  // Displays current date
  currentDateEl.textContent = today;
}
// Runs displayDate function on page load ("displayDate();" alone says dayjs() is undefined for some reason)
setInterval(displayDate);

// Declares function vairables in global scope and defines them as empty
var cityLat = "";
var cityLon = "";

// Defines apiKey variable
var apiKey = "2fea0200f5967d6f38b0227977c70412";

// Search button runs saveSearch and geoSearch functions on click
searchButton.addEventListener("click", saveSearch);
searchButton.addEventListener("click", geoSearch);

// Defines searchHistory variable as an empty array on page load
var searchHistory = [];

// Defines saveSearch function
function saveSearch() {
  // Prevents saving the search if there is no city input
  if (!cityInput.value) {
    return
  }
  else {
  // Clears search history list
  searchHistoryEl.children[2].innerHTML = "";
  // Pushes current search input to searchHistory array
  searchHistory.push(cityInput.value + "," + stateInput.value + "," + countryInput.value);
  // Sets searchHistory array as an item in localStorage
  localStorage.setItem("searchStorage", JSON.stringify(searchHistory));
  getSearchStorage();
  }
}

// Defines searchStorage variable for the following function
var searchStorage = JSON.parse(localStorage.getItem("searchStorage"));

// Defines getSearchStorage function
function getSearchStorage() {
  // Checks for valid search storage
  if (searchStorage) {
    // searchHistory array is set to searchStorage
    searchHistory = searchStorage;
    console.log(searchStorage);
    // Creates a list item in search history element for every item in the searhHistory array
    for (var i = 0; i < searchHistory.length; i++) {
      var searchItem = document.createElement("li");
      searchItem.textContent = searchHistory[i];
      searchHistoryEl.children[2].appendChild(searchItem);
      // Each item reruns its search when clicked
      searchHistoryEl.children[2].children[i].addEventListener("click", function(){
        cityInput.value = this.textContent.split(",")[0];
        stateInput.value = this.textContent.split(",")[1];
        countryInput.value = this.textContent.split(",")[2];
        geoSearch();
      });
    }
  }
  // Logs a message to the console if there is no search storage
  else {
    console.log("No storage found");
    // Sets searchHistory array as an item in localStorage
    localStorage.setItem("searchStorage", JSON.stringify(searchHistory));
  }
}
// Runs getSearchStorage function on page load
getSearchStorage();

// Defines geoSearch function
function geoSearch() {
  // Stops function if no city name input
  if (!cityInput.value) {
    window.alert("Please enter a city name");
    return
  }
  else {
    // Fetches city data
    fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + cityInput.value + "," + stateInput.value + "," + countryInput.value + "&limit=1&appid=" + apiKey)
      // Parses response into objects and arrays
      .then(function (response) {
        return response.json();
      })
      // Gets city info from parsed data
      .then(function (data) {
        console.log(data);
        // If city data has no state value, skips displaying it as well as the extra comma
        if (!data[0].state) {
          cityNameEl.textContent = data[0].name + ", " + data[0].country;
        }
        else {
          cityNameEl.textContent = data[0].name + ", " + data[0].state + ", " + data[0].country;
        }
        // Sets city coordinates for next functions
        cityLat = data[0].lat;
        cityLon = data[0].lon;
        // Runs weatherSearch function
        weatherSearch();
      });
  }
}

// Defines weatherSearch function
function weatherSearch() {
  // Gets current weather data for given coordinates
  fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + cityLat + "&lon=" + cityLon + "&units=imperial&appid=" + apiKey)
  // Parses response into objects and arrays
  .then(function (response2) {
    return response2.json();
  })
  // Gets current weather info from parsed data
  .then(function(data2) {
    // Displays current weather icon
    console.log(data2);
    currentWeatherIconEl.setAttribute("src","https://openweathermap.org/img/wn/" + data2.weather[0].icon + "@2x.png");
    // Displays current weather description
    currentIconCaptionEl.textContent = data2.weather[0].description;
    // Displays current temperature
    currentTempEl.textContent = "Temperature: " + Math.round(data2.main.temp) + "℉";
    // Displays current humidity
    currentHumidityEl.textContent = "Humidity: " + data2.main.humidity + "%";
    // Displays current wind speed
    currentWindEl.textContent = "Wind Speed: " + Math.round(data2.wind.speed) + " MPH";
  });
  // Runs forecastSearch function
  forecastSearch();
}

// Defines HTML element variables for following functions
var day1Section = document.getElementById("forecastDay1").querySelectorAll(".forecastDaySection");
var day2Section = document.getElementById("forecastDay2").querySelectorAll(".forecastDaySection");
var day3Section = document.getElementById("forecastDay3").querySelectorAll(".forecastDaySection");
var day4Section = document.getElementById("forecastDay4").querySelectorAll(".forecastDaySection");
var day5Section = document.getElementById("forecastDay5").querySelectorAll(".forecastDaySection");

// Defines forecastSearch function
function forecastSearch() {
  // Gets forecast data for given coordinates
  fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + cityLat + "&lon=" + cityLon + "&units=imperial&appid=" + apiKey)
  // Parses response into objects and arrays
  .then(function (response3) {
    return response3.json();
  })
  // Displays forecast data
  .then(function(data3) {
    console.log(data3);
    for (i = 0; i < 8; i++) {
      day1Section[i].querySelector(".forecastSectionDay").textContent = dayjs(data3.list[i].dt_txt).format("MMM DD, YYYY h:mm A");
      day1Section[i].querySelector(".forecastSectionWeatherIcon").setAttribute("src", "https://openweathermap.org/img/wn/" + data3.list[i].weather[0].icon + "@2x.png");
      day1Section[i].querySelector(".forecastSectionIconCaption").textContent = data3.list[i].weather[0].description;
      day1Section[i].querySelector(".forecastSectionTemp").textContent = Math.round(data3.list[i].main.temp) + "℉";
      day1Section[i].querySelector(".forecastSectionHumidity").textContent = Math.round(data3.list[i].main.humidity) + "%";
      day1Section[i].querySelector(".forecastSectionWind").textContent = Math.round(data3.list[i].wind.speed) + " MPH";
    }
    for (i = 0; i < 8; i++) {
      day2Section[i].querySelector(".forecastSectionDay").textContent = dayjs(data3.list[i + 8].dt_txt).format("MMM DD, YYYY h:mm A");
      day2Section[i].querySelector(".forecastSectionWeatherIcon").setAttribute("src", "https://openweathermap.org/img/wn/" + data3.list[i + 8].weather[0].icon + "@2x.png");
      day2Section[i].querySelector(".forecastSectionIconCaption").textContent = data3.list[i + 8].weather[0].description;
      day2Section[i].querySelector(".forecastSectionTemp").textContent = Math.round(data3.list[i + 8].main.temp) + "℉";
      day2Section[i].querySelector(".forecastSectionHumidity").textContent = Math.round(data3.list[i + 8].main.humidity) + "%";
      day2Section[i].querySelector(".forecastSectionWind").textContent = Math.round(data3.list[i + 8].wind.speed) + " MPH";
    }
    for (i = 0; i < 8; i++) {
      day3Section[i].querySelector(".forecastSectionDay").textContent = dayjs(data3.list[i + 16].dt_txt).format("MMM DD, YYYY h:mm A");
      day3Section[i].querySelector(".forecastSectionWeatherIcon").setAttribute("src", "https://openweathermap.org/img/wn/" + data3.list[i + 16].weather[0].icon + "@2x.png");
      day3Section[i].querySelector(".forecastSectionIconCaption").textContent = data3.list[i + 16].weather[0].description;
      day3Section[i].querySelector(".forecastSectionTemp").textContent = Math.round(data3.list[i + 16].main.temp) + "℉";
      day3Section[i].querySelector(".forecastSectionHumidity").textContent = Math.round(data3.list[i + 16].main.humidity) + "%";
      day3Section[i].querySelector(".forecastSectionWind").textContent = Math.round(data3.list[i + 16].wind.speed) + " MPH";
    }
    for (i = 0; i < 8; i++) {
      day4Section[i].querySelector(".forecastSectionDay").textContent = dayjs(data3.list[i + 24].dt_txt).format("MMM DD, YYYY h:mm A");
      day4Section[i].querySelector(".forecastSectionWeatherIcon").setAttribute("src", "https://openweathermap.org/img/wn/" + data3.list[i + 24].weather[0].icon + "@2x.png");
      day4Section[i].querySelector(".forecastSectionIconCaption").textContent = data3.list[i + 24].weather[0].description;
      day4Section[i].querySelector(".forecastSectionTemp").textContent = Math.round(data3.list[i + 24].main.temp) + "℉";
      day4Section[i].querySelector(".forecastSectionHumidity").textContent = Math.round(data3.list[i + 24].main.humidity) + "%";
      day4Section[i].querySelector(".forecastSectionWind").textContent = Math.round(data3.list[i + 24].wind.speed) + " MPH";
    }
    for (i = 0; i < 8; i++) {
      day5Section[i].querySelector(".forecastSectionDay").textContent = dayjs(data3.list[i + 32].dt_txt).format("MMM DD, YYYY h:mm A");
      day5Section[i].querySelector(".forecastSectionWeatherIcon").setAttribute("src", "https://openweathermap.org/img/wn/" + data3.list[i + 32].weather[0].icon + "@2x.png");
      day5Section[i].querySelector(".forecastSectionIconCaption").textContent = data3.list[i + 32].weather[0].description;
      day5Section[i].querySelector(".forecastSectionTemp").textContent = Math.round(data3.list[i + 32].main.temp) + "℉";
      day5Section[i].querySelector(".forecastSectionHumidity").textContent = Math.round(data3.list[i + 32].main.humidity) + "%";
      day5Section[i].querySelector(".forecastSectionWind").textContent = Math.round(data3.list[i + 32].wind.speed) + " MPH";
    }
  });
}
