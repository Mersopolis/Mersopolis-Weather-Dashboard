// GIVEN a weather dashboard with form inputs
// WHEN I search for a city, THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view future weather conditions for that city, THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history THEN I am again presented with current and future conditions for that city

// Defines HTML element variables
var searchButton = document.getElementById("searchButton");
var cityInput = document.getElementById("cityInput");
var stateInput = document.getElementById("stateInput");
var countryInput = document.getElementById("countryInput");
var currentDateEl = document.getElementById("currentDate");
var cityNameEl = document.getElementById("cityName");
var currentWeatherEl = document.getElementById("current");
var weatherIconEl = document.getElementById("currentWeatherIcon");
var iconCaptionEl = document.getElementById("iconCaption");
var currentTempEl = document.getElementById("currentTemp");
var currentHumidityEl = document.getElementById("currentHumidity");
var currentWindEl = document.getElementById("currentWind");
var forecastWeatherEl = document.getElementById("forecast");

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
      // Parses response into objects and arrays
      .then(function (response) {
        return response.json();
      })
      // Gets city info from parsed data
      .then(function (data) {
        console.log(data[0].name);
        console.log(data[0].state);
        console.log(data[0].country);
        // If city data has no state value, skips displaying it as well as the extra comma
        if (!data[0].state) {
          cityNameEl.textContent = data[0].name + ", " + data[0].country;
        }
        else {
          cityNameEl.textContent = data[0].name + ", " + data[0].state + ", " + data[0].country;
        }
        // Sets city coordinates for next functions
        console.log(data[0].lat);
        cityLat = data[0].lat;
        console.log(data[0].lon);
        cityLon = data[0].lon;
        // Runs weatherSearch function
        weatherSearch();
      });

    // Defines weatherSearch function
    function weatherSearch() {
      // Gets current weather data for given coordinates
      fetch("http://api.openweathermap.org/data/2.5/weather?lat=" + cityLat + "&lon=" + cityLon + "&units=imperial&appid=2fea0200f5967d6f38b0227977c70412")
      // Parses response into objects and arrays
      .then(function (response2) {
        return response2.json();
      })
      // Gets current weather info from parsed data
      .then(function(data2) {
        // Displays current weather icon
        console.log(data2);
        console.log(data2.weather[0].icon);
        weatherIconEl.setAttribute("src","http://openweathermap.org/img/wn/" + data2.weather[0].icon + "@2x.png");
        // Displays current weather description
        iconCaptionEl.textContent = data2.weather[0].description;
        // Displays current temperature
        console.log(data2.main.temp);
        currentTempEl.textContent = "Temperature: " + Math.round(data2.main.temp) + "℉";
        // Displays current humidity
        console.log(data2.main.humidity);
        currentHumidityEl.textContent = "Humidity: " + data2.main.humidity + "%";
        // Displays current wind speed
        console.log(data2.wind.speed);
        currentWindEl.textContent = "Wind Speed: " + Math.round(data2.wind.speed) + " MPH";
      });
      // Runs forecastSearch function
      forecastSearch();
    }

    // Defines forecastSearch function
    function forecastSearch() {
      // Gets forecast data for given coordinates
      fetch("http://api.openweathermap.org/data/2.5/forecast?lat=" + cityLat + "&lon=" + cityLon + "&units=imperial&appid=2fea0200f5967d6f38b0227977c70412")
      // Parses response into objects and arrays
      .then(function (response3) {
        return response3.json();
      })
      // Displays forecast data
      .then(function(data3) {
        console.log(data3);
        console.log(data3.list);
        for (i1 = 0; i1 < 4; i1++) {
          document.getElementById("forecastDay1.1Day").textContent = dayjs(data3.list[i1].dt_txt).format("MMM DD, YYYY h:mm A");
          document.getElementById("forecastDay1.1WeatherIcon").setAttribute("src", "http://openweathermap.org/img/wn/" + data3.list[i1].weather[0].icon + "@2x.png");
        }
        for (j1 = 0; j1 < 7; j1++) {
          document.getElementById("forecastDay1.1IconCaption").textContent = data3.list[j1].weather[0].description;
          document.getElementById("forecastDay1.1Temp").textContent = Math.round(data3.list[j1].main.temp) + "℉";
          document.getElementById("forecastDay1.1Humidity").textContent = Math.round(data3.list[j1].main.humidity) + "%";
          document.getElementById("forecastDay1.1Wind").textContent = Math.round(data3.list[j1].wind.speed) + " MPH";
        }

        for (i2 = 0; i2 < 4; i2++) {
          document.getElementById("forecastDay1.2Day").textContent = dayjs(data3.list[i2].dt_txt).format("MMM DD, YYYY h:mm A");
          document.getElementById("forecastDay1.2WeatherIcon").setAttribute("src", "http://openweathermap.org/img/wn/" + data3.list[i2].weather[0].icon + "@2x.png");
        }
        for (j2 = 0; j2 < 7; j2++) {
          document.getElementById("forecastDay1.2IconCaption").textContent = data3.list[j2].weather[0].description;
          document.getElementById("forecastDay1.2Temp").textContent = Math.round(data3.list[j2].main.temp) + "℉";
          document.getElementById("forecastDay1.2Humidity").textContent = Math.round(data3.list[j2].main.humidity) + "%";
          document.getElementById("forecastDay1.2Wind").textContent = Math.round(data3.list[j2].wind.speed) + " MPH";
        }

        for (i3 = 0; i3 < 4; i3++) {
          document.getElementById("forecastDay1.3Day").textContent = dayjs(data3.list[i3].dt_txt).format("MMM DD, YYYY h:mm A");
          document.getElementById("forecastDay1.3WeatherIcon").setAttribute("src", "http://openweathermap.org/img/wn/" + data3.list[i3].weather[0].icon + "@2x.png");
        }
        for (j3 = 0; j3 < 7; j3++) {
          document.getElementById("forecastDay1.3IconCaption").textContent = data3.list[j3].weather[0].description;
          document.getElementById("forecastDay1.3Temp").textContent = Math.round(data3.list[j3].main.temp) + "℉";
          document.getElementById("forecastDay1.3Humidity").textContent = Math.round(data3.list[j3].main.humidity) + "%";
          document.getElementById("forecastDay1.3Wind").textContent = Math.round(data3.list[j3].wind.speed) + " MPH";
        }

        for (i4 = 0; i4 < 4; i4++) {
          document.getElementById("forecastDay1.4Day").textContent = dayjs(data3.list[i4].dt_txt).format("MMM DD, YYYY h:mm A");
          document.getElementById("forecastDay1.4WeatherIcon").setAttribute("src", "http://openweathermap.org/img/wn/" + data3.list[i4].weather[0].icon + "@2x.png");
        }
        for (j4 = 0; j4< 7; j4++) {
          document.getElementById("forecastDay1.4IconCaption").textContent = data3.list[j4].weather[0].description;
          document.getElementById("forecastDay1.4Temp").textContent = Math.round(data3.list[j4].main.temp) + "℉";
          document.getElementById("forecastDay1.4Humidity").textContent = Math.round(data3.list[j4].main.humidity) + "%";
          document.getElementById("forecastDay1.4Wind").textContent = Math.round(data3.list[j4].wind.speed) + " MPH";
        }

        for (i5 = 0; i5 < 4; i5++) {
          document.getElementById("forecastDay1.5Day").textContent = dayjs(data3.list[i5].dt_txt).format("MMM DD, YYYY h:mm A");
          document.getElementById("forecastDay1.5WeatherIcon").setAttribute("src", "http://openweathermap.org/img/wn/" + data3.list[i5].weather[0].icon + "@2x.png");
        }
        for (j5 = 0; j5< 7; j5++) {
          document.getElementById("forecastDay1.5IconCaption").textContent = data3.list[j5].weather[0].description;
          document.getElementById("forecastDay1.5Temp").textContent = Math.round(data3.list[j5].main.temp) + "℉";
          document.getElementById("forecastDay1.5Humidity").textContent = Math.round(data3.list[j5].main.humidity) + "%";
          document.getElementById("forecastDay1.5Wind").textContent = Math.round(data3.list[j5].wind.speed) + " MPH";
        }

        for (i6 = 0; i6 < 4; i6++) {
          document.getElementById("forecastDay1.6Day").textContent = dayjs(data3.list[i6].dt_txt).format("MMM DD, YYYY h:mm A");
          document.getElementById("forecastDay1.6WeatherIcon").setAttribute("src", "http://openweathermap.org/img/wn/" + data3.list[i6].weather[0].icon + "@2x.png");
        }
        for (j6 = 0; j6< 7; j6++) {
          document.getElementById("forecastDay1.6IconCaption").textContent = data3.list[j6].weather[0].description;
          document.getElementById("forecastDay1.6Temp").textContent = Math.round(data3.list[j6].main.temp) + "℉";
          document.getElementById("forecastDay1.6Humidity").textContent = Math.round(data3.list[j6].main.humidity) + "%";
          document.getElementById("forecastDay1.6Wind").textContent = Math.round(data3.list[j6].wind.speed) + " MPH";
        }

        for (i7 = 0; i7 < 4; i7++) {
          document.getElementById("forecastDay1.7Day").textContent = dayjs(data3.list[i7].dt_txt).format("MMM DD, YYYY h:mm A");
          document.getElementById("forecastDay1.7WeatherIcon").setAttribute("src", "http://openweathermap.org/img/wn/" + data3.list[i7].weather[0].icon + "@2x.png");
        }
        for (j7 = 0; j7< 7; j7++) {
          document.getElementById("forecastDay1.7IconCaption").textContent = data3.list[j7].weather[0].description;
          document.getElementById("forecastDay1.7Temp").textContent = Math.round(data3.list[j7].main.temp) + "℉";
          document.getElementById("forecastDay1.7Humidity").textContent = Math.round(data3.list[j7].main.humidity) + "%";
          document.getElementById("forecastDay1.7Wind").textContent = Math.round(data3.list[j7].wind.speed) + " MPH";
        }

        for (i8 = 0; i8 < 4; i8++) {
          document.getElementById("forecastDay1.8Day").textContent = dayjs(data3.list[i8].dt_txt).format("MMM DD, YYYY h:mm A");
          document.getElementById("forecastDay1.8WeatherIcon").setAttribute("src", "http://openweathermap.org/img/wn/" + data3.list[i8].weather[0].icon + "@2x.png");
        }
        for (j8 = 0; j8< 7; j8++) {
          document.getElementById("forecastDay1.8IconCaption").textContent = data3.list[j8].weather[0].description;
          document.getElementById("forecastDay1.8Temp").textContent = Math.round(data3.list[j8].main.temp) + "℉";
          document.getElementById("forecastDay1.8Humidity").textContent = Math.round(data3.list[j8].main.humidity) + "%";
          document.getElementById("forecastDay1.8Wind").textContent = Math.round(data3.list[j8].wind.speed) + " MPH";
        }


        for (i9 = 0; i9 < 4; i9++) {
          document.getElementById("forecastDay2.1Day").textContent = dayjs(data3.list[i9].dt_txt).format("MMM DD, YYYY h:mm A");
          document.getElementById("forecastDay2.1WeatherIcon").setAttribute("src", "http://openweathermap.org/img/wn/" + data3.list[i9].weather[0].icon + "@2x.png");
        }
        for (j9 = 0; j9< 7; j9++) {
          document.getElementById("forecastDay2.1IconCaption").textContent = data3.list[j9].weather[0].description;
          document.getElementById("forecastDay2.1Temp").textContent = Math.round(data3.list[j9].main.temp) + "℉";
          document.getElementById("forecastDay2.1Humidity").textContent = Math.round(data3.list[j9].main.humidity) + "%";
          document.getElementById("forecastDay2.1Wind").textContent = Math.round(data3.list[j9].wind.speed) + " MPH";
        }

        for (i10 = 0; i10 < 4; i10++) {
          document.getElementById("forecastDay2.2Day").textContent = dayjs(data3.list[i10].dt_txt).format("MMM DD, YYYY h:mm A");
          document.getElementById("forecastDay2.2WeatherIcon").setAttribute("src", "http://openweathermap.org/img/wn/" + data3.list[i10].weather[0].icon + "@2x.png");
        }
        for (j10 = 0; j10< 7; j10++) {
          document.getElementById("forecastDay2.2IconCaption").textContent = data3.list[j10].weather[0].description;
          document.getElementById("forecastDay2.2Temp").textContent = Math.round(data3.list[j10].main.temp) + "℉";
          document.getElementById("forecastDay2.2Humidity").textContent = Math.round(data3.list[j10].main.humidity) + "%";
          document.getElementById("forecastDay2.2Wind").textContent = Math.round(data3.list[j10].wind.speed) + " MPH";
        }

        for (i11 = 0; i11 < 4; i11++) {
          document.getElementById("forecastDay2.3Day").textContent = dayjs(data3.list[i11].dt_txt).format("MMM DD, YYYY h:mm A");
          document.getElementById("forecastDay2.3WeatherIcon").setAttribute("src", "http://openweathermap.org/img/wn/" + data3.list[i11].weather[0].icon + "@2x.png");
        }
        for (j11 = 0; j11< 7; j11++) {
          document.getElementById("forecastDay2.3IconCaption").textContent = data3.list[j11].weather[0].description;
          document.getElementById("forecastDay2.3Temp").textContent = Math.round(data3.list[j11].main.temp) + "℉";
          document.getElementById("forecastDay2.3Humidity").textContent = Math.round(data3.list[j11].main.humidity) + "%";
          document.getElementById("forecastDay2.3Wind").textContent = Math.round(data3.list[j11].wind.speed) + " MPH";
        }

        for (i12 = 0; i12 < 4; i12++) {
          document.getElementById("forecastDay2.4Day").textContent = dayjs(data3.list[i12].dt_txt).format("MMM DD, YYYY h:mm A");
          document.getElementById("forecastDay2.4WeatherIcon").setAttribute("src", "http://openweathermap.org/img/wn/" + data3.list[i12].weather[0].icon + "@2x.png");
        }
        for (j12 = 0; j12< 7; j12++) {
          document.getElementById("forecastDay2.4IconCaption").textContent = data3.list[j12].weather[0].description;
          document.getElementById("forecastDay2.4Temp").textContent = Math.round(data3.list[j12].main.temp) + "℉";
          document.getElementById("forecastDay2.4Humidity").textContent = Math.round(data3.list[j12].main.humidity) + "%";
          document.getElementById("forecastDay2.4Wind").textContent = Math.round(data3.list[j12].wind.speed) + " MPH";
        }

        for (i13 = 0; i13 < 4; i13++) {
          document.getElementById("forecastDay2.5Day").textContent = dayjs(data3.list[i13].dt_txt).format("MMM DD, YYYY h:mm A");
          document.getElementById("forecastDay2.5WeatherIcon").setAttribute("src", "http://openweathermap.org/img/wn/" + data3.list[i13].weather[0].icon + "@2x.png");
        }
        for (j13 = 0; j13< 7; j13++) {
          document.getElementById("forecastDay2.5IconCaption").textContent = data3.list[j13].weather[0].description;
          document.getElementById("forecastDay2.5Temp").textContent = Math.round(data3.list[j13].main.temp) + "℉";
          document.getElementById("forecastDay2.5Humidity").textContent = Math.round(data3.list[j13].main.humidity) + "%";
          document.getElementById("forecastDay2.5Wind").textContent = Math.round(data3.list[j13].wind.speed) + " MPH";
        }

        for (i14 = 0; i14 < 4; i14++) {
          document.getElementById("forecastDay2.6Day").textContent = dayjs(data3.list[i14].dt_txt).format("MMM DD, YYYY h:mm A");
          document.getElementById("forecastDay2.6WeatherIcon").setAttribute("src", "http://openweathermap.org/img/wn/" + data3.list[i14].weather[0].icon + "@2x.png");
        }
        for (j14 = 0; j14< 7; j14++) {
          document.getElementById("forecastDay2.6IconCaption").textContent = data3.list[j14].weather[0].description;
          document.getElementById("forecastDay2.6Temp").textContent = Math.round(data3.list[j14].main.temp) + "℉";
          document.getElementById("forecastDay2.6Humidity").textContent = Math.round(data3.list[j14].main.humidity) + "%";
          document.getElementById("forecastDay2.6Wind").textContent = Math.round(data3.list[j14].wind.speed) + " MPH";
        }

        for (i15 = 0; i15 < 4; i15++) {
          document.getElementById("forecastDay2.7Day").textContent = dayjs(data3.list[i15].dt_txt).format("MMM DD, YYYY h:mm A");
          document.getElementById("forecastDay2.7WeatherIcon").setAttribute("src", "http://openweathermap.org/img/wn/" + data3.list[i15].weather[0].icon + "@2x.png");
        }
        for (j15 = 0; j15< 7; j15++) {
          document.getElementById("forecastDay2.7IconCaption").textContent = data3.list[j15].weather[0].description;
          document.getElementById("forecastDay2.7Temp").textContent = Math.round(data3.list[j15].main.temp) + "℉";
          document.getElementById("forecastDay2.7Humidity").textContent = Math.round(data3.list[j15].main.humidity) + "%";
          document.getElementById("forecastDay2.7Wind").textContent = Math.round(data3.list[j15].wind.speed) + " MPH";
        }

        for (i16 = 0; i16 < 4; i16++) {
          document.getElementById("forecastDay2.8Day").textContent = dayjs(data3.list[i16].dt_txt).format("MMM DD, YYYY h:mm A");
          document.getElementById("forecastDay2.8WeatherIcon").setAttribute("src", "http://openweathermap.org/img/wn/" + data3.list[i16].weather[0].icon + "@2x.png");
        }
        for (j16 = 0; j16< 7; j16++) {
          document.getElementById("forecastDay2.8IconCaption").textContent = data3.list[j16].weather[0].description;
          document.getElementById("forecastDay2.8Temp").textContent = Math.round(data3.list[j16].main.temp) + "℉";
          document.getElementById("forecastDay2.8Humidity").textContent = Math.round(data3.list[j16].main.humidity) + "%";
          document.getElementById("forecastDay2.8Wind").textContent = Math.round(data3.list[j16].wind.speed) + " MPH";
        }


        for (i17 = 0; i17 < 4; i17++) {
          document.getElementById("forecastDay3.1Day").textContent = dayjs(data3.list[i17].dt_txt).format("MMM DD, YYYY h:mm A");
          document.getElementById("forecastDay3.1WeatherIcon").setAttribute("src", "http://openweathermap.org/img/wn/" + data3.list[i17].weather[0].icon + "@2x.png");
        }
        for (j17 = 0; j17< 7; j17++) {
          document.getElementById("forecastDay3.1IconCaption").textContent = data3.list[j17].weather[0].description;
          document.getElementById("forecastDay3.1Temp").textContent = Math.round(data3.list[j17].main.temp) + "℉";
          document.getElementById("forecastDay3.1Humidity").textContent = Math.round(data3.list[j17].main.humidity) + "%";
          document.getElementById("forecastDay3.1Wind").textContent = Math.round(data3.list[j17].wind.speed) + " MPH";
        }

        for (i18 = 0; i18 < 4; i18++) {
          document.getElementById("forecastDay3.2Day").textContent = dayjs(data3.list[i18].dt_txt).format("MMM DD, YYYY h:mm A");
          document.getElementById("forecastDay3.2WeatherIcon").setAttribute("src", "http://openweathermap.org/img/wn/" + data3.list[i18].weather[0].icon + "@2x.png");
        }
        for (j18 = 0; j18< 7; j18++) {
          document.getElementById("forecastDay3.2IconCaption").textContent = data3.list[j18].weather[0].description;
          document.getElementById("forecastDay3.2Temp").textContent = Math.round(data3.list[j18].main.temp) + "℉";
          document.getElementById("forecastDay3.2Humidity").textContent = Math.round(data3.list[j18].main.humidity) + "%";
          document.getElementById("forecastDay3.2Wind").textContent = Math.round(data3.list[j18].wind.speed) + " MPH";
        }

        for (i19 = 0; i19 < 4; i19++) {
          document.getElementById("forecastDay3.3Day").textContent = dayjs(data3.list[i19].dt_txt).format("MMM DD, YYYY h:mm A");
          document.getElementById("forecastDay3.3WeatherIcon").setAttribute("src", "http://openweathermap.org/img/wn/" + data3.list[i19].weather[0].icon + "@2x.png");
        }
        for (j19 = 0; j19< 7; j19++) {
          document.getElementById("forecastDay3.3IconCaption").textContent = data3.list[j19].weather[0].description;
          document.getElementById("forecastDay3.3Temp").textContent = Math.round(data3.list[j19].main.temp) + "℉";
          document.getElementById("forecastDay3.3Humidity").textContent = Math.round(data3.list[j19].main.humidity) + "%";
          document.getElementById("forecastDay3.3Wind").textContent = Math.round(data3.list[j19].wind.speed) + " MPH";
        }

        for (i20 = 0; i20 < 4; i20++) {
          document.getElementById("forecastDay3.4Day").textContent = dayjs(data3.list[i20].dt_txt).format("MMM DD, YYYY h:mm A");
          document.getElementById("forecastDay3.4WeatherIcon").setAttribute("src", "http://openweathermap.org/img/wn/" + data3.list[i20].weather[0].icon + "@2x.png");
        }
        for (j20 = 0; j20< 7; j20++) {
          document.getElementById("forecastDay3.4IconCaption").textContent = data3.list[j20].weather[0].description;
          document.getElementById("forecastDay3.4Temp").textContent = Math.round(data3.list[j20].main.temp) + "℉";
          document.getElementById("forecastDay3.4Humidity").textContent = Math.round(data3.list[j20].main.humidity) + "%";
          document.getElementById("forecastDay3.4Wind").textContent = Math.round(data3.list[j20].wind.speed) + " MPH";
        }

        for (i21 = 0; i21 < 4; i21++) {
          document.getElementById("forecastDay3.5Day").textContent = dayjs(data3.list[i21].dt_txt).format("MMM DD, YYYY h:mm A");
          document.getElementById("forecastDay3.5WeatherIcon").setAttribute("src", "http://openweathermap.org/img/wn/" + data3.list[i21].weather[0].icon + "@2x.png");
        }
        for (j21 = 0; j21< 7; j21++) {
          document.getElementById("forecastDay3.5IconCaption").textContent = data3.list[j21].weather[0].description;
          document.getElementById("forecastDay3.5Temp").textContent = Math.round(data3.list[j21].main.temp) + "℉";
          document.getElementById("forecastDay3.5Humidity").textContent = Math.round(data3.list[j21].main.humidity) + "%";
          document.getElementById("forecastDay3.5Wind").textContent = Math.round(data3.list[j21].wind.speed) + " MPH";
        }

        for (i22 = 0; i22 < 4; i22++) {
          document.getElementById("forecastDay3.6Day").textContent = dayjs(data3.list[i22].dt_txt).format("MMM DD, YYYY h:mm A");
          document.getElementById("forecastDay3.6WeatherIcon").setAttribute("src", "http://openweathermap.org/img/wn/" + data3.list[i22].weather[0].icon + "@2x.png");
        }
        for (j22 = 0; j22< 7; j22++) {
          document.getElementById("forecastDay3.6IconCaption").textContent = data3.list[j22].weather[0].description;
          document.getElementById("forecastDay3.6Temp").textContent = Math.round(data3.list[j22].main.temp) + "℉";
          document.getElementById("forecastDay3.6Humidity").textContent = Math.round(data3.list[j22].main.humidity) + "%";
          document.getElementById("forecastDay3.6Wind").textContent = Math.round(data3.list[j22].wind.speed) + " MPH";
        }

        for (i23 = 0; i23 < 4; i23++) {
          document.getElementById("forecastDay3.7Day").textContent = dayjs(data3.list[i23].dt_txt).format("MMM DD, YYYY h:mm A");
          document.getElementById("forecastDay3.7WeatherIcon").setAttribute("src", "http://openweathermap.org/img/wn/" + data3.list[i23].weather[0].icon + "@2x.png");
        }
        for (j23 = 0; j23< 7; j23++) {
          document.getElementById("forecastDay3.7IconCaption").textContent = data3.list[j23].weather[0].description;
          document.getElementById("forecastDay3.7Temp").textContent = Math.round(data3.list[j23].main.temp) + "℉";
          document.getElementById("forecastDay3.7Humidity").textContent = Math.round(data3.list[j23].main.humidity) + "%";
          document.getElementById("forecastDay3.7Wind").textContent = Math.round(data3.list[j23].wind.speed) + " MPH";
        }

        for (i24 = 0; i24 < 4; i24++) {
          document.getElementById("forecastDay3.8Day").textContent = dayjs(data3.list[i24].dt_txt).format("MMM DD, YYYY h:mm A");
          document.getElementById("forecastDay3.8WeatherIcon").setAttribute("src", "http://openweathermap.org/img/wn/" + data3.list[i24].weather[0].icon + "@2x.png");
        }
        for (j24 = 0; j24< 7; j24++) {
          document.getElementById("forecastDay3.8IconCaption").textContent = data3.list[j24].weather[0].description;
          document.getElementById("forecastDay3.8Temp").textContent = Math.round(data3.list[j24].main.temp) + "℉";
          document.getElementById("forecastDay3.8Humidity").textContent = Math.round(data3.list[j24].main.humidity) + "%";
          document.getElementById("forecastDay3.8Wind").textContent = Math.round(data3.list[j24].wind.speed) + " MPH";
        }


        for (i25 = 0; i25 < 4; i25++) {
          document.getElementById("forecastDay4.1Day").textContent = dayjs(data3.list[i25].dt_txt).format("MMM DD, YYYY h:mm A");
          document.getElementById("forecastDay4.1WeatherIcon").setAttribute("src", "http://openweathermap.org/img/wn/" + data3.list[i25].weather[0].icon + "@2x.png");
        }
        for (j25 = 0; j25< 7; j25++) {
          document.getElementById("forecastDay4.1IconCaption").textContent = data3.list[j25].weather[0].description;
          document.getElementById("forecastDay4.1Temp").textContent = Math.round(data3.list[j25].main.temp) + "℉";
          document.getElementById("forecastDay4.1Humidity").textContent = Math.round(data3.list[j25].main.humidity) + "%";
          document.getElementById("forecastDay4.1Wind").textContent = Math.round(data3.list[j25].wind.speed) + " MPH";
        }

        for (i26 = 0; i26 < 4; i26++) {
          document.getElementById("forecastDay4.2Day").textContent = dayjs(data3.list[i26].dt_txt).format("MMM DD, YYYY h:mm A");
          document.getElementById("forecastDay4.2WeatherIcon").setAttribute("src", "http://openweathermap.org/img/wn/" + data3.list[i26].weather[0].icon + "@2x.png");
        }
        for (j26 = 0; j26< 7; j26++) {
          document.getElementById("forecastDay4.2IconCaption").textContent = data3.list[j26].weather[0].description;
          document.getElementById("forecastDay4.2Temp").textContent = Math.round(data3.list[j26].main.temp) + "℉";
          document.getElementById("forecastDay4.2Humidity").textContent = Math.round(data3.list[j26].main.humidity) + "%";
          document.getElementById("forecastDay4.2Wind").textContent = Math.round(data3.list[j26].wind.speed) + " MPH";
        }

        for (i27 = 0; i27 < 4; i27++) {
          document.getElementById("forecastDay4.3Day").textContent = dayjs(data3.list[i27].dt_txt).format("MMM DD, YYYY h:mm A");
          document.getElementById("forecastDay4.3WeatherIcon").setAttribute("src", "http://openweathermap.org/img/wn/" + data3.list[i27].weather[0].icon + "@2x.png");
        }
        for (j27 = 0; j27< 7; j27++) {
          document.getElementById("forecastDay4.3IconCaption").textContent = data3.list[j27].weather[0].description;
          document.getElementById("forecastDay4.3Temp").textContent = Math.round(data3.list[j27].main.temp) + "℉";
          document.getElementById("forecastDay4.3Humidity").textContent = Math.round(data3.list[j27].main.humidity) + "%";
          document.getElementById("forecastDay4.3Wind").textContent = Math.round(data3.list[j27].wind.speed) + " MPH";
        }

        for (i28 = 0; i28 < 4; i28++) {
          document.getElementById("forecastDay4.4Day").textContent = dayjs(data3.list[i28].dt_txt).format("MMM DD, YYYY h:mm A");
          document.getElementById("forecastDay4.4WeatherIcon").setAttribute("src", "http://openweathermap.org/img/wn/" + data3.list[i28].weather[0].icon + "@2x.png");
        }
        for (j28 = 0; j28< 7; j28++) {
          document.getElementById("forecastDay4.4IconCaption").textContent = data3.list[j28].weather[0].description;
          document.getElementById("forecastDay4.4Temp").textContent = Math.round(data3.list[j28].main.temp) + "℉";
          document.getElementById("forecastDay4.4Humidity").textContent = Math.round(data3.list[j28].main.humidity) + "%";
          document.getElementById("forecastDay4.4Wind").textContent = Math.round(data3.list[j28].wind.speed) + " MPH";
        }

        for (i29 = 0; i29 < 4; i29++) {
          document.getElementById("forecastDay4.5Day").textContent = dayjs(data3.list[i29].dt_txt).format("MMM DD, YYYY h:mm A");
          document.getElementById("forecastDay4.5WeatherIcon").setAttribute("src", "http://openweathermap.org/img/wn/" + data3.list[i29].weather[0].icon + "@2x.png");
        }
        for (j29 = 0; j29< 7; j29++) {
          document.getElementById("forecastDay4.5IconCaption").textContent = data3.list[j29].weather[0].description;
          document.getElementById("forecastDay4.5Temp").textContent = Math.round(data3.list[j29].main.temp) + "℉";
          document.getElementById("forecastDay4.5Humidity").textContent = Math.round(data3.list[j29].main.humidity) + "%";
          document.getElementById("forecastDay4.5Wind").textContent = Math.round(data3.list[j29].wind.speed) + " MPH";
        }

        for (i30 = 0; i30 < 4; i30++) {
          document.getElementById("forecastDay4.6Day").textContent = dayjs(data3.list[i30].dt_txt).format("MMM DD, YYYY h:mm A");
          document.getElementById("forecastDay4.6WeatherIcon").setAttribute("src", "http://openweathermap.org/img/wn/" + data3.list[i30].weather[0].icon + "@2x.png");
        }
        for (j30 = 0; j30< 7; j30++) {
          document.getElementById("forecastDay4.6IconCaption").textContent = data3.list[j30].weather[0].description;
          document.getElementById("forecastDay4.6Temp").textContent = Math.round(data3.list[j30].main.temp) + "℉";
          document.getElementById("forecastDay4.6Humidity").textContent = Math.round(data3.list[j30].main.humidity) + "%";
          document.getElementById("forecastDay4.6Wind").textContent = Math.round(data3.list[j30].wind.speed) + " MPH";
        }

        for (i31 = 0; i31 < 4; i31++) {
          document.getElementById("forecastDay4.7Day").textContent = dayjs(data3.list[i31].dt_txt).format("MMM DD, YYYY h:mm A");
          document.getElementById("forecastDay4.7WeatherIcon").setAttribute("src", "http://openweathermap.org/img/wn/" + data3.list[i31].weather[0].icon + "@2x.png");
        }
        for (j31 = 0; j31< 7; j31++) {
          document.getElementById("forecastDay4.7IconCaption").textContent = data3.list[j31].weather[0].description;
          document.getElementById("forecastDay4.7Temp").textContent = Math.round(data3.list[j31].main.temp) + "℉";
          document.getElementById("forecastDay4.7Humidity").textContent = Math.round(data3.list[j31].main.humidity) + "%";
          document.getElementById("forecastDay4.7Wind").textContent = Math.round(data3.list[j31].wind.speed) + " MPH";
        }

        for (i32 = 0; i32 < 4; i32++) {
          document.getElementById("forecastDay4.8Day").textContent = dayjs(data3.list[i32].dt_txt).format("MMM DD, YYYY h:mm A");
          document.getElementById("forecastDay4.8WeatherIcon").setAttribute("src", "http://openweathermap.org/img/wn/" + data3.list[i32].weather[0].icon + "@2x.png");
        }
        for (j32 = 0; j32 < 7; j32++) {
          document.getElementById("forecastDay4.8IconCaption").textContent = data3.list[j32].weather[0].description;
          document.getElementById("forecastDay4.8Temp").textContent = Math.round(data3.list[j32].main.temp) + "℉";
          document.getElementById("forecastDay4.8Humidity").textContent = Math.round(data3.list[j32].main.humidity) + "%";
          document.getElementById("forecastDay4.8Wind").textContent = Math.round(data3.list[j32].wind.speed) + " MPH";
        }


        for (i33 = 0; i33 < 4; i33++) {
          document.getElementById("forecastDay5.1Day").textContent = dayjs(data3.list[i33].dt_txt).format("MMM DD, YYYY h:mm A");
          document.getElementById("forecastDay5.1WeatherIcon").setAttribute("src", "http://openweathermap.org/img/wn/" + data3.list[i33].weather[0].icon + "@2x.png");
        }
        for (j33 = 0; j33 < 7; j33++) {
          document.getElementById("forecastDay5.1IconCaption").textContent = data3.list[j33].weather[0].description;
          document.getElementById("forecastDay5.1Temp").textContent = Math.round(data3.list[j33].main.temp) + "℉";
          document.getElementById("forecastDay5.1Humidity").textContent = Math.round(data3.list[j33].main.humidity) + "%";
          document.getElementById("forecastDay5.1Wind").textContent = Math.round(data3.list[j33].wind.speed) + " MPH";
        }

        for (i34 = 0; i34 < 4; i34++) {
          document.getElementById("forecastDay5.2Day").textContent = dayjs(data3.list[i34].dt_txt).format("MMM DD, YYYY h:mm A");
          document.getElementById("forecastDay5.2WeatherIcon").setAttribute("src", "http://openweathermap.org/img/wn/" + data3.list[i34].weather[0].icon + "@2x.png");
        }
        for (j34 = 0; j34 < 7; j34++) {
          document.getElementById("forecastDay5.2IconCaption").textContent = data3.list[j34].weather[0].description;
          document.getElementById("forecastDay5.2Temp").textContent = Math.round(data3.list[j34].main.temp) + "℉";
          document.getElementById("forecastDay5.2Humidity").textContent = Math.round(data3.list[j34].main.humidity) + "%";
          document.getElementById("forecastDay5.2Wind").textContent = Math.round(data3.list[j34].wind.speed) + " MPH";
        }

        for (i35 = 0; i35 < 4; i35++) {
          document.getElementById("forecastDay5.3Day").textContent = dayjs(data3.list[i35].dt_txt).format("MMM DD, YYYY h:mm A");
          document.getElementById("forecastDay5.3WeatherIcon").setAttribute("src", "http://openweathermap.org/img/wn/" + data3.list[i35].weather[0].icon + "@2x.png");
        }
        for (j35 = 0; j35 < 7; j35++) {
          document.getElementById("forecastDay5.3IconCaption").textContent = data3.list[j35].weather[0].description;
          document.getElementById("forecastDay5.3Temp").textContent = Math.round(data3.list[j35].main.temp) + "℉";
          document.getElementById("forecastDay5.3Humidity").textContent = Math.round(data3.list[j35].main.humidity) + "%";
          document.getElementById("forecastDay5.3Wind").textContent = Math.round(data3.list[j35].wind.speed) + " MPH";
        }

        for (i36 = 0; i36 < 4; i36++) {
          document.getElementById("forecastDay5.4Day").textContent = dayjs(data3.list[i36].dt_txt).format("MMM DD, YYYY h:mm A");
          document.getElementById("forecastDay5.4WeatherIcon").setAttribute("src", "http://openweathermap.org/img/wn/" + data3.list[i36].weather[0].icon + "@2x.png");
        }
        for (j36 = 0; j36 < 7; j36++) {
          document.getElementById("forecastDay5.4IconCaption").textContent = data3.list[j36].weather[0].description;
          document.getElementById("forecastDay5.4Temp").textContent = Math.round(data3.list[j36].main.temp) + "℉";
          document.getElementById("forecastDay5.4Humidity").textContent = Math.round(data3.list[j36].main.humidity) + "%";
          document.getElementById("forecastDay5.4Wind").textContent = Math.round(data3.list[j36].wind.speed) + " MPH";
        }

        for (i37 = 0; i37 < 4; i37++) {
          document.getElementById("forecastDay5.5Day").textContent = dayjs(data3.list[i37].dt_txt).format("MMM DD, YYYY h:mm A");
          document.getElementById("forecastDay5.5WeatherIcon").setAttribute("src", "http://openweathermap.org/img/wn/" + data3.list[i37].weather[0].icon + "@2x.png");
        }
        for (j37 = 0; j37 < 7; j37++) {
          document.getElementById("forecastDay5.5IconCaption").textContent = data3.list[j37].weather[0].description;
          document.getElementById("forecastDay5.5Temp").textContent = Math.round(data3.list[j37].main.temp) + "℉";
          document.getElementById("forecastDay5.5Humidity").textContent = Math.round(data3.list[j37].main.humidity) + "%";
          document.getElementById("forecastDay5.5Wind").textContent = Math.round(data3.list[j37].wind.speed) + " MPH";
        }

        for (i38 = 0; i38 < 4; i38++) {
          document.getElementById("forecastDay5.6Day").textContent = dayjs(data3.list[i38].dt_txt).format("MMM DD, YYYY h:mm A");
          document.getElementById("forecastDay5.6WeatherIcon").setAttribute("src", "http://openweathermap.org/img/wn/" + data3.list[i38].weather[0].icon + "@2x.png");
        }
        for (j38 = 0; j38 < 7; j38++) {
          document.getElementById("forecastDay5.6IconCaption").textContent = data3.list[j38].weather[0].description;
          document.getElementById("forecastDay5.6Temp").textContent = Math.round(data3.list[j38].main.temp) + "℉";
          document.getElementById("forecastDay5.6Humidity").textContent = Math.round(data3.list[j38].main.humidity) + "%";
          document.getElementById("forecastDay5.6Wind").textContent = Math.round(data3.list[j38].wind.speed) + " MPH";
        }

        for (i39 = 0; i39 < 4; i39++) {
          document.getElementById("forecastDay5.7Day").textContent = dayjs(data3.list[i39].dt_txt).format("MMM DD, YYYY h:mm A");
          document.getElementById("forecastDay5.7WeatherIcon").setAttribute("src", "http://openweathermap.org/img/wn/" + data3.list[i39].weather[0].icon + "@2x.png");
        }
        for (j39 = 0; j39 < 7; j39++) {
          document.getElementById("forecastDay5.7IconCaption").textContent = data3.list[j39].weather[0].description;
          document.getElementById("forecastDay5.7Temp").textContent = Math.round(data3.list[j39].main.temp) + "℉";
          document.getElementById("forecastDay5.7Humidity").textContent = Math.round(data3.list[j39].main.humidity) + "%";
          document.getElementById("forecastDay5.7Wind").textContent = Math.round(data3.list[j39].wind.speed) + " MPH";
        }

        for (i40 = 0; i40 < 4; i40++) {
          document.getElementById("forecastDay5.8Day").textContent = dayjs(data3.list[i40].dt_txt).format("MMM DD, YYYY h:mm A");
          document.getElementById("forecastDay5.8WeatherIcon").setAttribute("src", "http://openweathermap.org/img/wn/" + data3.list[i40].weather[0].icon + "@2x.png");
        }
        for (j40 = 0; j40 < 7; j40++) {
          document.getElementById("forecastDay5.8IconCaption").textContent = data3.list[j40].weather[0].description;
          document.getElementById("forecastDay5.8Temp").textContent = Math.round(data3.list[j40].main.temp) + "℉";
          document.getElementById("forecastDay5.8Humidity").textContent = Math.round(data3.list[j40].main.humidity) + "%";
          document.getElementById("forecastDay5.8Wind").textContent = Math.round(data3.list[j40].wind.speed) + " MPH";
        }
      });
    }
  }
}

searchButton.addEventListener("click", GeoSearch);