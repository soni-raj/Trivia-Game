import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./formComp.css";
import Button from "@mui/material/Button";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebase";
export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const [isEmailValid, setIsEmailValid] = useState(true);

  // const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsEmailValid(!!email);

    if (!email) {
      return;
    }

    if (!isValidEmail(email)) {
      setIsEmailValid(false);
      return;
    }

    // Form submission successful
    try {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert(
            "A verification code has been sent to your email address for verification."
          );
          navigate("/login", {});
        })
        .catch((err) => {
          alert("The email provided does not exist in our records.");
        });
    } catch (err) {
      alert("Server Error");
    }

    // Reset form fields
    setEmail("");

    setIsEmailValid(true);

    // alert("Email Sent");
  };

  const isValidEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
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
        <TextField
          required
          id="outlined-required"
          placeholder="Enter your Email Address"
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
      </div>
      <Button
        variant="contained"
        type="submit"
        sx={{
          bgcolor: "#1D267D",
          color: "white",
          padding: {
            xs: "8px 75px",
            md: "8px 130px",
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
        <a href="/login">Login?</a>
      </h4>
    </Box>
  );
}
