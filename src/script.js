//Current Date
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
let time = `${hours}:${minutes}`;
let year = now.getFullYear();
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let date = now.getDate();
let currentDate = document.querySelector(
  "#current-date"
);
let currentTime = document.querySelector(
  "#current-time"
);
currentDate.innerHTML = `${day}, ${month} ${date}, ${year}`;
currentTime.innerHTML = `${time}`;

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

//Search Engine
function city(event) {
  event.preventDefault();
  let input = document.querySelector(
    "#city-input"
  );

  let cityCurrent = document.querySelector(
    "#city"
  );
  cityCurrent.innerHTML = input.value;
}

let cityForm = document.querySelector(
  "#city-search-form"
);
cityForm.addEventListener(
  "submit",
  city
);

//WeatherAPI

function showWeather(event) {
  event.preventDefault();
  let apiKey =
    "b58c9c779b141dfd6610a16049288662";
  let searchCity = document.querySelector(
    "#city-input"
  );
  let currentCity = document.querySelector(
    "#city"
  );
  currentCity.innerHTML = `${searchCity.value}`;

  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&units=imperial&appid=${apiKey}`;

  axios
    .get(`${apiURL}&appid=${apiKey}`)
    .then(showTemperature);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity.value}&appid=${apiKey}&units=imperial`;
  axios
    .get(`${apiUrl}`)
    .then(displayForecast);
}
let input = document.querySelector(
  "#city-search-form"
);
input.addEventListener(
  "submit",
  showWeather
);

function showTemperature(response) {
  let location = response.data.name;
  let temperature = Math.round(
    response.data.main.temp
  );
  let temperatureHigh = Math.round(
    response.data.main.temp_max
  );
  let temperatureLow = Math.round(
    response.data.main.temp_min
  );
  let weatherDescription =
    response.data.weather[0].main;

  let temperatureElement = document.querySelector(
    "#temperature"
  );
  let temperatureElementHigh = document.querySelector(
    "#temp-high"
  );
  let temperatureElementLow = document.querySelector(
    "#temp-low"
  );
  let locationElement = document.querySelector(
    "#city"
  );
  let weatherDescriptionElement = document.querySelector(
    "#weather-description"
  );
  let weatherIconElement = document.querySelector(
    "#icon"
  );
  locationElement.innerHTML = `${location}`;
  temperatureElement.innerHTML = `${temperature}`;
  temperatureElementHigh.innerHTML = `H: ${temperatureHigh}°`;
  temperatureElementLow.innerHTML = `| L: ${temperatureLow}°`;
  weatherDescriptionElement.innerHTML = `${weatherDescription}`;
  weatherIconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIconElement.setAttribute(
    "alt",
    response.data.weather[0].description
  );
}

function displayForecast(response) {
  let forecastElement = document.querySelector(
    "#forecast"
  );
  forecastElement.innerHTML = null;
  let forecast = null;
  for (
    let index = 0;
    index < 5;
    index++
  ) {
    let forecast =
      response.data.list[index];
    forecastElement.innerHTML += `<div class="col-md">
          <div
            class="card"
            style="width: 8rem"
          >
            <div class="card-body">
              <h5 class="card-title">
                ${formatHours(
                  forecast.dt * 1000
                )}
              </h5>
              <img src="https://openweathermap.org/img/wn/${
                forecast.weather[0].icon
              }@2x.png" id="icon"
                    alt="">
              <p class="card-text">
               <strong>${Math.round(
                 forecast.main.temp_max
               )}°</strong>/${Math.round(
      forecast.main.temp_min
    )}°
              </p>
            </div>
          </div>
        </div>`;
  }
  console.log(forecast);
}
//Weather API with Latitude and Longitude
function showPosition(position) {
  console.log(position);
  let latitude =
    position.coords.latitude;
  let longitude =
    position.coords.longitude;
  console.log(latitude);
  console.log(longitude);
  let units = "imperial";
  let apiKey =
    "b58c9c779b141dfd6610a16049288662";
  let apiGeoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  console.log(apiGeoUrl);
  axios
    .get(apiGeoUrl)
    .then(showTemperature);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(
    showPosition
  );
}
let button = document.querySelector(
  "#location-button"
);
button.addEventListener(
  "click",
  getCurrentPosition
);
