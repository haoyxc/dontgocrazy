import React from "react";
import "./App.css";
import PieChart from "react-minimal-pie-chart";

function App() {
  return (
    <div className="container-main">
      <header className="container-header">Your stats for today:</header>
      <div className="piechart-container">
        <PieChart
          data={[
            { title: "One", value: 10, color: "#E38627" },
            { title: "Two", value: 15, color: "#C13C37" },
            { title: "Three", value: 20, color: "#6A2135" }
          ]}
        />
      </div>
      <div>Main body content</div>
    </div>
  );
}

export default App;
