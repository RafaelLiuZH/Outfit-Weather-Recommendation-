const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "afe8ba6f3689920de1cc3a364b1b4ba4";

weatherForm.addEventListener("submit", async event =>{

    event.preventDefault(); // biar ga ke refresh pas di click "See Recomendations"

    const city = cityInput.value;

    if(city){ 
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Enter a City");
    } 
}); 

async function getWeatherData(city){

    const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(APIUrl);

    console.log(response);

    if(!response.ok){
        throw new Error("Undetected City");
    }

    return await response.json();
}

function displayWeatherInfo(data){
    console.log(data);

    const {name: city, main: {temp, humidity}, weather: [{description, id}], date: timezone} = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const temperatureDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const chanceofRain = document.createElement("p");
    const Date = document.createElement("p");

    cityDisplay.textContent = city;
    temperatureDisplay.textContent = `Temperature: ${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    chanceofRain.textContent = `Currently: ${description}`;;

    cityDisplay.classList.add("cityDisplay");
    temperatureDisplay.classList.add("temperatureDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    chanceofRain.classList.add("chanceofRain");

    card.append(cityDisplay);
    card.append(temperatureDisplay);
    card.append(humidityDisplay);
    card.append(chanceofRain);
}

function displayError(message){

    const ErrorDisplay = document.createElement("p");
    ErrorDisplay.textContent = message;

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(ErrorDisplay);
}