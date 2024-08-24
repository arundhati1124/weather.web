const apikey = "cdb1a5d3a09929fdc1b2df3e685a975c";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const temp = document.querySelector(".temp");
const cname = document.querySelector(".cname");
const wind = document.querySelector(".wind");
const hum = document.querySelector(".hum");
const inputbox = document.querySelector(".country input");
const btn = document.querySelector(".country button");

/// Event listener for button click
btn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const city = inputbox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        alert("Please enter a city name!");
    }
});

/// Function to fetch weather data
async function checkWeather(city) {
    try {
        const response = await fetch(`${apiURL}&q=${city}&appid=${apikey}`);
        const data = await response.json();

        if (response.ok) {
            temp.innerText = `${data.main.temp} °C`;
            cname.innerText = `${data.name}`;
            wind.innerText = `${data.wind.speed} KM/h`;
            hum.innerText = `${data.main.humidity} %`;

            // Update the weather icon based on the weather condition
            const weatherCondition = data.weather[0].main;
            const imgElement = document.querySelector(".img");

            if (weatherCondition === "Clear") {
                imgElement.src = "img/sun.png"; // Sunny
            } else if (weatherCondition === "Clouds") {
                imgElement.src = "img/cloudy.png"; // Cloudy
            } else if (weatherCondition === "Rain") {
                imgElement.src = "img/rainy.png"; // Rainy
            } else if (weatherCondition === "Snow") {
                imgElement.src = "img/snowy.png"; // Snowy
            }
        } else {
            cname.innerText = "City not found!";
            temp.innerText = "";
            wind.innerText = "";
            hum.innerText = "";
            document.querySelector(".img").src = "img/default.png";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        cname.innerText = "Error!";
        temp.innerText = "";
        wind.innerText = "";
        hum.innerText = "";
        document.querySelector(".img").src = "img/default.png";
    }
}
