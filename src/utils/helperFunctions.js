export const formatTime = (time) => {
	return time.split(':').slice(0, 2).join(':');
};

export function formatDayAndDate(dateString) {
	const date = new Date(dateString);
	const daysOfWeek = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];
	const day = daysOfWeek[date.getDay()];
	return `${day} ${dateString}`;
}
