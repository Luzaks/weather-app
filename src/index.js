    const container = document.getElementById('container');
    const city = document.getElementById('weather-city');
    const weatherState = document.getElementById('weather-state');
    const weatherDescription = document.getElementById('weather-description');
    const weatherAdvice = document.getElementById('weather-advice-output');
    const weatherIcon = document.getElementById('weather-icon');
    const degreesAmount = document.getElementById('degrees');
    const degreeUnits = document.getElementById('degreesUnits');
    const feelsLike = document.getElementById('feels_like_output');
    const humidityInput = document.getElementById('humidity_output');
    const pressureInput = document.getElementById('pressure_output');
    const maxTempInput = document.getElementById('temp_max_output');
    const minTempInput = document.getElementById('temp_min_output');
    const windInput = document.getElementById('wind_output');
    let unitDegreeOutput = '';
    let unitWindOutput = '';

    const capitalize = (string) => {
        if (typeof string !== 'string') return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    fetch('http://api.openweathermap.org/data/2.5/find?q=' + city.innerText + '&units=' + degreeUnits.innerText + '&appid=1a0a2e83eb8dee05e7317550828823c8', {mode: 'cors'})
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            const {name, weather, wind} = response.list[0];
            const {main, description, icon} = weather[0];


            const degreesUnits = (response) => {
                const { main } = response.list[0];
                const { temp, feels_like, humidity, pressure, temp_max, temp_min} = main;

                if (degreeUnits.innerText === 'Metric'){
                    unitDegreeOutput = ' C';
                    unitWindOutput = ' m/s';

                } else if (degreeUnits.innerText === 'Imperial'){
                    unitDegreeOutput = ' F';
                    unitWindOutput = ' mph';
                }
                degreesAmount.innerText = temp + unitDegreeOutput;
                feelsLike.innerText = feels_like + unitDegreeOutput + ' º';
                humidityInput.innerText = humidity + '%';
                pressureInput.innerText = pressure + ' hPa';
                maxTempInput.innerText = temp_max + unitDegreeOutput + ' º';
                minTempInput.innerText = temp_min + unitDegreeOutput + ' º';
                windInput.innerText = wind.speed + unitWindOutput;
            };

            const sourceIcon = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            weatherIcon.setAttribute('src', `${sourceIcon}`);

            weatherState.textContent = `${capitalize(main)}`;

            if (main === description) {
                weatherDescription.textContent = `${capitalize(description)} in your city, be cautious.`;
            } else {
                weatherDescription.textContent = `${capitalize(description)}`;
            }
            degreesUnits(response);
        });