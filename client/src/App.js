import React, {useState} from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faHistory, faChartLine, faPaw } from '@fortawesome/free-solid-svg-icons';

function App() {
  const id = localStorage.getItem("userId");
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
			<currentPage />
		</div>
	);
}

export default App;
