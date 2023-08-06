import React from "react";

const TimeFrameFilter = ({ selectedTimeFrame, handleTimeFrameChange }) => {
  const timeFrames = ["", "Daily", "Weekly", "Monthly", "All-time"];

  return (
    <div className="filter-container">
      <h2>Filter Leaderboards by Time Frame:</h2>
      <select value={selectedTimeFrame} onChange={handleTimeFrameChange}>
        {timeFrames.map((timeFrame) => (
          <option key={timeFrame} value={timeFrame}>
            {timeFrame ? timeFrame : "Select Time Frame"}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimeFrameFilter;
