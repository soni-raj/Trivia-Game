import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios library

const RegisterOtpComponent = () => {
  const location = useLocation();
  const email = location.state.email;
  const firstName = location.state.firstName;
  const lastName = location.state.lastName;

  const [verificationCode, setVerificationCode] = useState("");
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const handleChange = (index, event) => {
    const value = event.target.value;

    if (value.length <= 1) {
      setVerificationCode((prevCode) => {
        const codeArray = prevCode.split("");
        codeArray[index] = value;
        return codeArray.join("");
      });

      if (value !== "") {
        // Focus on the next input field
        if (index < inputRefs.current.length - 1) {
          inputRefs.current[index + 1].focus();
        }
      } else {
        // Focus on the previous input field
        if (index > 0) {
          inputRefs.current[index - 1].focus();
        }
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://us-central1-serverless-391002.cloudfunctions.net/api/verifyCode", // API endpoint URL
        { email, verificationCode } // Request body data
      );

      if (response.status === 200) {
        // OTP verification successful, navigate to "/securityquestion"
        navigate("/registersecurityquestion", {
          state: { email, firstName, lastName },
        });
      } else {
        // Handle error cases here
        console.log("OTP verification failed");
      }
    } catch (error) {
      console.error("Error occurred during OTP verification:", error);
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace") {
      // Clear the input and focus on the previous input field
      if (index > 0) {
        setVerificationCode((prevCode) => {
          const codeArray = prevCode.split("");
          codeArray[index] = "";
          return codeArray.join("");
        });
        inputRefs.current[index - 1].focus();
      }
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "16px" }}>
        {Array.from({ length: 6 }, (_, index) => (
          <input
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            type="text"
            value={verificationCode[index] || ""}
            onChange={(event) => handleChange(index, event)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            maxLength={1}
            style={{
              width: "48px",
              height: "48px",
              marginRight: "8px",
              textAlign: "center",
              fontSize: "20px",
            }}
          />
        ))}
      </div>
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default RegisterOtpComponent;
