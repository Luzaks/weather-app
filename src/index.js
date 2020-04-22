const getElem = (elemId) => {
  return document.getElementById(elemId);
};

    const container = getElem('container');
    const cityInput = getElem('cityName');
    const cityOutput = getElem('weather-city');
    const weatherState = getElem('weather-state');
    const weatherDescription = getElem('weather-description');
    const weatherAdvice = getElem('weather-advice-output');
    const weatherIcon = getElem('weather-icon');
    const degreesAmount = getElem('degrees');
    const feelsLike = getElem('feels_like_output');
    const humidityInput = getElem('humidity_output');
    const pressureInput = getElem('pressure_output');
    const maxTempInput = getElem('temp_max_output');
    const minTempInput = getElem('temp_min_output');
    const windInput = getElem('wind_output');
    const searchButton = getElem('searchButton');
    const backgroundInput = getElem('background-input-container');
    const backgroundOutput = getElem('background-output-container');
    let checkedValue = '';
    let unitDegreeOutput = '';
    let unitWindOutput = '';

    const capitalize = (string) => {
        if (typeof string !== 'string') return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    };


    searchButton.addEventListener('click', ev => {
        if (getElem('cityName').value === '') {
            ev.onsubmit = function(e) {
                e.preventDefault();
            };
        } else {
            backgroundInput.style.display = 'none';
            backgroundOutput.style.display = 'flex';

            const radioValue = () => {
                const radios = document.getElementsByName('degreeS');
                for (let i = 0, length = radios.length; i < length; i++) {
                    if (radios[i].checked) {
                        checkedValue = radios[i].value;
                        break;
                    }
                }

                return checkedValue;
            };
            radioValue();

            fetch('http://api.openweathermap.org/data/2.5/find?q=' + cityInput.value + '&units=' + checkedValue + '&appid=1a0a2e83eb8dee05e7317550828823c8', {mode: 'cors'})
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    const { name, weather, wind } = response.list[0];
                    const { id, main, description, icon } = weather[0];

                    cityOutput.innerText = name;

                    const degreesUnits = (response) => {
                        const { main } = response.list[0];
                        const { id, temp, feels_like, humidity, pressure, temp_max, temp_min} = main;

                        if (checkedValue === 'metric'){
                            unitDegreeOutput = ' C';
                            unitWindOutput = ' m/s';

                        } else if (checkedValue === 'imperial'){
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

                    switch (true) {
                        case (id >= 200) && (id <= 232) :
                            weatherAdvice.innerText = 'Stay indoors. Avoid water, and electric equipment.';
                            break;
                        case (id >= 300) && (id <= 321) :
                            weatherAdvice.innerText = 'You might experience beautiful a sunshine today.';
                            break;
                        case (id >= 500) && (id <= 531) :
                            weatherAdvice.innerText = 'Don\'t forget your umbrella.';
                            break;
                        case (id >= 600) && (id <= 622) :
                            weatherAdvice.innerText = 'Avoid overexertion. Stay dry. Go outside carefully.';
                            break;
                        case (id >= 701) && (id <= 781) :
                            weatherAdvice.innerText = 'Anomalies in atm. Look for official instructions.';
                            break;
                        case id === 800 :
                            weatherAdvice.innerText = 'Use sun protector.';
                            break;
                        case (id >= 801) && (id <= 804) :
                            weatherAdvice.innerText = 'Take a healthy sun bath if you can.';
                            break;
                        default:
                            weatherAdvice.innerText = 'Looking forward for tomorrow\'s weather.';
                    }
                    degreesUnits(response);
                });

        }

    });
