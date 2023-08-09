import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { TRIVIA_CHECK_QNA } from "../../../utils/apiUrls";
import { useState } from "react";
import { useLocation } from "react-router-dom";
const theme = createTheme();

export default function LoginSecurityQuestionsComp() {
  const [q1, SetQ1] = React.useState(
    "Q1. Please provide your favorite sports person name ?"
  );
  const [q2, SetQ2] = React.useState(
    "Q2. Please provide your favorite food name ?"
  );
  const [q3, SetQ3] = React.useState(
    "Q3. Please provide your entered Random number ?"
  );
  const [a1, SetA1] = React.useState("");
  const [a2, SetA2] = React.useState("");
  const [a3, SetA3] = React.useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const location = useLocation();

  const email = location.state.email;

  let navigate = useNavigate();
  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const url = TRIVIA_CHECK_QNA;

      const response = await axios.post(url, {
        email: email,
        userAns1: a1,
        userAns2: a2,
        userAns3: a3,
      });
      console.log(response.status == 200);
      if (response.status == 200) {
        handleSnackbarOpen(
          "success 2 Step Authentication Successful. Redirecting..."
        );
        localStorage.setItem("email", email);
        setTimeout(() => navigate("/lobby"), 2000);
      } else {
        handleSnackbarOpen(
          "failed Provided answers are wrong. Please check again"
        );
      }
    } catch (err) {
      handleSnackbarOpen(
        "failed Provided answers are wrong. Please check again"
      );
    }
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <QuestionAnswerIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Security QnA (Case sensitive)
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Typography variant="subtitle2" gutterBottom component="div">
              {q1}
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="answer1"
              label="Answer"
              name="answer1"
              autoFocus
              value={a1}
              onChange={(event) => {
                SetA1(event.target.value);
              }}
            />
            <Typography variant="subtitle2" gutterBottom component="div">
              {q2}
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="answer2"
              label="Answer"
              name="answer2"
              autoFocus
              value={a2}
              onChange={(event) => {
                SetA2(event.target.value);
              }}
            />

            <Typography variant="subtitle2" gutterBottom component="div">
              {q3}
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="answer2"
              label="Answer"
              name="answer2"
              autoFocus
              value={a3}
              onChange={(event) => {
                SetA3(event.target.value);
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Validate
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleSnackbarClose}
              severity={
                snackbarMessage.trim().split(" ")[0].toLowerCase() === "success"
                  ? "success"
                  : "error"
              }
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
