import "./registerPage.css";
import React from "react";
import RegisterFormComp from "../../Components/register/registerForm/registerFormComp";

function RegisterPage() {
  return (
    <div className="register">
      <div className="register-container">
        <h1 className="register-form-title">
          WELCOME TO{" "}
          <span style={{ marginLeft: "2px", color: "#5C469C" }}>TRIVIA</span>{" "}
          GAME
        </h1>
        <div className="register-left-div">
          <div className="register-form">
            <h1 className="register-form-header">
              CREATE YOUR
              <span style={{ marginLeft: "6px", color: "#5C469C" }}>
                ACCOUNT
              </span>{" "}
            </h1>

            <RegisterFormComp />
          </div>
        </div>
        {/* <div className="register-right-div">
          <img src={myteam} alt="My Team" width="75%" />
        </div> */}
      </div>
    </div>
  );
}

export default RegisterPage;
