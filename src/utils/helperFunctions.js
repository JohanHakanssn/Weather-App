import { fetchWeatherData } from '../api/weatherAPI';

export const formatTime = (time) => {
	return time.split(':').slice(0, 2).join(':');
};

// Hanterar formulärets submit-händelse
export const handleSubmit = async (event, location, setWeatherData) => {
	event.preventDefault();
	const data = await fetchWeatherData(location);

	if (data) {
		setWeatherData(data);
	}
};
