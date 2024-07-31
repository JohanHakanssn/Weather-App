import { useState } from 'react';
import { fetchWeatherData } from '../api/weatherAPI';
import { UserInputChange } from '../hooks/userInputChange';
import SearchField from './SearchField';

// Hanterar input-förändringar, hämtar väderdata från API:et och visar upp datan på sidan
function WeatherFetcher() {
	const [location, handleInputChange] = UserInputChange();
	const [weatherData, setWeaterData] = useState(null);

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
				icon: data.currentConditions.icon,
			};
			setWeaterData(selectedData);
		}
	};

	return (
		<div>
			<SearchField
				value={location}
				onChange={handleInputChange}
				onSubmit={handleSubmit}
			/>

			{weatherData && (
				<div>
					<h2>Weather for {weatherData.address}</h2>
					<img src='' alt='' />
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

export default WeatherFetcher;
