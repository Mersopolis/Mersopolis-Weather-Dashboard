// GIVEN a weather dashboard with form inputs
// WHEN I search for a city, THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view future weather conditions for that city, THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history THEN I am again presented with current and future conditions for that city

// Defines HTML element variables
var searchButton = document.getElementById("searchButton");
var cityInput = document.getElementById("cityInput");
var stateInput = document.getElementById("stateInput");
var countryInput = document.getElementById("countryInput");
var cityNameEl = document.getElementById("cityName");
var currentWeatherEl = document.getElementById("current");
var forecastWeatherEl = document.getElementById("forecast");
var currentDateEl = document.getElementById("currentDate");

// Defines displayDate function
function displayDate() {
  // Sets current date from DayJS as a variable in a certain format
  var today = dayjs().format("MMM DD, YYYY");
  // Displays current date
  currentDateEl.textContent = today;
}
// Runs displayDate on page load
setInterval(displayDate);

// Declares function vairables in global scope and defines them as empty
var cityLat = "";
var cityLon = "";

// Defines GeoSearch function
function GeoSearch() {
  // Stops function if no city name input
  if (!cityInput.value) {
    window.alert("Please enter a city name");
    return
  }
  else {
    // Fetches city data
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + cityInput.value + "," + stateInput.value + "," + countryInput.value + "&limit=1&appid=2fea0200f5967d6f38b0227977c70412")
      // Parses response
      .then(function (response) {
        return response.json();
      })
      // Gets city name, state name, country code, coordinates from parsed data
      .then(function (data) {
        console.log(data);
        console.log(data[0].name);
        console.log(data[0].state);
        console.log(data[0].country);
        if (!data[0].state) {
          cityNameEl.textContent = data[0].name + ", " + data[0].country;
        }
        else {
          cityNameEl.textContent = data[0].name + ", " + data[0].state + ", " + data[0].country;
        }

        console.log(data[0].lat);
        cityLat = data[0].lat;

        console.log(data[0].lon);
        cityLon = data[0].lon;

        weatherSearch();
      });
    
    // Defines elements to create in functions
    var weatherIconEl = document.createElement("img");
    var iconCaptionEl = document.createElement("h4");
    var currentTempEl = document.createElement("h2");
    var currentHumidityEl = document.createElement("h3");
    var currentWindEl = document.createElement("h3");

    // Defines weatherSearch function
    function weatherSearch() {
      fetch("http://api.openweathermap.org/data/2.5/weather?lat=" + cityLat + "&lon=" + cityLon + "&units=imperial&appid=2fea0200f5967d6f38b0227977c70412")
      .then(function (response2) {
        return response2.json();
      })
      .then(function(data2) {
        console.log(data2);
        console.log(data2.weather[0].icon);
        weatherIconEl.setAttribute("src","http://openweathermap.org/img/wn/" + data2.weather[0].icon + "@2x.png");
        currentWeatherEl.appendChild(weatherIconEl);

        iconCaptionEl.textContent = data2.weather[0].description;
        currentWeatherEl.appendChild(iconCaptionEl);
        
        console.log(data2.main.temp);
        currentTempEl.textContent = "Temperature: " + Math.round(data2.main.temp) + "℉";
        currentWeatherEl.appendChild(currentTempEl);

        console.log(data2.main.humidity);
        currentHumidityEl.textContent = "Humidity: " + data2.main.humidity + "%";
        currentWeatherEl.appendChild(currentHumidityEl);

        console.log(data2.wind.speed);
        currentWindEl.textContent = "Wind Speed: " + Math.round(data2.wind.speed) + " MPH";
        currentWeatherEl.appendChild(currentWindEl);
      });
    }
  }  
}

searchButton.addEventListener("click", GeoSearch);