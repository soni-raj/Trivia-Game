import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./formComp.css";
import Button from "@mui/material/Button";
import { SiGoogle, SiFacebook } from "react-icons/si";
import IconButton from "@mui/material/IconButton";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FormHelperText } from "@mui/material";
import { auth, app } from "../../../utils/firebase";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const navigate = useNavigate();
  // const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const handleFacebookLogin = () => {
    console.log("hereeeee");
    signInWithPopup(auth, providerFacebook)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        // IdP data available using getAdditionalUserInfo(result)
        // ...
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

        // if (emails.contain(result.user.email)) {
        navigate("/registersecurityquestion", {
          state: {
            email,
            firstName,
            lastName,
          },
        });

        // ...
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
          alert("Login Success");
          sessionStorage.setItem("email", email);
          // Reset form fields
          setEmail("");
          setPassword("");
          setIsEmailValid(true);
          setIsPasswordValid(true);

          // Redirect to the desired page
          navigate("/loginchecksecurityquestionPage");
        })
        .catch((err) => {
          alert("Wrong Credentials");
          console.error("Login error", err);
        });
    } catch (err) {
      alert("Wrong Credentials");
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
      <h4>
        Not Registered? <a href="/register">Register </a>
      </h4>
      <h4>
        <a href="/forgotpassword">Forgot Password?</a>
      </h4>
    </Box>
  );
}
