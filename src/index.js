import * as variables from './variables';
import getData from './inputData';

const capitalize = (string) => {
  if (typeof string !== 'string') return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};


variables.searchButton.addEventListener('click', ev => {
  if (variables.cityInput.value === '' || /[a-zA-Z]/.test(variables.cityInput.value) === false) {
    ev.onsubmit = function preventing(e) {
      e.preventDefault();
    };
    // eslint-disable-next-line no-alert
    alert('Name of city not properly fill.');
  } else {
    variables.backgroundInput.style.display = 'none';
    variables.backgroundOutput.style.display = 'flex';
    let checkedValue = '';
    let unitDegreeOutput = '';
    let unitWindOutput = '';

    const radioValue = () => {
      const radios = document.getElementsByName('degreeS');
      for (let i = 0, { length } = radios; i < length; i += 1) {
        if (radios[i].checked) {
          checkedValue = radios[i].value;
          break;
        }
      }

      return checkedValue;
    };
    radioValue();


    getData(`${variables.cityInput.value}`, `${checkedValue}`)
      .then((response) => response).then((response) => {
        const { name, weather, wind } = response.list[0];
        const {
          id, main, description, icon,
        } = weather[0];

        variables.cityOutput.innerText = name;

        const degreesUnits = (response) => {
          const { main } = response.list[0];
          const { // eslint-disable-next-line camelcase
            temp, feels_like, humidity, pressure, temp_max, temp_min,
          } = main;
          if (checkedValue === 'metric') {
            unitDegreeOutput = ' C';
            unitWindOutput = ' m/s';
          } else if (checkedValue === 'imperial') {
            unitDegreeOutput = ' F';
            unitWindOutput = ' mph';
          }
          variables.degreesAmount.innerText = temp + unitDegreeOutput;
          // eslint-disable-next-line camelcase
          variables.feelsLike.innerText = `${feels_like + unitDegreeOutput} º`;
          variables.humidityInput.innerText = `${humidity}%`;
          variables.pressureInput.innerText = `${pressure} hPa`;
          // eslint-disable-next-line camelcase
          variables.maxTempInput.innerText = `${temp_max + unitDegreeOutput} º`;
          // eslint-disable-next-line camelcase
          variables.minTempInput.innerText = `${temp_min + unitDegreeOutput} º`;
          variables.windInput.innerText = wind.speed + unitWindOutput;
        };
        degreesUnits(response);

        const sourceIcon = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        variables.weatherIcon.setAttribute('src', `${sourceIcon}`);

        variables.weatherState.textContent = `${capitalize(main)}`;

        if (main === description) {
          variables.weatherDescription.textContent = `${capitalize(description)} in your city, be cautious`;
        } else {
          variables.weatherDescription.textContent = `${capitalize(description)}`;
        }

        switch (true) {
          case (id >= 200) && (id <= 232):
            variables.weatherAdvice.innerText = 'Stay indoors. Avoid water, and electric equipment';
            break;
          case (id >= 300) && (id <= 321):
            variables.weatherAdvice.innerText = 'You might experience a beautiful sunshine today';
            break;
          case (id >= 500) && (id <= 531):
            variables.weatherAdvice.innerText = 'Don\'t forget your umbrella';
            break;
          case (id >= 600) && (id <= 622):
            variables.weatherAdvice.innerText = 'Avoid overexertion. Stay dry. Go outside carefully';
            break;
          case (id >= 701) && (id <= 781):
            variables.weatherAdvice.innerText = 'Anomalies in atm. Look for official instructions';
            break;
          case id === 800:
            variables.weatherAdvice.innerText = 'Use sun protector';
            break;
          case (id >= 801) && (id <= 804):
            variables.weatherAdvice.innerText = 'Take a healthy sun bath if you can';
            break;
          default:
            variables.weatherAdvice.innerText = 'Looking forward for tomorrow\'s weather';
        }
      });
  }
});
