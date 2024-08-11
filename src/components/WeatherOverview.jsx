import { useState } from 'react';
import { useInputChange } from '../hooks/userInputChange';
import SearchField from './SearchField';
import WeatherCard from './WeatherCard';
import Today from './Today';
import { handleSubmit } from '../api/weatherAPI';

function WeatherOverview() {
	const [location, handleInputChange] = useInputChange();
	const [weatherData, setWeatherData] = useState(null);

	return (
		<div>
			<SearchField
				value={location}
				onChange={handleInputChange}
				onSubmit={(event) => handleSubmit(event, location, setWeatherData)}
			/>

			{weatherData ? <Today weatherData={weatherData} /> : null}
			{weatherData ? (
				<div>
					<div className='card-container'>
						<h3>Weekly forecast: </h3>
						{weatherData.days.slice(1).map((day, index) => (
							<WeatherCard
								key={index}
								date={day.datetime}
								temp={day.tempmax}
								icon={day.icon}
								rainChance={day.precipprob}
								conditions={day.description}
							/>
						))}
					</div>
				</div>
			) : (
				<div className='welcome--div'>
					<h2>Welcome</h2>
					<p>
						Welcome to my Weather App! This website allows you to easily check the
						weather for any city you choose. Simply enter the name/location of the
						city in the search bar and press the search button, and you&apos;ll
						instantly get today&apos;s weather details along with a 7-day forecast.
					</p>
					<p>
						Powered by the Visual Crossing Weather API, our app provides accurate and
						up-to-date weather information, including temperature, humidity, chance of
						rain, and more. Whether you&apos;re planning your day or preparing for the
						week ahead, my app ensures that you stay informed about the weather
						conditions in your selected location.
					</p>
				</div>
			)}
		</div>
	);
}

export default WeatherOverview;
