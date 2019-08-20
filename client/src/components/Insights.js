import React, { useEffect, useState } from 'react';

function Insights() {
	const [ day, setDay ] = useState(new Date());

	useEffect(()=> {
		fetch('https://tranquil-wildwood-15780.herokuapp.com/allStats/' + localStorage.getItem('userId'))
			.then(function(response) {
				return response.json();
			})
			.then(function(myJson) {
				return myJson.stats;
			})
			.then(function (stats) {
				console.log(stats)
			})
	},[])

	return (
			<div className="piechart-container">
				Insight 
			</div>
	);
}

export default Insights;