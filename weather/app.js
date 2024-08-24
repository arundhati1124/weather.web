apikey="cdb1a5d3a09929fdc1b2df3e685a975c"
apiURL="https://api.openweathermap.org/data/2.5/weather?&units=metric"




/// Function to fetch weather data and update the UI
const temp = document.querySelector(".temp");
const cname = document.querySelector(".cname");
const wind = document.querySelector(".wind");
const hum = document.querySelector(".hum");
const inputbox = document.querySelector(".country input");
const btn = document.querySelector(".country button");

btn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent form from submitting and refreshing the page
    checkWeather(inputbox.value);
});

async function checkWeather(city) {
    try {
        const response = await fetch(`${apiURL}&q=${city}&appid=${apikey}`);
        const data = await response.json();
        
        if (response.ok) {
            temp.innerText = `${data.main.temp} °C`;
            cname.innerText = `${data.name}`;
            wind.innerText = `${data.wind.speed} KM/h`;
            hum.innerText = `${data.main.humidity} %`;
        }  
        const weatherCondition = data.weather[0].main;
        const imgElement = document.querySelector(".img");

        if (weatherCondition === "Clear") {
            imgElement.src = "img/sun.png"; // Replace with your sunny image path
        } else if (weatherCondition === "Clouds") {
            imgElement.src = "img/cloudy.png"; // Replace with your cloudy image path
        } else if (weatherCondition === "Rain") {
            imgElement.src = "img/rainy.png"; // Replace with your rainy image path
        } else if (weatherCondition === "Snow") {
            imgElement.src = "img/snowy.png"; // Replace with your snowy image path
        } 
        else {
            cname.innerText = "City not found!";
            temp.innerText = "";
            wind.innerText = "";
            hum.innerText = "";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        cname.innerText = "Error!";
        temp.innerText = "";
        wind.innerText = "";
        hum.innerText = "";
    }
}