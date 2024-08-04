/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { fetchWeatherData } from '../api/weatherAPI';

function Today() {
	const [today, setToday] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetchWeatherData('London');
				setToday(data.locations['London']);
			} catch (error) {
				console.error('Failed to fetch data', error);
			}
		};
		fetchData();
	}, []);

	if (!today) {
		return <div>...Loading</div>;
	}

	//Formarterar datumet till yy-mm-dd
	const currentDate = today.currentConditions.datetime.split('T')[0];

	// Funktion för att formatera tiden till HH:MM
	const formatTime = (datetimeStr) => {
		const time = datetimeStr.split('T')[1];
		const [hour, minute] = time.split(':');
		return `${hour}:${minute}`;
	};

	return (
		<div>
			<h2>Todays weather in London</h2>
			{today ? (
				<>
					<div className='today--Container'>
						<h2>{currentDate}</h2>
						<p>Temp: {today.currentConditions.temp}°C</p>

						<p>Humidity: {today.currentConditions.humidity}%</p>
						<p>Max temp:</p>
						<p>Min temp:</p>
					</div>
					<div className='forecast--Container'>
						{today.values.slice(0, 23).map((hour, index) => (
							<div key={index} className='hourly--Forecast'>
								<p> {formatTime(hour.datetimeStr)}</p>

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
