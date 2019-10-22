let searchButton = document.getElementById("search-btn");
let searchInput = document.getElementById("search-txt");
searchButton.addEventListener("click", findWeatherDetails);
searchInput.addEventListener("keyup", event =>{
    if (event.key === "Enter")
        findWeatherDetails();
});

function findWeatherDetails() {
    if (searchInput.value === "") {
        document.getElementById('result').innerHTML = "Enter city name";
    }else {
        let searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid=841563ac68846089ff5563c74bf86be3";
        fetch(searchLink)
            .then(data=>data.json())
            .then(data=>{
                var source   = document.getElementById('text-template-true').innerHTML;
                var template = Handlebars.compile(source);
                var context = {city_name: data.name,
                    weather: data.weather[0].main,
                    temp: parseInt(data.main.temp - 273) + "°",
                    hum: data.main.humidity + "%",
                    wind_spd: data.wind.speed + " mps"};
                var html = template(context);

                document.getElementById('result').innerHTML = html;
            })
            .catch(reason=>{
                var source   = document.getElementById('text-template-err').innerHTML;
                var template = Handlebars.compile(source);
                var context = {reason: reason};
                var html = template(context);

                document.getElementById('result').innerHTML = html;
            })
    }
}

