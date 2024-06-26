function updateWeather(response){
    let temperatureElement = document.querySelector("#temperature-value");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#weather-description");
let humidityElement = document.querySelector("#current-humidity")
let windspeedElement = document.querySelector("#current-windspeed");
let timeElement = document.querySelector("#time");
let date = new Date(response.data.time * 1000);
let iconElement = document.querySelector("#temperature-icon");



cityElement.innerHTML = response.data.city;
iconElement.innerHTML = `<img src="${response.data.condition.icon_url}">`;
    timeElement.innerHTML = formatDate(date);
    windspeedElement.innerHTML = `${response.data.wind.speed}km/h`;
descriptionElement.innerHTML = response.data.condition.description;
humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
 temperatureElement.innerHTML =`${Math.round(temperature)}°C`;
    
  getForecast(response.data.city);  
}
function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];
  
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
  }
  


function searchCity(city){
    let apiKey = "0bd4693b39a661e4b0370fe772t7a9o3";
    let apiUrl =`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;
    axios.get(apiUrl).then(updateWeather);
}

function getCity(event){
    event.preventDefault();
    let searchFormInput = document.querySelector("#search-input");
    
searchCity(searchFormInput.value);
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    return days[date.getDay()];
}

function getForecast (city){
    let apiKey ="0bd4693b39a661e4b0370fe772t7a9o3";
    let apiUrl =`https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&unit=metric`;
    axios(apiUrl).then(displayForecast);
}


function displayForecast(response){
    console.log(response.data);

    let forecastHtml = "";

    response.data.daily.forEach(function (day, index) {
        if (index < 5) {
            forecastHtml = forecastHtml + `<div class="weather-forecast" id="forecast">
        <div class="forecast" id="forecast">
          <div id="forecast-day">${formatDay(day.time)}</div>
            <div id="forecast-icon"><img src="${day.condition.icon_url}" width="30px"/>
              <div id="forecast-temp">
            <span id="max-temp">${Math.round(day.temperature.maximum)}°</span> /
            <span id="min-temp">${Math.round(day.temperature.minimum)}°</span>
              </div>
        </div>
      </div>
     </div>`;
        }

    });

    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", getCity);

searchCity("South africa");
