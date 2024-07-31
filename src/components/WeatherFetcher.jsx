import { useState } from 'react';
import { fetchWeatherData } from '../api/weatherAPI';
import { UserInputChange } from '../hooks/userInputChange';
import SearchField from './SearchField';
import WeatherCard from './WeatherCard';

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
					humidity: locationData.currentConditions.humidity,
					dailyForecasts: locationData.values,
					datetime: locationData.currentConditions.datetime,
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
					{weatherData.dailyForecasts && (
						<div>
							<div className='card-container'>
								<h3>Weather forecast: {weatherData.address}</h3>
								{weatherData.dailyForecasts.map((forecast, index) => (
									<WeatherCard
										key={index}
										date={new Date(forecast.datetimeStr)
											.toLocaleDateString('en-SE', {
												day: 'numeric',
												weekday: 'long',
											})
											.toUpperCase()}
										temp={forecast.temp}
										conditions={forecast.conditions}
										humidity={forecast.humidity}
									/>
								))}
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default WeatherFetcher;
