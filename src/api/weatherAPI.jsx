// API Key and base URL
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
const baseUrl =
	'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/timeline';

export const handleSubmit = async (event, location, setWeatherData) => {
	event.preventDefault();
	const data = await fetchWeatherData(location);

	if (data) {
		setWeatherData(data);
	}
};

export const fetchWeatherData = async (location) => {
	const url = `${baseUrl}?locations=${location}&aggregateHours=1&iconSet=icons2&forecastDays=7&unitGroup=metric&shortColumnNames=false&contentType=json&key=${apiKey}`;

	try {
		const response = await fetch(url, { mode: 'cors' });
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		const json = await response.json();
		console.log('Fetched JSON:', json); // Log the entire JSON response for debugging
		return json;
	} catch (error) {
		console.error('Error fetching weather data:', error.message);
		return null;
	}
};
