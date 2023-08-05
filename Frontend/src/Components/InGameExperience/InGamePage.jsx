import React, { useState, useEffect } from "react";
import { db } from "../../utils/firebase";
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import {
  doc,
  collection,
  getDoc,
  onSnapshot,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import ChatBox from "./ChatBox";
import { afterGame, getUserDetails } from "./InGameExperienceService";
import Loader from "../../loader";

const InGamePage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(50);
  const [timeFrame, setTimeFrame] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("email");
  const team_id = localStorage.getItem("team_id");
  const game_id = localStorage.getItem("game_id");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
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
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const gameRef = doc(db, "games", game_id);
    const unsubscribe = onSnapshot(gameRef, (docSnapshot) => {
      const gameData = docSnapshot.data();
      if (gameData) {
        setTimeRemaining(gameData.time_frame);
        setTimeFrame(gameData.time_frame);
        setQuestions(gameData.questions);
      }
    });
    return () => unsubscribe();
  }, [game_id]);

  useEffect(() => {
    const teamsRef = collection(db, "games", game_id, "teams");
    const unsubscribe = onSnapshot(teamsRef, (querySnapshot) => {
      const teamData = querySnapshot.docs.map((doc) => ({
        name: doc.data().team_name,
        score: doc.data().in_game_score,
      }));
      setTeams(teamData);
    });
    return () => unsubscribe();
  }, [game_id]);

  useEffect(() => {
    const teamRef = doc(db, "games", game_id, "teams", team_id);
    const unsubscribe = onSnapshot(teamRef, (docSnapshot) => {
      const teamData = docSnapshot.data();
      if (teamData && teamData.answeredQuestions) {
        setAnsweredQuestions(teamData.answeredQuestions);
      }
    });
    return () => unsubscribe();
  }, [game_id, team_id]);

  useEffect(() => {
    if (timeRemaining > 0) {
      const countdownInterval = setInterval(() => {
        setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : prevTime));
      }, 1000);

      return () => clearInterval(countdownInterval);
    } else {
      if (currentQuestionIndex < questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        localStorage.removeItem("team_id");
        localStorage.removeItem("game_id");
        updateDetails();
        navigate("/");
      }
      setTimeRemaining(timeFrame);
    }
  }, [timeRemaining, currentQuestionIndex]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const submitAnswer = async () => {
    checkAndUpdateScores(timeRemaining);
    const teamRef = doc(db, "games", game_id, "teams", team_id);
    await updateDoc(teamRef, {
      answeredQuestions: arrayUnion({
        index: currentQuestionIndex,
        value: selectedOption,
      }),
    });
  };

  const checkAndUpdateScores = async (selectTime) => {
    const isCorrect = selectedOption === questions[currentQuestionIndex].correct_answer;
    if (isCorrect) {
      const teamScore = selectTime * 10;
      const teamRef = doc(db, "games", game_id, "teams", team_id);
      const teamDoc = await getDoc(teamRef);
      const previousScore = teamDoc.data().in_game_score || 0;
      const newScore = previousScore + teamScore;
      await updateDoc(teamRef, {
        in_game_score: newScore,
      });
      const userRef = doc(db, "games", game_id, "users", currentUser);
      const userDoc = await getDoc(userRef);
      const previousUserScore = userDoc.data().score || 0;
      const newUserScore = previousUserScore + teamScore + 10;
      await updateDoc(userRef, {
        score: newUserScore
      });
    }
    openSnackbar(isCorrect);
  };

  const updateDetails = (async () => {
    showLoader("Game Finished...");
    const userData = await afterGame(game_id, currentUser, team_id);
    hideLoader();
    console.log(userData);
  });

  const openSnackbar = (isCorrect) => {
    setSnackbarOpen({ open: true, isCorrect });
  };

  return (
    <Container>
      {isLoading && <Loader open={isLoading} message={loadingMessage} />}
      <Box display="flex" justifyContent="space-between">
        <Box marginRight="20px">
          <Typography variant="h5" gutterBottom>
            Team Scores
          </Typography>
          {teams.map((team) => (
            <Typography key={team.name} variant="body1" gutterBottom>
              {team.name}: {team.score}
            </Typography>
          ))}
        </Box>
        <Box>
          <Typography variant="h4" align="center" gutterBottom>
            Question {currentQuestionIndex + 1}
          </Typography>
          <Box display="flex" flexDirection="column" alignItems="center">
            {questions.length > 0 && currentQuestionIndex < questions.length ? (
              <>
                <Typography variant="h6" gutterBottom>
                  {questions[currentQuestionIndex].question}
                </Typography>
                <List>
                  {questions[currentQuestionIndex].options.map((option, index) => {
                    const isAnswered = answeredQuestions.some(
                      (answered) => answered.index === currentQuestionIndex
                    );
                    const selectedValue = isAnswered
                      ? answeredQuestions.find((answered) => answered.index === currentQuestionIndex).value
                      : selectedOption;

                    return (
                      <ListItem key={index}>
                        <ListItemText>
                          <Button
                            variant={selectedValue === option ? "contained" : "outlined"}
                            onClick={() => handleOptionSelect(option)}
                            disabled={isAnswered}
                          >
                            {option}
                          </Button>
                        </ListItemText>
                      </ListItem>
                    );
                  })}
                </List>
                <Button
                  variant="contained"
                  onClick={submitAnswer}
                  disabled={answeredQuestions.some((answered) => answered.index === currentQuestionIndex)}
                >
                  Submit Answer
                </Button>
                <Typography variant="body1" gutterBottom>
                  Time Remaining: {timeRemaining} seconds
                </Typography>
              </>
            ) : (
              <Typography variant="h6" align="center">
                No more questions available.
              </Typography>
            )}
          </Box>
        </Box>
        <Box>
          <ChatBox game_id={game_id} team_id={team_id} />
        </Box>
        <Snackbar
          open={snackbarOpen.open}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
        >
          <SnackbarContent
            message={snackbarOpen.isCorrect ? "Correct answer!" : "Wrong answer!"}
            style={{ backgroundColor: snackbarOpen.isCorrect ? "#4caf50" : "#f44336" }} // Green for correct, red for wrong
          />
        </Snackbar>
      </Box>
    </Container>
  );
};

export default InGamePage;
