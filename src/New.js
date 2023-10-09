let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
let celciusTemp = null;
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
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}
function getWeather(response) {
    console.log(response.data);
    let temp = document.querySelector("#temp")
    let humidity = document.querySelector("#humidity");
    let wind = document.querySelector("#wind");
    let speed = Math.round(`${response.data.wind.speed}`);
    let weather = document.querySelector("#weather");
    let temperature = Math.round(response.data.main.temp);
    let city = document.querySelector("h1");
    let coordinate = document.querySelector("#coords");
    let weatherIcon = document.querySelector("#icon");
    let date = document.querySelector("#date");

    weatherIcon.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    weatherIcon.setAttribute(
        "alt",
        `https://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
    );
    temp.innerHTML = `${temperature}`;
    city.innerHTML = response.data.name;
    coordinate.innerHTML =
        "Latitude:" +
        Math.round(`${response.data.coord.lat}`) +
        "," +
        "Longitude:" +
        " " +
        Math.round(`${response.data.coord.lon}`);
    humidity.innerHTML = `Humidity:${response.data.main.humidity}`;
    wind.innerHTML = `wind:${speed}km/h`;
    weather.innerHTML = `${response.data.weather[0].description}`;
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
}
function showPosition(position) {
    console.log(position);
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    // let coordinate = document.querySelector("#coords");
    // coordinate.innerHTML = `Latitude:${lat}, Longitude:${lon}`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(`${apiUrl}`).then(getWeather);
    console.log(lon)
}
navigator.geolocation.getCurrentPosition(showPosition);

let currentCity = document.querySelector("button");
currentCity.addEventListener("click", showPosition);
function searchCity(city) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(getWeather);
    console.log(city);
}

function toCelciusUnit(event) {
    event.preventDefault();
    let temp = document.querySelector("#temp");
    temp.innerHTML = Math.round(celciusTemp);
    console.log(celcius)

}
let temp = document.querySelector('#to-celcius');
temp.addEventListener('click', toCelciusUnit)
function toFahenreit() {
    let fahenreit = celcius * (9 / 5) + 32;
    document.querySelector("#temp").innerHTML = fahenreit;

}
let fahenreit = document.querySelector('#to-fahenreit');
fahenreit.addEventListener('click', toFahenreit); function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#search-input").value;
    searchCity(city);
}
let searchedInput = document.querySelector("#form");
searchedInput.addEventListener("submit", handleSubmit);

// < !DOCTYPE html >
// <html>

//     <head>
//         <title>Parcel Sandbox</title>
//         <meta charset="UTF-8" />
//         <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css
//     " />
//         <link rel="preconnect" href="https://fonts.googleapis.com">
//             <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
//                 <link
//                     href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Noto+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Open+Sans:ital,wght@0,300;1,300&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Ubuntu:wght@300;400&display=swap"
//                     rel="stylesheet">
//                     <style>
//                         body {
//                             font - family: 'Noto Sans', sans-serif;

//     }

//                         h1 {
//                             line - height: 40px;
//     }

//                         p {
//                             line - height: 4px;
//     }

//                         .temp {
//                             font - weight: normal;
//     }

//                         #weather {
//                             text - transform: capitalize;
//     }

//                         .weather-details {
//                             display: flex;
//                         align-items: center;
//     }

//                         strong {
//                             font - size: 32px;
//     }

//                         footer {
//                             /* margin: auto;
//                             max-width: 1320px; */
//                             margin - top: 4px;
//     }

//                         .github-link {
//                             text - decoration: none;
//     }
//                     </style>
//                 </head>

//                 <body>
//                     <div id="app" class="container">
//                         <div class="px-4 mt-4 border border-info rounded">
//                             <form action="" class="row pt-3" id="form">
//                                 <div class="col-6">
//                                     <input type="text" id="search-input" class="form-control" placeholder="Type a city ..." />
//                                     <div class="pt-4">
//                                         <h1 class="text-secondary" id="location"></h1>
//                                         <p id="coords"></p>
//                                         <p id="date" class="text-secondary">Wednesday 16:35</p>
//                                         <p id="weather" class="text-secondary">Partly Cloudy</p>
//                                     </div>
//                                 </div>
//                                 <div class="col-3">
//                                     <input type="submit" id="submit" class="form-control bg-primary text-white" />
//                                 </div>
//                                 <div class="col-3">
//                                     <button class="btn btn-success text-white">Current</button>
//                                 </div>
//                             </form>

//                             <div class="row">
//                                 <div class="col-6" id="cloud">
//                                     <div class="weather-details">
//                                         <img src="" alt="" id="icon" />
//                                         <div><strong> <span class="temp" id="temp"> </span></strong><sup class=""><a href="#"
//                                             id="to-celcius">°C </a>|<span class="text-primary"> <a href="#"
//                                                 id="to-fahenreit">°F</a></span></sup></div>
//                                     </div>
//                                 </div>
//                                 <div class="col-6">
//                                     <p class="text-secondary" id="humidity">Humidity: 77%</p>
//                                     <p class="text-secondary" id="wind">Wind: 8 km/h</p>
//                                 </div>
//                             </div>
//                         </div>
//                         <footer>By Adeola Tawakalitu <a href="https://github.com/Abolade017/vanilla-assignment.git" target="_blank"
//                             rel="noopener noreferrer" class="github-link">github
//                             url</a></footer>
//                     </div>

//                     <script src="https://unpkg.com/axios@1.1.2/dist/axios.min.js"></script>
//                     <script src="/index.js"></script>
//                 </body>

//             </html>