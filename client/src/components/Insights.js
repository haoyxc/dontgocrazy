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
	function mostUsed (today, yesterday){
		const top3 = yesterday.slice(0,3)
		let top3Url = top3.map((item)=> item.url)
		const web1 = today.filter((item)=> item.url === top3Url[0])
		const web2 = today.filter((item)=> item.url === top3Url[1])
		const web3 = today.filter((item)=> item.url === top3Url[2])
		let time1;
		let time2;
		let time3;
		if (web1.length > 0){
			time1 = Math.floor((web1[0].time - top3[0].time)/60)
		} else {
			time1 = 0
		}
		if (web2.length > 0){
			time2 = Math.floor((web2[0].time - top3[1].time)/60)
		} else {
			time2 = 0
		}
		if (web1.length > 0){
			time3 =  Math.floor((web3[0].time - top3[2].time)/60)
		} else {
			time3 = 0
		}
		if (top3.length > 0){
			return [{time: time1, url: top3[0].url},{time: time2, url: top3[1].url}, {time: time3, url: top3[2].url}]
		}	
	}

	return (
			<div className="piechart-container">
				<p>Your usage {((percentChange(todayArr, yesterdayArr)>0)? "increased": "decreased")} by {Math.abs(Math.floor(percentChange(todayArr,yesterdayArr)))}%</p>
				<p>You used {Math.abs(minuteChange(todayArr, yesterdayArr))} minutes {((minuteChange(todayArr, yesterdayArr)>0)? "more": "less")} than yesterday!</p>
				<h6>Your top 3 sites yesterday compared to today</h6>
				<ul>
					 {mostUsed(todayArr,yesterdayArr)? mostUsed(todayArr,yesterdayArr).map((item)=> <li>{item.url} used for {item.time} minutes</li>) : <p>Loading</p>}
				</ul>
			</div>
	);
}

export default Insights;