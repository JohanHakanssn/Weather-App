import { useState } from 'react';
import { fetchWeatherData } from '../api/weatherAPI';
import { UserInputChange } from '../hooks/userInputChange';
import SearchField from './SearchField';

// Hanterar input-förändringar, hämtar väderdata från API:et och visar upp datan på sidan
function WeatherFetcher() {
	const [location, handleInputChange] = UserInputChange();
	const [weatherData, setWeatherData] = useState(null);

	// Hanterar formulärets submit-händelse
	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = await fetchWeatherData(location);

		if (data) {
			const locationKey = Object.keys(data.locations)[0];
			const locationData = data.locations[locationKey];

			if (locationData && locationData.currentConditions) {
				const selectedData = {
					address: locationData.address,
					temp: locationData.currentConditions.temp,
					conditions: locationData.currentConditions.conditions,
					feelsLike: locationData.currentConditions.feelslike,
					humidity: locationData.currentConditions.humidity,
					dailyForecasts: locationData.values,
				};
				setWeatherData(selectedData);
			} else {
				console.error('currentConditions is undefined or null');
			}
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
					<h3>Weather for {weatherData.address}</h3>

					{weatherData.dailyForecasts && (
						<div>
							<h2>Daily Forecasts:</h2>

							<ul>
								{weatherData.dailyForecasts.map((forecast, index) => (
									<li key={index}>
										<p>Date: {new Date(forecast.datetime).toLocaleDateString()}</p>
										<p>Temperature: {forecast.temp} °C</p>
										<p>Conditions: {forecast.conditions}</p>
										<p>Humidity: {forecast.humidity}</p>
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default WeatherFetcher;
