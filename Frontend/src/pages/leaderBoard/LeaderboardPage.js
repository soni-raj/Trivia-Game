import React, { useState, useEffect } from "react";
import axios from "axios";
import { GET_LEADERBOARD_DATA_API } from "../../utils/apiUrls";
import "./leaderboard-page.css";
import TopPerformingPlayers from "../../Components/leaderBoard/TopPerformingPlayers";
import TopPerformingTeams from "../../Components/leaderBoard/TopPerformingTeams";
import CategoryFilter from "../../Components/leaderBoard/CategoryFilter";
import TimeFrameFilter from "../../Components/leaderBoard/TimeFrameFilter";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showTopPlayers, setShowTopPlayers] = useState(false);
  const [showTopTeams, setShowTopTeams] = useState(false);

  const timeFrames = ["Daily", "Weekly", "Monthly", "All-time"];

  const fetchLeaderboardData = async () => {
    try {
      const response = await axios.get(GET_LEADERBOARD_DATA_API);
      setLeaderboardData(response.data);
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
    }
  };

  useEffect(() => {
    if (selectedCategory !== "" || selectedTimeFrame !== "") {
      fetchLeaderboardData();
    }
  }, [selectedCategory, selectedTimeFrame]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedTeam(null);
    setShowTopPlayers(false);
    setShowTopTeams(false);
    if (selectedTimeFrame === "") {
      fetchLeaderboardData();
    }
  };

  const handleTimeFrameChange = (event) => {
    setSelectedTimeFrame(event.target.value);
    setSelectedTeam(null);
    setShowTopPlayers(false);
    setShowTopTeams(false);
    if (event.target.value === "" && selectedCategory !== "") {
      fetchLeaderboardData();
    }
  };

  const getTimeFrame = (gameDate) => {
    const today = new Date();
    const gameDateObj = new Date(gameDate);
    const timeDiff = Math.abs(today - gameDateObj);
    const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return "Daily";
    } else if (diffDays <= 7) {
      return "Weekly";
    } else if (diffDays <= 30) {
      return "Monthly";
    } else {
      return "All-time";
    }
  };

  const handleTeamClick = (team) => {
    setSelectedTeam((prevTeam) => (prevTeam === team ? null : team));
  };

  const handleTopPlayersClick = () => {
    setSelectedCategory("");
    setSelectedTimeFrame("");
    setSelectedTeam(null);
    setShowTopPlayers(true);
    setShowTopTeams(false);
  };

  const handleTopTeamsClick = () => {
    setSelectedCategory("");
    setSelectedTimeFrame("");
    setSelectedTeam(null);
    setShowTopPlayers(false);
    setShowTopTeams(true);
  };

  const filteredLeaderboardData = leaderboardData.filter((item) => {
    const selectedTimeFrameData =
      selectedTimeFrame === "" ? true : getTimeFrame(item.game_date) === selectedTimeFrame;
    const selectedCategoryData =
      selectedCategory === "" ? true : item.game_category === selectedCategory;

    return selectedTimeFrameData && selectedCategoryData;
  });

  const showFilteredData = selectedCategory !== "" || selectedTimeFrame !== "";

  return (
    <div className="page-container">
      <h1>Trivia Game Leaderboard</h1>
      <CategoryFilter selectedCategory={selectedCategory} handleCategoryChange={handleCategoryChange} />
      <TimeFrameFilter
        selectedTimeFrame={selectedTimeFrame}
        handleTimeFrameChange={handleTimeFrameChange}
        timeFrames={timeFrames}
      />
      <div className="button-container">
        <button onClick={handleTopPlayersClick}>Top Players</button>
        <button onClick={handleTopTeamsClick}>Top Teams</button>
      </div>
      {showTopPlayers && <TopPerformingPlayers />}
      {showTopTeams && <TopPerformingTeams />}
      {showFilteredData && filteredLeaderboardData.length > 0 ? (
        <div>
          {filteredLeaderboardData.map((game) => (
            <div key={game.game_id}>
              <h3>Game Category: {game.game_category}</h3>
              {game.teams_score.map((team) => (
                <div
                  key={team.team_id}
                  className={`team ${selectedTeam === team ? "selected" : ""}`}
                  onClick={() => handleTeamClick(team)}
                >
                  <h3>Team Name: {team.team_name}</h3>
                  <p>Team Score: {team.team_score}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : null}
      {selectedTeam && (
        <div className="team-details">
          <h3>Team Name: {selectedTeam.team_name}</h3>
          <p>Team Score: {selectedTeam.team_score}</p>
          <ul>
            {selectedTeam.users_score.map((user) => (
              <li key={user.user_email}>
                <span>Player's Name: {user.user_name}</span>
                <p>Player's Score: {user.user_score}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
