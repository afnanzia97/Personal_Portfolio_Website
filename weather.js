// Get user's location and fetch weather data
window.addEventListener('load', () => {
    const locationElement = document.getElementById('location');
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('description');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const apiKey = 'dql0xvdihrizlijs7l1gvy7v86o8kej607xm2mfz';
            const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

            fetch(weatherApiUrl)
                .then(response => response.json())
                .then(data => {
                    const temperature = data.main.temp;
                    const locationName = data.name;
                    const description = data.weather[0].description;

                    locationElement.textContent = `Location: ${locationName}`;
                    temperatureElement.textContent = `Temperature: ${temperature}°C`;
                    descriptionElement.textContent = `Description: ${description}`;
                })
                .catch(error => {
                    locationElement.textContent = 'Unable to fetch weather data';
                });
        }, () => {
            locationElement.textContent = 'Location access denied';
        });
    } else {
        locationElement.textContent = 'Geolocation not supported by this browser.';
    }
});