import { useState } from 'react';

export const useInputChange = () => {
	const [value, setValue] = useState('');

	const handleInputChange = (event) => {
		setValue(event.target.value);
	};

	return [value, handleInputChange];
};
