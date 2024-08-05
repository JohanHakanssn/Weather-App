/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { fetchWeatherData } from '../api/weatherAPI';

function Today() {
	const [today, setToday] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetchWeatherData('London');
				setToday(data);
				console.log('Fetched data:', data); // Logga data för felsökning
			} catch (error) {
				console.error('Failed to fetch data', error);
			}
		};
		fetchData();
	}, []);

	if (!today) {
		return <div>...Loading</div>;
	}

	return (
		<div>
			<h2>Todays weather in London</h2>
			{today ? (
				<>
					<div className='today--Container'>
						{<h2>Dagens Datum här</h2>}
						<p>{today.description}</p>
						<p>Temp: {today.currentConditions.temp}°C</p>
						<p>Humidity: {today.currentConditions.humidity}%</p>
						<p>Sunrise: {today.currentConditions.sunrise}</p>
						<p>Sunset: {today.currentConditions.sunset}</p>
					</div>
					<div className='forecast--Container'>
						{today.days.slice(0, 23).map((hour, index) => (
							<div key={index} className='hourly--Forecast'>
								<p> {today.currentConditions.datetime}</p>

								<p> {hour.temp}°C</p>
							</div>
						))}
					</div>
				</>
			) : (
				<p>...Loading</p>
			)}
		</div>
	);
}

export default Today;
