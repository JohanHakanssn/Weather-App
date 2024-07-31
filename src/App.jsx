import { useState } from 'react';
import './assets/styles/global.css';
import { fetchWeatherData } from './api/weatherAPI';

function App() {
	return (
		<div>
			<FetchData />
		</div>
	);
}

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
				address: data.resolvedAddress,
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
					<h2>Weather for {weatherData.address}</h2>
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
