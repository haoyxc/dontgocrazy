import React from 'react';
import './App.css';
import { Doughnut, Bar } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faChartBar,
	faHistory,
	faChartLine,
	faPaw,
	faChalkboard,
	faCalendarDay,
	faCalendarWeek,
	faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';

function App() {
	return (
		<div className="container-main">
			<header className="container-header">
				<button className="logo">
					<FontAwesomeIcon icon={faPaw} />
				</button>
				<button className="active">
					<FontAwesomeIcon icon={faChartBar} /> Dashboard
				</button>
				<div />
				<button>
					<FontAwesomeIcon icon={faHistory} /> All Times
				</button>
				<div />
				<button>
					<FontAwesomeIcon icon={faChartLine} /> Insights
				</button>
			</header>
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
		</div>
	);
}

export default App;
