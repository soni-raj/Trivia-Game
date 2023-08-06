import React, { useState, useEffect } from 'react';
import { getGames } from '../triviaManagement/GameManagement/GameService';
import { getTeamsPerUser, storeGame } from './LobbyService';
import { Box, Container, Typography, Grid, Select, MenuItem, FormControl, InputLabel, Button, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, ListItemButton } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { db } from "../../utils/firebase";
import { doc, getDoc, query, collection, getDocs } from "firebase/firestore";
import Loader from '../../loader';

const Lobby = () => {
    const [games, setGames] = useState([]);
    const [categories, setCategories] = useState([]);
    const [difficultyLevels, setDifficultyLevels] = useState([]);
    const [timeFrames, setTimeFrames] = useState([]);
    const [filterCategory, setFilterCategory] = useState('');
    const [filterDifficulty, setFilterDifficulty] = useState('');
    const [filterTimeFrame, setFilterTimeFrame] = useState('');
    const [openTeamsModal, setOpenTeamsModal] = useState(false);
    const [teams, setTeams] = useState([]);
    const [selectedGameId, setSelectedGameId] = useState(null);
    const navigate = useNavigate();
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

    const calculateTimeRemaining = (datetime) => {
        const now = new Date();
        const gameDatetime = new Date(datetime);
        const timeRemaining = gameDatetime - now;
        return timeRemaining > 0 ? timeRemaining : 0;
    };

    const updateRemainingTime = () => {
        const updatedGames = games.map((game) => ({
            ...game,
            timeRemaining: calculateTimeRemaining(game.datetime),
        }));
        setGames(updatedGames);
    };

    const fetchGames = async () => {
        try {
            showLoader("Fetching Trivia Games...");
            const gamesData = await getGames();
            setGames(gamesData);
            hideLoader();
            populateCategoriesAndDifficultyLevels(gamesData);
            fetchParticipantsForGames(gamesData);
        } catch (error) {
            console.error('Error fetching games:', error);
        }
    };
    const fetchParticipantsForGames = async (gamesData) => {
        const updatedGames = await Promise.all(gamesData.map(async (game) => {
            const q = query(
                collection(db, "games", game.game_id, "users")
            );
            const querySnapshot = await getDocs(q);
            const fetchedGameusers = querySnapshot.docs.map((doc) => doc.data().user_email);
            return {
                ...game,
                participants: fetchedGameusers.length,
            };
        }));

        setGames(updatedGames);
    };
    useEffect(() => {
        fetchGames();
        localStorage.removeItem("team_id");
        localStorage.removeItem("game_id");
    }, []);

    useEffect(() => {
        const interval = setInterval(updateRemainingTime, 1000);
        return () => clearInterval(interval);
    });

    const formatTime = (timeRemaining) => {
        const hours = Math.floor(timeRemaining / 3600000);
        const minutes = Math.floor((timeRemaining % 3600000) / 60000);
        const seconds = Math.floor((timeRemaining % 60000) / 1000);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };


    const populateCategoriesAndDifficultyLevels = (gamesData) => {
        const uniqueCategories = new Set(gamesData.map((game) => game.category));
        const uniqueDifficultyLevels = new Set(gamesData.map((game) => game.difficulty_level));
        const uniqueTimeFrames = new Set(gamesData.map((game) => game.time_frame));
        setCategories(Array.from(uniqueCategories));
        setDifficultyLevels(Array.from(uniqueDifficultyLevels));
        setTimeFrames(Array.from(uniqueTimeFrames));
    };

    const filteredGames = games.filter((game) => {
        return (
            (filterCategory === '' || game.category === filterCategory) &&
            (filterDifficulty === '' || game.difficulty_level === filterDifficulty) &&
            (filterTimeFrame === '' || game.time_frame === filterTimeFrame)
        );
    });

    const startGame = async (game_id) => {
        setSelectedGameId(game_id);
        const currentUser = localStorage.getItem("email");
        showLoader("Fetching Teams");
        const teamData = await getTeamsPerUser(currentUser);
        hideLoader();
        setTeams(teamData);
        setOpenTeamsModal(true);
    };

    const handleJoinTeamClick = async (teamId) => {
        console.log(`Joining Team with ID: ${teamId}`);
        console.log(selectedGameId);
        const currentUserEmail = localStorage.getItem("email");

        const gameRef = doc(db, "games", selectedGameId, "teams", teamId);
        const docSnap = await getDoc(gameRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        } else {
            showLoader("Joining Games...");
            await storeGame(selectedGameId, currentUserEmail, teamId);
            hideLoader();
        }
        setOpenTeamsModal(false);
        localStorage.setItem("team_id", teamId);
        localStorage.setItem("game_id", selectedGameId);
        navigate("/game");
    };

    return (
        <Container>
            {isLoading && <Loader open={isLoading} message={loadingMessage} />}
            <Box my={4}>
                <Typography variant="h4" component="h1" align="center" gutterBottom>
                    Trivia Game Lobby
                </Typography>

                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="category-filter-label">Filter by Category</InputLabel>
                            <Select
                                labelId="category-filter-label"
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                label="Filter by Category"
                            >
                                <MenuItem value="">All Categories</MenuItem>
                                {categories.map((category) => (
                                    <MenuItem key={category} value={category}>
                                        {category}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="difficulty-filter-label">Filter by Difficulty</InputLabel>
                            <Select
                                labelId="difficulty-filter-label"
                                value={filterDifficulty}
                                onChange={(e) => setFilterDifficulty(e.target.value)}
                                label="Filter by Difficulty"
                            >
                                <MenuItem value="">All Difficulties</MenuItem>
                                {difficultyLevels.map((difficulty) => (
                                    <MenuItem key={difficulty} value={difficulty}>
                                        {difficulty}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="time-frame-filter-label">Filter by Time Frame</InputLabel>
                            <Select
                                labelId="time-frame-filter-label"
                                value={filterTimeFrame}
                                onChange={(e) => setFilterTimeFrame(e.target.value)}
                                label="Filter by Time Frame"
                            >
                                <MenuItem value="">All Time Frames</MenuItem>
                                {timeFrames.map((timeframe) => (
                                    <MenuItem key={timeframe} value={timeframe}>
                                        {timeframe}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>
            <Grid container spacing={3}>
                {filteredGames.map((game) => (
                    <Grid key={game.game_id} item xs={12} sm={6} md={4}>
                        <Box p={2} border={1} borderRadius={4}>
                            <Typography variant="h6" gutterBottom>
                                {game.name}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Category: {game.category}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Difficulty: {game.difficulty_level}
                            </Typography>
                            {game.participants > 0 && (
                                <Typography variant="body1" gutterBottom>
                                    Participants: {game.participants}
                                </Typography>
                            )}
                            {game.timeRemaining > 0 && (
                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                    Time Remaining: {formatTime(game.timeRemaining)}
                                </Typography>
                            )}
                            <Typography variant="body2" color="textSecondary">
                                Time Frame: {game.time_frame}
                            </Typography>
                            {/* Start button */}
                            <Box mt={2} textAlign="center">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => startGame(game.game_id)}
                                    disabled={game.timeRemaining <= 0}
                                >
                                    Join
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
            <Dialog open={openTeamsModal} onClose={() => setOpenTeamsModal(false)}>
                <DialogTitle>Select a Team</DialogTitle>
                <DialogContent>
                    <List>
                        {teams.map((team) => (
                            <ListItem key={team.teamID} disablePadding>
                                <ListItemButton onClick={() => handleJoinTeamClick(team.teamID)}>
                                    <ListItemText primary={team.team_name} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenTeamsModal(false)} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Lobby;
