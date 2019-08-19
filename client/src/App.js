import React from 'react';
import './App.css';
import { Doughnut } from 'react-chartjs-2';

function App() {
	return (
		<div className="container-main">
			<header className="container-header">
        Navbar
      </header>
			<div className="piechart-container">
				<Doughnut
					data={{
						datasets: [
							{
                data: [ 30, 20, 10, 30, 20, 10, 30, 20, 10 ].sort((a, b) => b - a),
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
            labels: [ 'Facebook', 'Leetcode', 'Google', 'Leetcode','Youtube','Cooldox','Instagram','Mealpal','Amazon'],
          }}
          options={{
            legend: {
              display: false
            }
          }}
				/>
			</div>
			{/* <div>Main body content</div> */}
		</div>
	);
}

export default App;
