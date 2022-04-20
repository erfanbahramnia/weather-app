function callApi(city) {
    const cityName = city;
    const apiKey = "0c785bb1b3c3a84ff730f463a9c8c710"
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(json => {
            // get important information from api
            const {weather, main, wind, clouds, name} = json;

        });
}

