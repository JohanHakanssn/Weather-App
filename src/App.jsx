import { useState } from 'react';
import './assets/styles/global.css';

function App() {
	return (
		<div>
			<FetchData />
		</div>
	);
}

// API Key and base URL
const apiKey = 'ZBAD2VNSZPH8ZAXP3VV94JEXQ';
const baseUrl =
	'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

// Funktion för att hämta data från API:et
const fetchWeatherData = async (location) => {
	const url = `${baseUrl}/${location}?aggregateHours=24&unitGroup=metric&shortColumnNames=false&contentType=json&key=${apiKey}`;

	try {
		const response = await fetch(url, { mode: 'cors' });
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		const json = await response.json();
		console.log('Fetched JSON:', json); // Log the entire JSON response for debugging
		return json;
	} catch (error) {
		console.error('Error fetching weather data:', error.message);
		return null;
	}
};

export default App;

// Hanterar input-förändringar, hämtar väderdata från API:et och visar upp datan på sidan
function FetchData() {
	const [location, setLocation] = useState('');
	const [weatherData, setWeaterData] = useState(null);

	// Hanterar förändringar i input-fältet
	const handleInputChange = (event) => {
		setLocation(event.target.value);
	};

	// Hanterar formulärets submit-händelse
	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = await fetchWeatherData(location);

		if (data) {
			const selectedData = {
				address: data.address,
				description: data.description,
				temp: data.currentConditions.temp,
				conditions: data.currentConditions.conditions,
				feelsLike: data.currentConditions.feelslike,
				humidity: data.currentConditions.humidity,
			};
			setWeaterData(selectedData);
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label htmlFor='location'>Search: </label>
				<input
					type='text'
					name='location'
					id='location'
					placeholder='City'
					required
					onChange={handleInputChange}
					value={location}
				/>
				<button type='submit'>Sök</button>
			</form>
			{weatherData && (
				<div>
					<h2>Weather for {location}</h2>
					<p>{weatherData.description}</p>
					<p>Temperature: {weatherData.temp} °C</p>
					<p>Conditions: {weatherData.conditions}</p>
					<p>Feels like: {weatherData.feelsLike}</p>
					<p>Humidity: {weatherData.humidity}</p>
				</div>
			)}
		</div>
	);
}
