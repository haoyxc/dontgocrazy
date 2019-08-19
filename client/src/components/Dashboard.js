import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboard, faCalendarDay, faCalendarWeek, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

function Dashboard({ id }) {
	let data = [];
	useEffect(() => {
		fetch('https://tranquil-wildwood-15780.herokuapp.com/allStats/' + id)
			.then(function(response) {
                console.log('response', response)
				return response.json();
			})
			.then(function(myJson) {
                console.log('myJson', myJson);
                console.log(myJson.stats);
            })
            .catch(e => console.log('Error', e));
	}, []);

	return (
		<div className="piechart-container">
			<div className="time-buttons">
				<button className="day">
					<FontAwesomeIcon icon={faCalendarDay} /> Daily
				</button>
				<button className="month">
					<FontAwesomeIcon icon={faCalendarWeek} /> Weekly
				</button>
				<button className="all-time">
					<FontAwesomeIcon icon={faCalendarAlt} /> All-Time
				</button>
			</div>
			{console.log(id)}
			<Bar
				data={{
					datasets: [
						{
							data: [ 34, 22, 16, 33, 25, 13, 4, 44, 11, 0 ].sort((a, b) => b - a),
							backgroundColor: [
								'#ff6363',
								'#ffa463',
								'#fff763',
								'#9fff63',
								'#63ff75',
								'#63ffea',
								'#63a1ff',
								'#7a63ff',
								'#a763ff'
							]
						}
					],
					labels: [
						'Facebook',
						'Leetcode',
						'Google',
						'Leetcode',
						'Youtube',
						'Cooldox',
						'Instagram',
						'Mealpal',
						'Amazon'
					]
				}}
				options={{
					legend: {
						display: false
					}
				}}
			/>
			<div className="day-buttons">
				<button className="left">
					<strong>&lt;</strong>
				</button>
				<button className="middle">
					<FontAwesomeIcon icon={faChalkboard} /> Today
				</button>
				<button className="right">
					<strong>&gt;</strong>
				</button>
			</div>
		</div>
	);
}

export default Dashboard;
