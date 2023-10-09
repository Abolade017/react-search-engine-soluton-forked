import React, { useState } from "react";
import axios from "axios";
import "./App.css";
export default function WeatherSearch() {
  const [city, setCity] = useState("");
  // const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});

  function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    let days = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
    ];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
  }
  function displayWeather(response) {
    // setLoaded(true);
    console.log(response.data);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].main,
      city: response.data.name,
      date: formatDate(response.data.dt * 1000) + "minutes"
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "094780c710fa4efd669f0df8c3991927";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <div class="input-group my-3 ">
        <input
          type="text"
          class="form-control"
          placeholder="Enter a city.."
          onChange={updateCity}
        />
        {/* <span class="input-group-text bg-primary" id="basic-addon2"> */}
        <button type="Submit" class="  btn-primary text-white border-none">
          Search
        </button>

        <button type="submit" class=" btn-success text-white">
          Current
        </button>
        {/* </span> */}
      </div>
    </form>
  );

  // if (loaded) {
  return (
    <div>
      <div className="border border-secondary px-4 container" id="container">
        <div className="d-flex ">
          <a href="/">Lisbon</a>
          <a href="/" className="px-4">
            Paris
          </a>
          <a href="/">Sydney</a>
          <a href="/" className="px-4">
            SanFrancisco
          </a>
        </div>
        {form}
        <div className="">
          <div className="text-capitalize city text-secondary">
            {weather.city}
          </div>
          <div className="text-secondary">{weather.date}</div>
          <div className="text-secondary">{weather.description}</div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="d-flex ">
              <div>
                <img src={weather.icon} alt={weather.description} />
              </div>
              <div className="d-flex">
                <div>
                  <strong className=""> {Math.round(weather.temperature)}</strong>
                </div>
                <div>°C</div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <ul>
              <li className="text-secondary">
                Precipitation: {weather.humidity}%
              </li>
              <li className="text-secondary">Wind: {weather.wind}km/h</li>
            </ul>
          </div>
        </div>
        {/* <ul>
        <li>Temperature: {Math.round(weather.temperature)}°C</li>
        <li>Description: {weather.description}</li>
        <li>Humidity: {weather.humidity}%</li>
        <li>Wind: {weather.wind}km/h</li>
        <li>
          <img src={weather.icon} alt={weather.description} />
        </li>
      </ul> */}
      </div>

      <footer><div>coded by <a href="https://github.com/Abolade017/react-search-engine-soluton-forked.git" className="text-primary">Adeola Tawakalitu</a>, from she Codes</div> </footer>
    </div>
  );
  // } else {
  //   return form;
  // }
}
