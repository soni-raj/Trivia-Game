import React, { useEffect, useState } from "react";
import { db } from "../../utils/firebase";
import { Typography, List, ListItem, ListItemText, Button, Container, Box, Snackbar } from "@mui/material";
import { addUserToGame, getTeamsByTeamID, inviteTeamMember } from "./InGameExperienceService";
import { doc, onSnapshot, getDoc, collection, query } from "firebase/firestore";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import ChatBox from "./ChatBox";
import Loader from "../../loader";

const WaitingPage = () => {
  const [startTime, setStartTime] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [fetchedEmails, setFetchedEmails] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [gameData, setGameData] = useState({});
  const navigate = useNavigate();
  const isUserLoggedIn = Boolean(localStorage.getItem("email"));
  const currentUser = localStorage.getItem("email");
  const team_id = localStorage.getItem("team_id");
  const game_id = localStorage.getItem("game_id");
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
    if (!isUserLoggedIn) {
      setShowSnackbar(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);
      return;
    }
    const gameRef = doc(db, "games", game_id);
    const unsubscribe = onSnapshot(gameRef, (docSnapshot) => {
      const gameData = docSnapshot.data();
      setGameData(gameData);
      if (gameData && gameData.datetime) {
        const startDateTime = new Date(gameData.datetime);
        setStartTime(startDateTime);
      }
    });
    return () => unsubscribe();
  }, [game_id]);

  useEffect(() => {
    if (startTime) {
      const interval = setInterval(() => {
        const currentTime = new Date();
        const remainingTime = startTime - currentTime;
        if (remainingTime <= 0) {
          console.log(remainingTime, game_id);
          clearInterval(interval);
          navigate("/game/" + game_id);
          return;
        }
        setTimeRemaining(remainingTime);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startTime]);

  useEffect(() => {
    const startGame = async () => {
      showLoader("Fetching Team details...");
      const teamData = await getTeamsByTeamID(team_id);
      hideLoader();
      setTeamMembers(teamData);
    };
    startGame();
  }, [team_id]);

  useEffect(() => {
    const addUser = async () => {
      const gameRef = doc(db, "games", game_id, "users", currentUser);
      const docSnap = await getDoc(gameRef);
      if (!docSnap.exists()) {
        showLoader("Adding user to game...");
        await addUserToGame(currentUser, game_id);
        hideLoader();
      }
    };
    addUser();
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, "games", game_id, "users")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedEmails = querySnapshot.docs.map((doc) => doc.data().user_email);
      setFetchedEmails(fetchedEmails);
    });

    return () => unsubscribe();
  }, []);

  const formatTime = (timeInMillis) => {
    const hours = Math.floor(timeInMillis / 3600000);
    const minutes = Math.floor((timeInMillis % 3600000) / 60000);
    const seconds = Math.floor((timeInMillis % 60000) / 1000);
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const inviteMember = async (email) => {
    const game_name = gameData.name;
    const fullURL = window.location.href;
    const pathURL = window.location.pathname;
    const cloudRunURL = fullURL.replace(pathURL, "");
    const team_name = teamMembers[0].team_name;
    showLoader("Sending Invite...");
    await inviteTeamMember(email, team_name, team_id, game_name, cloudRunURL);
    hideLoader();
  };

  return (
    <Container maxWidth="md">
      {isLoading && <Loader open={isLoading} message={loadingMessage} />}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        padding="20px"
        background="#f4f4f4"
      >
        <Snackbar
          open={showSnackbar}
          autoHideDuration={3000}
          onClose={() => setShowSnackbar(false)}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            severity="error"
            onClose={() => setShowSnackbar(false)}
          >
            You are not logged in. Redirecting...
          </MuiAlert>
        </Snackbar>
        {startTime ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap="20px"
          >
            <Box>
              <Typography variant="h4" align="center">
                Game Countdown Timer
              </Typography>
              <Typography variant="h5" align="center">
                Time Remaining: {formatTime(timeRemaining)}
              </Typography>
              <List>
                {teamMembers.map((team) => (
                  <Box key={team.teamID} marginBottom="20px">
                    <Typography variant="h6" align="center" margin="30px" >{team.team_name}</Typography>
                    <List>
                      {Object.keys(team.members).map((email) => (
                        <ListItem key={email}>
                          <ListItemText primary={email} />
                          {fetchedEmails.includes(email) ? (
                            <Box display="flex" alignItems="center" color="green">
                              <span style={{ marginRight: "5px", marginLeft: "100px" }}>Online</span>
                              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "green", marginLeft: "5px" }} />
                            </Box>
                          ) : (
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => inviteMember(email)}
                            >
                              Invite
                            </Button>
                          )}
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                ))}
              </List>
            </Box>
            <ChatBox game_id={game_id} team_id={team_id} />
          </Box>
        ) : (
          <Typography variant="h4" align="center">
            Game Start Time Not Available
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default WaitingPage;
