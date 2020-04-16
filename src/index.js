const img = document.querySelector('img');
const city = document.getElementById('weater-city');
fetch('http://api.openweathermap.org/data/2.5/weather?q=London&appid=1a0a2e83eb8dee05e7317550828823c8', {mode: 'cors'})
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log(response);
    });