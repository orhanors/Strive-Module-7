import React from "react";
import "./styles.scss";

function Search(props) {
	let { position, location } = props.values;
	return (
		<div className='my-5 search-container flex-column '>
			<p className='text-center'>Search for your next Job!</p>

			<div className='d-flex justify-content-center'>
				<input
					className='search-input mr-2'
					onChange={props.handleChange}
					id='search-location'
					value={location}
					type='textarea'
					placeholder='location'
				/>
				<input
					className='search-input mr-2'
					onChange={props.handleChange}
					value={position}
					id='search-position'
					type='textarea'
					placeholder='position'
				/>
				<button onClick={props.handleSearch}>Search</button>
			</div>
		</div>
	);
}

export default Search;
