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

import FormControl from "@mui/material/FormControl";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FormHelperText } from "@mui/material";
// import { useNavigate } from "react-router-dom";

export default function FormComp() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  // const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsEmailValid(!!email);
    setIsPasswordValid(!!password);

    if (!email || !password) {
      return;
    }

    if (!isValidEmail(email) || !isValidPassword(password)) {
      setIsEmailValid(!isValidEmail(email));
      setIsPasswordValid(!isValidPassword(password));
      alert("Wrong Credentials");
      return;
    }

    // Form submission successful
    console.log("Form submitted:", { email, password });
    // Reset form fields
    setEmail("");
    setPassword("");
    setIsEmailValid(true);
    setIsPasswordValid(true);
    alert("You are logged in");
  };

  const isValidEmail = (value) => {
    return value === "aman@gmail.com";
  };

  const isValidPassword = (value) => {
    return value === "123";
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
            onClick={() => console.log("Sign in with Google clicked")}
            sx={{ mr: "1rem" }} // Add margin-right of 1rem
          >
            Log in with Google
          </Button>

          {/* Sign in with Facebook button */}
          <Button
            variant="outlined"
            startIcon={<SiFacebook />}
            onClick={() => console.log("Sign in with Facebook clicked")}
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
        Not Registered? <a href="/register">Register</a>
      </h4>
    </Box>
  );
}
