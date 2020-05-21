export default async function getData(inputCity, inputUnits) {
  const response = await fetch(`http://api.openweathermap.org/data/2.5/find?q=${inputCity}&units=${inputUnits}&appid=1a0a2e83eb8dee05e7317550828823c8`, { mode: 'cors' });
  const weatherData = await response.json();
  return weatherData;
}
