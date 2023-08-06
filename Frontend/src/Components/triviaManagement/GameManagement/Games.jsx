import React, { useState, useEffect } from "react";
import GameForm from "./GameForm";
import { getGames, updateGame, deleteGame, addGame } from "./GameService";
import Loader from "../../../loader";

const Games = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const showLoader = (message) => {
    setLoading(true);
    setLoadingMessage(message);
  };

  const hideLoader = () => {
    setLoading(false);
    setLoadingMessage("");
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      showLoader("Fetching Trivia Games...");
      const gamesData = await getGames();
      hideLoader();
      setGames(gamesData);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  const handleAddGame = async (gameData) => {
    try {
      console.log(gameData);
      if (gameData.game_id) {
        showLoader("Updating Trivia Games...");
        await updateGame(gameData);
        hideLoader();
      } else {
        showLoader("Adding Trivia Games...");
        await addGame(gameData);
        hideLoader();
      }
      fetchGames();
    } catch (error) {
      console.error("Error adding game:", error);
    }
  };

  const handleDeleteGame = async (gameId) => {
    try {
      console.log(gameId);
      showLoader("Deleting Trivia Games...");
      await deleteGame(gameId);
      hideLoader();
      fetchGames();
    } catch (error) {
      console.error("Error deleting game:", error);
    }
  };

  return (
    <div>
      {isLoading && <Loader open={isLoading} message={loadingMessage} />}
      <h1>Trivia Games</h1>
      <GameForm
        games={games}
        onSave={handleAddGame}
        onDelete={handleDeleteGame}
      />
    </div>
  );
};

export default Games;
