function refreshWeather {response
    let temperatureElement = document.querySelector("#temperature-value");
    let temperature = response.data.temperatyre.current;
    let cityElement= document.querySelector("#defined-city");
    let descriptionElement = document.querySelector("#description");
    let HumidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let timeElement = document.querySelector("#dayTime");
    let date = new Date(response.data.time * 1000);
    let picElement = document.querySelector("#temperature-pic");

    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humididtyElement.innerHTML = `${response.data.temperature.humidity}%`;
    windElement.innerHTML = `${response.data.wind.speed}km/h`;
    temperatureElement.innerHTML = Math.round(temperature);
    picElement.innerHTML = `<img src="${response.data.condition.icon_url}" alt="temperature icon class="temperature-pic"/>`;

    getForecast(response.data.city);
}

function formatDate(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    let day = days[date.getDay()];

    if (hours < 10) {
        hours = `0${minutes}`;
    }

    return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
    let apiKey = "b2a5adcct04b33178913oc335f405433";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");

    searchCity(searchInput.value);
}

function getForecast(city) {
    let apiKey = "b2a5adcct04b33178913oc335f405433";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",];

    return days[date.getDay()];
}

function displayForecast(response) {
    let forecastHTML = "";

    response.data.daily.forEach(function (day, index){
        if (index <5) {
            forecastHTML =
            forecastHTML +
             `
        <div class="row">
            <div class="col-2">
              <div class="weather-forecast-day">
                <div class="weather-forecast-date">${formatDay(day.time)}</div>
                <div>
                  <img
                    src="${day.condition.icon_url}"
                    class="weather-forecast-icon"
                  />
                </div>
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-max"><strong>${Math.round(
                    day.temperature.maximum
                  )}°</strong> </span
                  ><span class="weather-forecast-temperature-min">${Math.round(
                    day.temperature.minimum
                  )}°</span>
                </div>
              </div>
            </div>
          </div>
      `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

let searchElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit, handleSearchSubmit");

searchCity("Bloemfontein");
