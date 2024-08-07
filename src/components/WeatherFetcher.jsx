import { useState } from 'react';
import { handleSubmit } from '../utils/helperFunctions';
import { UserInputChange } from '../hooks/userInputChange';
import SearchField from './SearchField';
import WeatherCard from './WeatherCard';
import Today from './Today';

// Hanterar input-förändringar, hämtar väderdata från API:et och visar upp datan på sidan
function WeatherFetcher() {
	const [location, handleInputChange] = UserInputChange();
	const [weatherData, setWeatherData] = useState(null);

	return (
		<div>
			<SearchField
				value={location}
				onChange={handleInputChange}
				onSubmit={(event) => handleSubmit(event, location, setWeatherData)}
			/>

			{weatherData && <Today weatherData={weatherData} />}

			{weatherData && weatherData.days && (
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
			)}
		</div>
	);
}

export default WeatherFetcher;
