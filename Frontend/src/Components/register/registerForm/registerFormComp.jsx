import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import "./formComp.css";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { FormHelperText } from "@mui/material";
import { SiGoogle, SiFacebook } from "react-icons/si";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../utils/firebase";
import { TRIVIA_CHECK_EMAIL_EXIST } from "../../../utils/apiUrls";
import Snackbar from "@mui/material/Snackbar";

import Alert from "@mui/material/Alert";

import axios from "axios";
import {
  FacebookAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const providerFacebook = new FacebookAuthProvider();
const providerGoogle = new GoogleAuthProvider();
export default function RegisterFormComp() {
  const theme = useTheme();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFirstNameValid, setIsFirstNameValid] = useState(true);
  const [isLastNameValid, setIsLastNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("in handle submit...");
    setIsFirstNameValid(!!firstName);
    setIsLastNameValid(!!lastName);
    setIsEmailValid(!!email);
    setIsPasswordValid(!!password);

    if (!firstName || !lastName || !email || !password) {
      return;
    }

    if (!isValidEmail(email)) {
      setIsEmailValid(false);
      return;
    }

    if (!isValidPassword(password)) {
      setIsPasswordValid(false);
      return;
    }

    // Form submission successful
    console.log("Form submitted:", { firstName, lastName, email, password });
    try {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          handleSnackbarOpen("Success Redirecting...");
          // Signed in
          const user = userCredential.user;
          console.log(user);

          // Reset form fields
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
          setIsFirstNameValid(true);
          setIsLastNameValid(true);
          setIsEmailValid(true);
          setIsPasswordValid(true);

          // Navigate to "/QNA" after successful registration and pass data as state
          setTimeout(
            () =>
              navigate("/registersecurityquestion", {
                state: { email, firstName, lastName, password },
              }),
            2000
          );
        })
        .catch((error) => {
          handleSnackbarOpen("Failed this Email Already Exist...");
        });
    } catch (error) {
      // Handle error
    }
  };
  const handleGoogleLogin = () => {
    signInWithPopup(auth, providerGoogle)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.

        let email = result.user.email;
        let name = result.user.displayName.split(" ");
        let firstName = name[0];
        let lastName = name[1];

        console.log(result.user);

        // Check if the email already exists in your backend using Axios
        axios
          .post(TRIVIA_CHECK_EMAIL_EXIST, { email })
          .then((response) => {
            if (response.status === 200) {
              // Email already exists, save it in session and navigate to login check security question page
              setTimeout(
                () =>
                  navigate("/loginchecksecurityquestionPage", {
                    state: {
                      email,
                      firstName,
                      lastName,
                    },
                  }),
                2000
              );
            } else {
            }
          })
          .catch((error) => {
            localStorage.setItem("email", email);
            setTimeout(
              () =>
                navigate("/registersecurityquestion", {
                  state: {
                    email,
                    firstName,
                    lastName,
                  },
                }),
              2000
            );
          });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const handleFacebookLogin = () => {
    signInWithPopup(auth, providerFacebook)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.

        let email = result.user.email;
        let name = result.user.displayName.split(" ");
        let firstName = name[0];
        let lastName = name[1];

        console.log(result.user);

        // Check if the email already exists in your backend using Axios
        axios
          .post(TRIVIA_CHECK_EMAIL_EXIST, { email })
          .then((response) => {
            if (response.status === 200) {
              // Email already exists, save it in session and navigate to login check security question page
              setTimeout(
                () =>
                  navigate(
                    "/loginchecksecurityquestionPage",

                    {
                      state: {
                        email,
                        firstName,
                        lastName,
                      },
                    }
                  ),
                2000
              );
            } else {
            }
          })
          .catch((error) => {
            setTimeout(
              () =>
                navigate("/registersecurityquestion", {
                  state: {
                    email,
                    firstName,
                    lastName,
                  },
                }),
              2000
            );
          });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const isValidEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const isValidPassword = (value) => {
    console.log("In is pass:", value, value.length);
    return value.length >= 8;
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div className="form">
        {/* Sign in with Google button */}
        <div className="button-container">
          {/* Sign in with Google button */}
          <Button
            variant="outlined"
            startIcon={<SiGoogle />}
            onClick={handleGoogleLogin}
            sx={{ mr: "1rem" }} // Add margin-right of 1rem
          >
            Sign in with Google
          </Button>

          {/* Sign in with Facebook button */}
          <Button
            variant="outlined"
            startIcon={<SiFacebook />}
            onClick={handleFacebookLogin}
            sx={{ ml: "1rem" }}
          >
            Sign in with Facebook
          </Button>
        </div>

        <TextField
          required
          id="outlined-required"
          placeholder="First Name"
          label="First Name"
          type="text"
          inputLabelProps={{
            shrink: true,
          }}
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          error={!isFirstNameValid}
          helperText={!isFirstNameValid && "Please enter your first name"}
        />
        <TextField
          required
          id="outlined-required"
          placeholder="Last Name"
          label="Last Name"
          type="text"
          inputLabelProps={{
            shrink: true,
          }}
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          error={!isLastNameValid}
          helperText={!isLastNameValid && "Please enter your last name"}
        />
        <TextField
          required
          id="outlined-required"
          placeholder="xyz@gmail.com"
          label="Email"
          type="email"
          inputLabelProps={{
            shrink: true,
          }}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={!isEmailValid}
          helperText={
            !isEmailValid
              ? email
                ? "Please enter a valid email address"
                : "Please enter your email"
              : ""
          }
        />

        <FormControl
          error={!isPasswordValid}
          sx={{ m: 1, width: "25ch" }}
          variant="outlined"
        >
          <InputLabel
            htmlFor="outlined-adornment-password"
            inputLabelProps={{
              shrink: true,
            }}
          >
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          <FormHelperText>
            {!isPasswordValid
              ? password
                ? "Password should be more than 8 digits"
                : "Please enter your password"
              : ""}
          </FormHelperText>
        </FormControl>
      </div>

      {/* Snackbar to show success or error message */}
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
      <Button
        variant="contained"
        type="submit"
        sx={{
          bgcolor: "#1D267D",
          color: "white",
          padding: {
            xs: "8px 75px",
            md: "8px 190px",
          },
          fontSize: "1rem",
          marginTop: "3px",
          letterSpacing: "3px",
          "&:hover": {
            bgcolor: "#0C134F", // Set your desired hover color here
          },
        }}
      >
        Submit
      </Button>
      <h6>
        Already Registered? <a href="/login">Login</a>
      </h6>
    </Box>
  );
}
