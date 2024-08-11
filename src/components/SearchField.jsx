/* eslint-disable react/prop-types */

function SearchField({ value, onChange, onSubmit }) {
	return (
		<div className='searchField--container'>
			<form onSubmit={onSubmit}>
				<label htmlFor='location'> </label>
				<div className='tb'>
					<div className='td'>
						<input
							className='searchField--input'
							type='text'
							name='location'
							id='location'
							placeholder='City'
							required
							onChange={onChange}
							value={value}
						/>
						<button type='submit' className='search--btn'>
							Search
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default SearchField;
