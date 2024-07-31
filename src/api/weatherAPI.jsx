// API Key and base URL
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
const baseUrl =
	'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/forecast';

// Funktion för att hämta data från API:et
export const fetchWeatherData = async (location) => {
	const url = `${baseUrl}/${location}?aggregateHours=24&unitGroup=metric&shortColumnNames=false&contentType=json&key=${apiKey}&iconSet=icons1`;

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
