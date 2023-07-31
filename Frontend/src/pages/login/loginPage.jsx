import "./loginPage.css";
import React from "react";
import LoginFormComp from "../../Components/login/form/loginFormComp";

function LoginPage() {
  return (
    <div className="login">
      <div className="login-container">
        <h1 className="login-form-title">
          WELCOME TO{" "}
          <span style={{ marginLeft: "2px", color: "#5C469C" }}>TRIVIA</span>{" "}
          GAME
        </h1>
        <div className="login-left-div">
          <div className="login-form">
            <h1 className="login-form-header">
              LOG{" "}
              <span style={{ marginLeft: "2px", color: "#5C469C" }}>IN</span>
            </h1>

            {/* <h2 className="form-header-sub"></h2> */}

            <LoginFormComp />
          </div>
        </div>
        {/* <div className="login-right-div">
          <img src={myteam} alt="My Team" width="75%" />
        </div> */}
      </div>
    </div>
  );
}

export default LoginPage;
