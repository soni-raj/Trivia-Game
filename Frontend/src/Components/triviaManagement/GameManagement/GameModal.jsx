import React, { useState, useEffect } from 'react';
import {
    Modal,
    Fade,
    TextField,
    Button,
    Stack,
} from '@mui/material';
import './GameModal.css';

const GameModal = ({ open, onClose, onSave, initialData }) => {
    const [gameData, setGameData] = useState({
        name: '',
        category: '',
        difficulty_level: '',
        time_frame: '',
        no_of_questions: '',
    });

    useEffect(() => {
        if (initialData) {
            setGameData(initialData);
        } else {
            resetGameData();
        }
    }, [initialData]);

    const resetGameData = () => {
        setGameData({
            name: '',
            category: '',
            difficulty_level: '',
            time_frame: '',
            no_of_questions: '',
        });
    };

    const handleSave = () => {
        console.log("Save");
        onSave(gameData);
        resetGameData();
        onClose();
    };

    const handleEdit = () => {
        console.log("Edit");
        onSave(gameData);
        resetGameData();
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose} closeAfterTransition>
            <Fade in={open}>
                <div className="modal-container">
                    <div className="modal-content">
                        <TextField
                            label="Name"
                            value={gameData.name}
                            onChange={(e) =>
                                setGameData({ ...gameData, name: e.target.value })
                            }
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Category"
                            value={gameData.category}
                            onChange={(e) =>
                                setGameData({ ...gameData, category: e.target.value })
                            }
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Difficulty"
                            value={gameData.difficulty_level}
                            onChange={(e) =>
                                setGameData({ ...gameData, difficulty_level: e.target.value })
                            }
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Time Frame"
                            value={gameData.time_frame}
                            onChange={(e) =>
                                setGameData({ ...gameData, time_frame: e.target.value })
                            }
                            fullWidth
                            margin="normal"
                        />
                        
                        <TextField
                            label="Number of Questions"
                            value={gameData.no_of_questions}
                            onChange={(e) =>
                                setGameData({ ...gameData, no_of_questions: e.target.value })
                            }
                            fullWidth
                            margin="normal"
                        />
                        <Stack direction="row" spacing={2}>
                            <Button variant="contained" color="primary" onClick={() => { initialData ? handleEdit() : handleSave() }}>
                                {initialData ? 'Save Game' : 'Add Game'}
                            </Button>
                            <Button variant="contained" onClick={onClose}>
                                Cancel
                            </Button>
                        </Stack>
                    </div>
                </div>
            </Fade>
        </Modal>
    );
};

export default GameModal;
