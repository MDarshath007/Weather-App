const API_KEY = "96d72891e3c89992c227a650ac4207e6"; 
const API_URL = "https://api.openweathermap.org/data/2.5/weather?"

async function getWeather(city) 
{
    const response = await fetch(`${API_URL}q=${city}&appid=${API_KEY}&units=metric`);
    var data = await response.json();

    if(data.cod !== 200)
{
    alert("City not found");
    return;
}

    document.getElementById("city-name").innerHTML = data.name;
    document.getElementById("temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.getElementById("humidity").innerHTML = data.main.humidity + "%";
    document.getElementById("wind").innerHTML = Math.round(data.wind.speed*3.6) + " km/h";

    let weather_icon = document.getElementById("weather-icon");
    switch (data.weather[0].main) {
        case "Clouds":
            weather_icon.src = "Weather-App/Weather-Icons/cloudy.png";
            break;
        case "Clear":
            weather_icon.src = "Weather-App/Weather-Icons/clear.png";
            break;
        case "Rain":
            weather_icon.src = "Weather-App/Weather-Icons/rain.png";
            break;
        case "Drizzle":
            weather_icon.src = "Weather-App/Weather-Icons/drizzle.png";
            break;
        case "Snow":
            weather_icon.src = "Weather-App/Weather-Icons/snow.png";
            break;
        case "Mist":
            weather_icon.src = "Weather-App/Weather-Icons/mist.png";
            break;
        default:
            weather_icon.src = "Weather-App/Weather-Icons/clear.png";
    }
    return data;
}   

var input_city = document.getElementById("input-city");
var search_btn = document.getElementById("search-btn");

search_btn.addEventListener("click", () => 
    {
    const city = input_city.value.trim();
    try {
        if (city == "") 
            {
            alert("Please enter a city name.");
            } 
        else 
            {
            getWeather(city);
        } 
        input_city.value = "";
    }
    catch (error) 
    {
        alert("Error fetching weather data:", error);
    }
});
