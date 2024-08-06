/* eslint-disable react/prop-types */
import { todaysDate } from '../hooks/userInputChange';
import icons from '../assets/styles/images/icons';

function Today({ weatherData }) {
	const icon = weatherData.currentConditions.icon;
	const imageSrc = icons[icon];
	return (
		<div>
			<h2>Todays weather in {weatherData.address}</h2>

			<div className='today--Container'>
				{<h2>{todaysDate}</h2>}
				<p>{weatherData.description}</p>
				<img src={imageSrc} alt='Weather Icon' className='today--icon' />
				<p>Temp: {weatherData.currentConditions.temp}°C</p>
				<p>Humidity: {weatherData.currentConditions.humidity}%</p>
				<p>Sunrise: {weatherData.currentConditions.sunrise}</p>
				<p>Sunset: {weatherData.currentConditions.sunset}</p>
			</div>
			<div className='forecast--Container'>
				{weatherData.days[0].hours.map((hour, index) => (
					<div key={index} className='hourly--Forecast'>
						<p> {hour.datetime.split(':').slice(0, 2).join(':')}</p>
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
	);
}

export default Today;
