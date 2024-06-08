function updateWeather(response){
    let temperatureElement = document.querySelector("#temperature-value");
    let temperature =  response.data.temperature.current;
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


let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", getCity);

searchCity("Mokopane");
