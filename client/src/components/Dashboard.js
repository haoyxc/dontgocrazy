import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboard, faCalendarDay, faCalendarWeek, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

function Dashboard() {
    const [data, setData] = useState([]);
    const [labels, setLabels] = useState([]);
	useEffect(() => {
		fetch('https://tranquil-wildwood-15780.herokuapp.com/allStats/' + localStorage.getItem("userId"))
			.then(function(response) {
				return response.json();
			})
			.then(function(myJson) {
                return myJson.stats;
            })
            .then(function(stats) {
                console.log(stats);
                setData(stats.map((item) => item.time).slice(0,10))
                setLabels(stats.map((item) => item.url).slice(0, 10))
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
			<Bar
				data={{
					datasets: [
						{
							data: [...data, 0],
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
					labels: labels
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
