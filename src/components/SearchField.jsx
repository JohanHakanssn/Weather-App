/* eslint-disable react/prop-types */
function SearchField({ value, onChange, onSubmit }) {
	return (
		<div>
			<form onSubmit={onSubmit}>
				<label htmlFor='location'>Search: </label>
				<input
					type='text'
					name='location'
					id='location'
					placeholder='City'
					required
					onChange={onChange}
					value={value}
				/>
				<button type='submit'>Search</button>
			</form>
		</div>
	);
}

export default SearchField;
