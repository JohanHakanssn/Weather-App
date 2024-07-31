import { useState } from 'react';

export const UserInputChange = () => {
	const [value, setValue] = useState('');

	const handleInputChange = (event) => {
		setValue(event.target.value);
	};

	return [value, handleInputChange];
};
