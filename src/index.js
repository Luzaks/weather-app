    const container = document.getElementById('container');
    const city = document.getElementById('weather-city');
    const weatherState = document.getElementById('weather-state');
    const weatherAdvice = document.getElementById('weather-advice');
    const weatherIcon = document.getElementById('weather-icon');
    const degreesAmount = document.getElementById('degrees');
    const degreeUnits = document.getElementById('degreesUnits');

    const capitalize = (string) => {
        if (typeof string !== 'string') return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    };



    fetch('http://api.openweathermap.org/data/2.5/find?q=' + city.innerText + '&units=' + degreeUnits.innerText + '&appid=1a0a2e83eb8dee05e7317550828823c8', {mode: 'cors'})
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {

            const {name, weather} = response.list[0];
            const {main, description, icon} = weather[0];


            const degreesUnits = (response) => {
                const { main } = response.list[0];
                const { temp, feels_like, humidity, pressure, temp_max, temp_min} = main;

                if (degreeUnits.innerText === 'Metric'){
                    degreesAmount.innerText = temp + ' C'
                } else if (degreeUnits.innerText === 'Imperial'){
                    degreesAmount.innerText = temp +' F'
                }
                console.log(temp, feels_like, humidity, pressure, temp_max, temp_min);
            };

            const sourceIcon = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            weatherIcon.setAttribute('src', `${sourceIcon}`);

            weatherState.textContent = `${capitalize(main)}`;

            if (main === description) {
                weatherAdvice.textContent = `${capitalize(description)} in your city, be cautious.`;
            } else {
                weatherAdvice.textContent = `${capitalize(description)}`;
            }
            degreesUnits(response);
        });