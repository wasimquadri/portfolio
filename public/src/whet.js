document.addEventListener('DOMContentLoaded', () => {
    const locationInput = document.getElementById('locationInput');
    const searchButton = document.getElementById('searchButton');
    const weatherInfo = document.getElementById('weatherInfo');
    const unitSelector = document.getElementById('unitSelector'); 

    let apiKey = '3db747e3cdbfd5a797d14d081c81aaf6';
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

    searchButton.addEventListener('click', () => {
        const location = locationInput.value;

        if (location) {
            getWeatherData(location);
        } else {
            alert('Please enter a location.');
        }
    });

   
    unitSelector.addEventListener('change', () => {
        const selectedUnit = unitSelector.value;

        // Update the API key based on the selected unit
        apiKey = (selectedUnit === 'metric')
            ? '3db747e3cdbfd5a797d14d081c81aaf6'
            : 'f3e8b69f0f4b45ecd520e4d04508161c';

        const location = locationInput.value;
        if (location) {
            getWeatherData(location);
        }
    });

    async function getWeatherData(location) {
        try {
            const selectedUnit = unitSelector.value; // Get the selected unit
            const response = await fetch(`${apiUrl}?q=${location}&appid=${apiKey}&units=${selectedUnit}`);
            const data = await response.json();

            if (response.status === 200) {
                displayWeatherData(data);
            } else {
                weatherInfo.innerHTML = `Error: ${data.message}`;
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            weatherInfo.innerHTML = 'An error occurred while fetching weather data.';
        }
    }

    function displayWeatherData(data) {
        const { name, weather, main } = data;
        const description = weather[0].description;
        const temperature = main.temp;

        const selectedUnit = unitSelector.value; 

        const unitSymbol = (selectedUnit === 'metric') ? '°C' : '°F';

        const weatherHTML = `
            <h2>${name}</h2>
            <p>Weather: ${description}</p>
            <p>Temperature: ${temperature}${unitSymbol}</p>
        `;

        weatherInfo.innerHTML = weatherHTML;
    }
});
