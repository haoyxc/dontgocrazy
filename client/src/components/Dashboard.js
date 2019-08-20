import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboard, faCalendarDay, faCalendarWeek, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

function Dashboard() {
	const [ allData, setAllData ] = useState([]);
	const [ allLabels, setAllLabels ] = useState([]);
	const [ day, setDay ] = useState(new Date());
	const [ timeInterval, setTimeInterval ] = useState('daily');
	const [ intervalData, setIntervalData ] = useState([]);
	const [ intervalLabels, setIntervalLabels ] = useState([]);

	useEffect(() => {
		fetch('https://tranquil-wildwood-15780.herokuapp.com/allStats/' + localStorage.getItem('userId'))
			.then(function(response) {
				return response.json();
			})
			.then(function(myJson) {
				return myJson.stats;
			})
			.then(function(stats) {
				setAllData(stats);
				console.log(stats);
				let dayArr = stats.filter((item) => item.date == new Date(new Date().toLocaleDateString()));
				setIntervalData(dayArr.map((item) => Math.ceil(item.time / 60)).slice(0, 10));
				setIntervalLabels(dayArr.map((item) => item.url).slice(0, 10));
			})
			.catch((e) => console.log('Error', e));
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
							data: [ ...intervalData, 0 ],
							backgroundColor: [
								'#ff6363',
								'#ffa463',
								'#fff763',
								'#9fff63',
								'#63ff75',
								'#63ffea',
								'#63a1ff',
								'#7a63ff',
								'#a763ff',
								'#f763ff'
							]
						}
					],
					labels: intervalLabels
				}}
				options={{
					legend: {
						display: false
					}
				}}
			/>
			<div className="day-buttons">
				<button
					className="left"
					onClick={() => {
						let d = new Date(day);
						d.setDate(d.getDate() - 1);
						setDay(d);
						let dayArr = allData.filter((item) => item.date == new Date(d.toLocaleDateString()));
						setIntervalData(dayArr.map((item) => Math.ceil(item.time / 60)).slice(0, 10));
						setIntervalLabels(dayArr.map((item) => item.url).slice(0, 10));
					}}
				>
					<strong>&lt;</strong>
				</button>
				<button className="middle">
					<FontAwesomeIcon icon={faChalkboard} /> {day.toLocaleDateString('en-US')}
				</button>
				<button
					className="right"
					onClick={() => {
						if (day.toLocaleDateString('en-US') != new Date().toLocaleDateString('en-US')) {
							let d = new Date(day);
							d.setDate(d.getDate() + 1);
							setDay(d);
							let dayArr = allData.filter((item) => item.date == new Date(d.toLocaleDateString()));
							setIntervalData(dayArr.map((item) => Math.ceil(item.time / 60)).slice(0, 10));
							setIntervalLabels(dayArr.map((item) => item.url).slice(0, 10));
						}
					}}
				>
					<strong>&gt;</strong>
				</button>
			</div>
		</div>
	);
}

export default Dashboard;
