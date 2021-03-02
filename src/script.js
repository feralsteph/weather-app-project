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
  locationElement.innerHTML = `${location}`;
  temperatureElement.innerHTML = `${temperature}`;
  temperatureElementHigh.innerHTML = `H: ${temperatureHigh}℉`;
  temperatureElementLow.innerHTML = `| L: ${temperatureLow}℉`;
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
