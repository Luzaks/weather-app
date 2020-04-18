    const container = document.getElementById('container');
    const city = document.getElementById('weater-city');
    const weatherState = document.getElementById('weather-state');
    const weatherAdvice = document.getElementById('weather-advice');

    const capitalize = (string) => {
        if (typeof string !== 'string') return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    fetch('http://api.openweathermap.org/data/2.5/weather?q='+city.innerText+'&appid=1a0a2e83eb8dee05e7317550828823c8', {mode: 'cors'})
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            const {name, weather, } = response;
            const {main, description, icon} = weather[0];

            weatherState.textContent = `${capitalize(description)}`;
            if (main === 'Clouds'){
                weatherAdvice.textContent = `Be prepare with your umbrella`;
            }
            console.log(name);
            console.log(main);
            console.log(description);
            console.log(icon);
        });

