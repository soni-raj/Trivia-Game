import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
} from '@mui/material';
import GameModal from './GameModal';

const GameForm = ({ games, onSave, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGame, setEditingGame] = useState({
    name: '',
    category: '',
    difficulty_level: '',
    time_frame: '',
    no_of_questions: '',
  });

  const handleOpenModal = (gameData) => {
    setEditingGame(gameData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingGame(null);
  };

  const handleSaveGame = (gameData) => {
    onSave(gameData);
    handleCloseModal();
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenModal(null)}
        sx={{ m: 2 }}
      >
        Add Game
      </Button>

      <GameModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveGame}
        initialData={editingGame}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Game</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Difficulty</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {games.map((game) => (
              <TableRow key={game.game_id}>
                <TableCell>{game.name}</TableCell>
                <TableCell>{game.category}</TableCell>
                <TableCell>{game.difficulty_level}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenModal(game)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => onDelete(game.game_id)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default GameForm;
