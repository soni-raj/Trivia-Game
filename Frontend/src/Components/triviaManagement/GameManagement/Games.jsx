import React, { useState, useEffect } from "react";
import GameForm from "./GameForm";
import { getGames, updateGame, deleteGame, addGame } from "./GameService";

const Games = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const gamesData = await getGames();
      setGames(gamesData);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  const handleAddGame = async (gameData) => {
    try {
      console.log(gameData);
      if (gameData.game_id) {
        await updateGame(gameData);
      } else {
        await addGame(gameData);
      }
      fetchGames();
    } catch (error) {
      console.error("Error adding game:", error);
    }
  };

  const handleDeleteGame = async (gameId) => {
    try {
      console.log(gameId);
      await deleteGame(gameId);
      fetchGames();
    } catch (error) {
      console.error("Error deleting game:", error);
    }
  };

  return (
    <div>
      <GameForm
        games={games}
        onSave={handleAddGame}
        onDelete={handleDeleteGame}
      />
    </div>
  );
};

export default Games;
