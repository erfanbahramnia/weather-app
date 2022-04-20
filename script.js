const townName = document.querySelector("#city-name");
// weather details section in app
const temp = document.querySelector("#metric");
const cloudyNum = document.querySelector(".cloudy-num");
const humidityNum = document.querySelector(".humidity-num");
const windNum = document.querySelector(".wind-num");
// search botton 
const searchBotton = document.querySelector("#search-botton");

const search = document.querySelector("input");


searchBotton.addEventListener("click", cityName => {
    cityName = search.value;
    try {
        callApi(cityName);
    }
    catch {}
})


function callApi(city) {
    const cityName = city;
    const apiKey = "0c785bb1b3c3a84ff730f463a9c8c710"
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(json => {
            // get important information from api
            const {weather, main, wind, clouds, name} = json;
            console.log(main)

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
        });
}

