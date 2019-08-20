import React, { useEffect, useState } from 'react';

function Insights() {
	const [ today, setToday ] = useState(new Date());
	const [ yesterday, setYesterday] = useState(new Date());
	const [todayArr, setTodayArr] = useState([])
	const [yesterdayArr, setYesterdayArr] = useState([])

	useEffect(()=> {
		fetch('https://tranquil-wildwood-15780.herokuapp.com/allStats/' + localStorage.getItem('userId'))
			.then(function(response) {
				return response.json();
			})
			.then(function(myJson) {
				return myJson.stats;
			})
			.then(function (stats) {
				setTodayArr(stats.filter((item) => item.date == new Date(today.toLocaleDateString())));
				setYesterday(yesterday.setDate(today.getDate()-1))
				setYesterdayArr(stats.filter((item) => item.date == new Date(yesterday.toLocaleDateString())));
			})
			.catch((e) => console.log('Error', e));
	},[])

	function percentChange (today, yesterday){
		let todayTime = today.reduce((accum, curr)=> accum += curr.time,0)
		let yesterdayTime = yesterday.reduce((accum, curr)=> accum += curr.time,0)
		return ((todayTime - yesterdayTime)/(yesterdayTime))*100
	} 
	function minuteChange (today, yesterday){
		let todayTime = today.reduce((accum, curr)=> accum += curr.time,0)
		let yesterdayTime = yesterday.reduce((accum, curr)=> accum += curr.time,0)
		return Math.ceil((todayTime - yesterdayTime)/60)
	} 
	

	return (
			<div className="piechart-container">
				<p>% change in usage:  {Math.floor(percentChange(todayArr,yesterdayArr))}%</p>
				<p>You used {Math.abs(minuteChange(todayArr, yesterdayArr))} minutes {((minuteChange(todayArr, yesterdayArr)>0)? "more": "less")} than yesterday!</p>
			</div>
	);
}

export default Insights;