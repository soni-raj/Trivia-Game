import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./formComp.css";
import Button from "@mui/material/Button";
import { SiGoogle, SiFacebook } from "react-icons/si";
import IconButton from "@mui/material/IconButton";
import { TRIVIA_CHECK_EMAIL_EXIST } from "../../../utils/apiUrls";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FormHelperText } from "@mui/material";
import { auth } from "../../../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  FacebookAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
const providerFacebook = new FacebookAuthProvider();
const providerGoogle = new GoogleAuthProvider();
export default function LoginFormComp() {
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const navigate = useNavigate();
  // const navigate = useNavigate();
  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
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
              handleSnackbarOpen(
                "Success Redirecting to 2 Step Authentication"
              );
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
                3000
              );
            } else {
            }
          })
          .catch((error) => {
            navigate("/registersecurityquestion", {
              state: {
                email,
                firstName,
                lastName,
              },
            });
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
              handleSnackbarOpen(
                "Success Redirecting to 2 Step Authentication"
              );
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
                3000
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
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsEmailValid(!!email);
    setIsPasswordValid(!!password);

    if (!email || !password) {
      return;
    }

    try {
      // Perform user login
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          handleSnackbarOpen("Success Redirecting to 2 Step Authentication");

          // Reset form fields
          setEmail("");
          setPassword("");
          setIsEmailValid(true);
          setIsPasswordValid(true);

          // Redirect to the desired page
          setTimeout(
            () =>
              navigate("/loginchecksecurityquestionPage", {
                state: {
                  email,
                },
              }),
            3000
          );
        })
        .catch((err) => {
          handleSnackbarOpen("Failed Wrong email or password");
          console.error("Login error", err);
        });
    } catch (err) {
      handleSnackbarOpen("Failed Wrong email or password");
      console.error("Login error", err);

      // Reset form fields
      setEmail("");
      setPassword("");
      setIsEmailValid(true);
      setIsPasswordValid(true);
    }
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
        <div className="button-container">
          {/* Sign in with Google button */}
          <Button
            variant="outlined"
            startIcon={<SiGoogle />}
            onClick={handleGoogleLogin}
            sx={{ mr: "1rem" }} // Add margin-right of 1rem
          >
            Log in with Google
          </Button>

          {/* Sign in with Facebook button */}
          <Button
            variant="outlined"
            startIcon={<SiFacebook />}
            onClick={handleFacebookLogin}
            sx={{ ml: "1rem" }}
          >
            Log in with Facebook
          </Button>
        </div>
        <TextField
          required
          id="outlined-required"
          placeholder="xyz@gmail.com"
          label="Email"
          type="email"
          InputLabelProps={{
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
            InputLabelProps={{
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
        Not Registered? <a href="/register">Register </a>
      </h6>
      <h6>
        <a href="/forgotpassword">Forgot Password?</a>
      </h6>
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
  );
}
