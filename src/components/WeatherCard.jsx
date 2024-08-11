/* eslint-disable react/prop-types */
import icons from '../assets/styles/images/icons';
import { formatDayAndDate } from '../utils/helperFunctions';

function WeatherCard({ date, temp, conditions, rainChance, icon }) {
	const imageSrc = icons[icon];

	return (
		<div className='weather-card'>
			<h4>{formatDayAndDate(date)}</h4>
			<img src={imageSrc} alt='Weater icon' className='weaterCard--icon' />
			<p>Highest temp: {temp}°C</p>
			<p>{conditions}</p>
			<p>Chance of rain: {rainChance}%</p>
		</div>
	);
}

export default WeatherCard;
