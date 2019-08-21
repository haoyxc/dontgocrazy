import React, {useState} from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import AllTimes from './components/AllTimes';
import Insights from './components/Insights';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faHistory, faChartLine, faPaw } from '@fortawesome/free-solid-svg-icons';

function App() {
  const id = localStorage.getItem("userId");
  const [currentPage, setCurrentPage] = useState(<Dashboard />)
	return (
		<div className="container-main">
			<header className="container-header">
				<button className="logo" onClick = {() => setCurrentPage(<Dashboard />)}>
					<FontAwesomeIcon icon={faPaw} />
				</button>
				<button className="active" onClick = {() => setCurrentPage(<Dashboard />)}>
					<FontAwesomeIcon icon={faChartBar} /> Dashboard
				</button>
				<div />
				<button onClick = {() => setCurrentPage(<AllTimes />)}>
					<FontAwesomeIcon icon={faHistory} /> History
				</button>
				<div />
				<button onClick = {() => setCurrentPage(<Insights />)}>
					<FontAwesomeIcon icon={faChartLine} /> Insights
				</button>
			</header>
			{currentPage}
		</div>
	);
}

export default App;
