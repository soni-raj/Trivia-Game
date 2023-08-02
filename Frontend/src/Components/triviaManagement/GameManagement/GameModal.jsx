import React, { useState, useEffect } from 'react';
import {
    Modal,
    Fade,
    TextField,
    Button,
    Stack,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import './GameModal.css';
import dayjs from 'dayjs';

const GameModal = ({ open, onClose, onSave, initialData }) => {
    const [gameData, setGameData] = useState({
        name: '',
        category: '',
        difficulty_level: '',
        time_frame: '',
        no_of_questions: '',
        datetime: null,
        description: '',
    });

    useEffect(() => {
        if (initialData) {
            const datetime = dayjs(initialData.datetime);
            setGameData({
                ...initialData,
                datetime: datetime,
            });
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
            datetime: null,
            description: '',
        });
    };

    const handleSave = () => {
        console.log("Save");
        onSave(gameData);
        resetGameData();
        onClose();
    };

    const handleEdit = () => {
        console.log('Edit');
        console.log(gameData);
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
                            onChange={(e) => setGameData({ ...gameData, name: e.target.value })}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Description"
                            value={gameData.description}
                            onChange={(e) => setGameData({ ...gameData, description: e.target.value })}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Category"
                            value={gameData.category}
                            onChange={(e) => setGameData({ ...gameData, category: e.target.value })}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Difficulty"
                            value={gameData.difficulty_level}
                            onChange={(e) => setGameData({ ...gameData, difficulty_level: e.target.value })}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Time Frame"
                            value={gameData.time_frame}
                            onChange={(e) => setGameData({ ...gameData, time_frame: e.target.value })}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Number of Questions"
                            value={gameData.no_of_questions}
                            onChange={(e) => setGameData({ ...gameData, no_of_questions: e.target.value })}
                            fullWidth
                            margin="normal"
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label="Date and Time"
                                value={gameData.datetime}
                                onChange={(newValue) => setGameData({ ...gameData, datetime: newValue })}
                                slotProps={{ textField: { variant: 'outlined' } }}
                                margin="normal"
                                valueType="date time"
                            />
                        </LocalizationProvider>
                        <Stack direction="row" spacing={2} marginTop={2}>
                            <Button variant="contained" color="primary" onClick={() => (initialData ? handleEdit() : handleSave())}>
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
