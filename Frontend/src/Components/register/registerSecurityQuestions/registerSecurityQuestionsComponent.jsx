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
import { TRIVIA_SAVE_DATA } from "../../../utils/apiUrls";
const theme = createTheme();
function RegisterSecurityQuestion() {
  const location = useLocation();
  const navigate = useNavigate();
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [randomNumber, setRandomNumber] = useState();
  const email = location.state.email;
  const firstname = location.state.firstName;
  const lastname = location.state.lastName;
  console.log(firstname);
  console.log(lastname);

  function onSubmit(event) {
    event.preventDefault();

    axios
      .post(TRIVIA_SAVE_DATA, {
        firstname: firstname,
        lastname: lastname,
        email: email,
        ans1: answer1,
        ans2: answer2,
      })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        alert("Please provide a unique random number");
      });
  }

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
              label="Please enter a random number"
              name="number"
              type="number"
              autoComplete="number"
              autoFocus
              value={randomNumber}
              onChange={(event) => setRandomNumber(event.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Confirm Details
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default RegisterSecurityQuestion;
