import React, { useEffect, useState } from "react";
import axios from "axios";
import { GET_TOP_PERFORMING_PLAYERS_API } from "../../utils/apiUrls";
import "./components.css";

const TopPerformingPlayers = () => {
  const [topPlayersData, setTopPlayersData] = useState([]);

  useEffect(() => {
    fetchTopPlayersData();
  }, []);

  const fetchTopPlayersData = async () => {
    try {
      const response = await axios.get(GET_TOP_PERFORMING_PLAYERS_API);
      setTopPlayersData(response.data);
    } catch (error) {
      console.error("Error fetching top performing players data:", error);
    }
  };

  return (
    <div>
      <h2>Top Performing Players</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player's Name</th>
            <th>Player's Score</th>
            <th>Team Name</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {topPlayersData.map((player, index) => (
            <tr key={player.user_email}>
              <td>{index + 1}</td>
              <td>{player.user_name}</td>
              <td>{player.user_score}</td>
              <td>{player.team_name}</td>
              <td>{player.game_category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopPerformingPlayers;
