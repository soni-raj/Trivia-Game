import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TRIVIA_SAVE_QNA, SUBSCRIBE_EMAIL } from "../../../utils/apiUrls";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
const theme = createTheme();
function RegisterSecurityQuestion() {
  const location = useLocation();
  const navigate = useNavigate();
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const email = location.state.email;
  const firstname = location.state.firstName;
  const lastname = location.state.lastName;

  function onSubmit(event) {
    event.preventDefault();

    axios
      .post(TRIVIA_SAVE_QNA, {
        firstname: firstname,
        lastname: lastname,
        email: email,
        ans1: answer1,
        ans2: answer2,
        ans3: answer3,
      })
      .then((res) => {
        axios
          .post(SUBSCRIBE_EMAIL, {
            email: email,
          })
          .then((res) => {
            handleSnackbarOpen("Success Please Confirm your Email!");
            localStorage.setItem("email", email);
            setTimeout(() => navigate("/lobby"), 2000);
          });
      })
      .catch((err) => {
        handleSnackbarOpen("failed 2 Step Authentication Failed");
      });
  }
  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Security Questions
          </Typography>
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <Typography variant="subtitle1" gutterBottom component="div">
              Email id: {email}
            </Typography>

            <TextField
              margin="normal"
              required
              fullWidth
              label="Q1. Please provide your favorite sports person name ?"
              name="q1"
              type="q1"
              autoComplete="q1"
              autoFocus
              value={answer1}
              onChange={(event) => setAnswer1(event.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              label="Q2. Please provide your favorite food name ?"
              name="q2"
              type="q2"
              autoComplete="q2"
              autoFocus
              value={answer2}
              onChange={(event) => setAnswer2(event.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              label="Q3. Please provide a Random Number ?"
              name="q3"
              type="q3"
              autoComplete="q3"
              autoFocus
              value={answer3}
              onChange={(event) => setAnswer3(event.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Confirm Details
            </Button>
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={3000}
              onClose={handleSnackbarClose}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert
                onClose={handleSnackbarClose}
                severity={
                  snackbarMessage.trim().split(" ")[0].toLowerCase() ===
                  "success"
                    ? "success"
                    : "error"
                }
                sx={{ width: "100%" }}
              >
                {snackbarMessage}
              </Alert>
            </Snackbar>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default RegisterSecurityQuestion;
