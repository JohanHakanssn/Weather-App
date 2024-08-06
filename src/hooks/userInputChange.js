import { useState } from 'react';

export const UserInputChange = () => {
	const [value, setValue] = useState('');

	const handleInputChange = (event) => {
		setValue(event.target.value);
	};

	return [value, handleInputChange];
};

export const todaysDate = new Date().toISOString().split('T')[0];
