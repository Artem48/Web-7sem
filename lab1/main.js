document.getElementById('search').addEventListener("submit", submit);

async function submit(e) {
    e.preventDefault();
    if (e.target[0].value === "") {
        document.getElementById('result').innerHTML = "Enter city name";
    } else {
        let data = await getWeatherFromAPI(e.target[0].value);
        addElementToHTML(data);
    }
}

async function getWeatherFromAPI(city) {
    let searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=841563ac68846089ff5563c74bf86be3";
    let data=await fetch(searchLink);
    return data.json();
}

function addElementToHTML(data){
    if(data.weather){
        let source = document.getElementById('text-template-true').innerHTML;
        let template = Handlebars.compile(source);
        let context = {
            city_name: data.name,
            weather: data.weather[0].main,
            temp: parseInt(data.main.temp - 273) + "°",
            hum: data.main.humidity + "%",
            wind_spd: data.wind.speed + " mps"
        };
        document.getElementById('result').innerHTML = template(context);
    }
    else {
        var source   = document.getElementById('text-template-err').innerHTML;
        var template = Handlebars.compile(source);
        var context = {reason: "Type a valid city name"};
        document.getElementById('result').innerHTML = template(context);
    }
}