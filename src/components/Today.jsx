/* eslint-disable react/prop-types */
import icons from '../assets/styles/images/icons';
import { formatTime } from '../utils/helperFunctions';

function Today({ weatherData }) {
	return (
		<div>
			<h2>Todays weather in {weatherData.address}</h2>

			<div className='today--Container'>
				{<h2>{weatherData.days[0].datetime}</h2>}
				<p>{weatherData.description}</p>
				<img
					src={icons[weatherData.days[0].icon]}
					alt='Weather Icon'
					className='today--icon'
				/>
				<p>Temp: {weatherData.currentConditions.temp}°C</p>
				<p>Humidity: {weatherData.currentConditions.humidity}%</p>
				<p>Sunrise: {formatTime(weatherData.currentConditions.sunrise)}</p>
				<p>Sunset: {formatTime(weatherData.currentConditions.sunset)}</p>
				<p>Chance of rain: {weatherData.days[0].precipprob}%</p>

				<div className='forecast--Container'>
					{weatherData.days[0].hours.map((hour, index) => (
						<div key={index} className='hourly--Forecast'>
							<p> {formatTime(hour.datetime)}</p>
							<img
								src={icons[hour.icon]}
								alt='Hourly Weather icon'
								className='today--hourly--icon'
							/>
							<p> {hour.temp}°C</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Today;
