import { useState } from 'react';
import { fetchWeatherData } from '../api/weatherAPI';
import { UserInputChange } from '../hooks/userInputChange';
import SearchField from './SearchField';
import WeatherCard from './WeatherCard';
import Today from './Today';

// Hanterar input-förändringar, hämtar väderdata från API:et och visar upp datan på sidan
function WeatherFetcher() {
	const [location, handleInputChange] = UserInputChange();
	const [weatherData, setWeatherData] = useState(null);

	// Hanterar formulärets submit-händelse
	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = await fetchWeatherData(location);

		if (data) {
			setWeatherData(data);
		}
	};

	return (
		<div>
			<SearchField
				value={location}
				onChange={handleInputChange}
				onSubmit={handleSubmit}
			/>

			<Today />

			{weatherData && (
				<div>
					{weatherData.locations && (
						<div>
							<div className='card-container'>
								<h3>
									Weather forecast:
									{weatherData.locations[Object.keys(weatherData.locations)[0]].address}
								</h3>
								{weatherData.locations[
									Object.keys(weatherData.locations)[0]
								].values.map((forecast, index) => (
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
										dew={forecast.sunrise}
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
