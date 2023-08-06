import React, { useEffect, useState } from "react";
import axios from "axios";
import { GET_TOP_PERFORMING_TEAMS_API } from "../../utils/apiUrls";
import "./components.css";

const TopPerformingTeams = () => {
  const [topTeamsData, setTopTeamsData] = useState({});

  useEffect(() => {
    fetchTopTeamsData();
  }, []);

  const fetchTopTeamsData = async () => {
    try {
      const response = await axios.get(GET_TOP_PERFORMING_TEAMS_API);
      setTopTeamsData(response.data);
    } catch (error) {
      console.error("Error fetching top performing teams data:", error);
    }
  };

  return (
    <div>
      <h2>Top Performing Teams</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Team Name</th>
            <th>Team Score</th>
            <th>Player's Name</th>
            <th>Player's Score</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(topTeamsData).map(([category, team], index) => (
            <React.Fragment key={`${category}-${team.team_name}`}>
              <tr>
                <td>{index + 1}</td>
                <td>{team.team_name}</td>
                <td>{team.team_score}</td>
                <td>{team.players[0].user_name}</td>
                <td>{team.players[0].user_score}</td>
                <td>{category}</td>
              </tr>
              {team.players.slice(1).map((player) => (
                <tr key={player.user_email}>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>{player.user_name}</td>
                  <td>{player.user_score}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopPerformingTeams;
