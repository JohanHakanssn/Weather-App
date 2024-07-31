/* eslint-disable react/prop-types */
function WeatherCard({ date, temp, conditions, humidity, dew }) {
	return (
		<div className='weather-card'>
			<h4>{date}</h4>
			<p>Temperature: {temp}°C</p>
			<p>Conditions: {conditions}</p>
			<p>Humidity: {humidity}%</p>
			<p>sunrise: {dew}</p>
		</div>
	);
}

export default WeatherCard;
