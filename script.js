document.addEventListener("DOMContentLoaded", priviosCitiesShow)


const townName = document.querySelector("#city-name");
// weather details section in app
const temp = document.querySelector("#metric");
const cloudyNum = document.querySelector(".cloudy-num");
const humidityNum = document.querySelector(".humidity-num");
const windNum = document.querySelector(".wind-num");
// search botton 
const searchBotton = document.querySelector("#search-botton");
const search = document.querySelector("input");

const day = document.querySelector("#day")
const date = document.querySelector("#date")

// privios city section in html file
const priviosCities = document.querySelector(".privios-cities")

// when click on cities show the weather of them
priviosCities.addEventListener("click", event => {
    // city name
    const cityName = event.target.innerText;
    // get api for taking data and show it
    callApi(cityName)
})

// when click on button geting data from api
searchBotton.addEventListener("click", cityName => {
    cityName = search.value;
    // get data from api
    callApi(cityName);
    // save city name if it is first time
    saveLocalStorage(cityName)
    // after searching the value of input must clean
    search.value = "";
})

// taking data from api and show in html file
function callApi(city) {
    const cityName = city;
    const apiKey = "0c785bb1b3c3a84ff730f463a9c8c710"
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(json => {
            // get important information from api
            const {weather, main, wind, clouds, name} = json;
            console.log(weather)
            // the temprature of city
            temp.innerText = `${Math.round(main["temp"])}°`;
            // city name
            townName.innerText = name;
            // cloud percent
            cloudyNum.innerText = `${clouds['all']}%`;
            // humidity percent
            humidityNum.innerText = `${main["humidity"]}%`
            // wind speed
            windNum.innerText = `${wind["speed"]} km/h`
        })
        .catch(search.placeholder = "enter valid city")
}

// show current date & time
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
setInterval(() => {
    const currentDate = new Date();
    day.innerText = days[currentDate.getDay()]; 
    date.innerText = `${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
}, 1000);


// saving privios city name to access another time 
// and prevent to searching again
function saveLocalStorage(newCity) {
    let cities;
    if (localStorage.getItem("cities") === null) {
        cities = [];
    }
    else {
        cities = JSON.parse(localStorage.getItem("cities"));
    }
    
    if (!(cities.includes(newCity))) {
        cities.push(newCity);
        localStorage.setItem("cities", JSON.stringify(cities))
    }

}


function priviosCitiesShow () {

    if (localStorage.getItem("cities") !== null) {
        cities = JSON.parse(localStorage.getItem("cities"));
        cities.forEach(element => {
            const p = document.createElement("p");
            p.className = "city-names";
            p.innerText = element;
            priviosCities.appendChild(p);
        });
    }
}