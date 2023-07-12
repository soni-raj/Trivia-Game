import "./forgotPassword.css";
import React from "react";
import ForgotPassword from "../../Components/forgotPassword/forgotPasswordCompo";

function ForgotPasswordPage() {
  return (
    <div className="login">
      <div className="login-container">
        <div className="login-left-div">
          <div className="login-form">
            <h1 className="login-form-header">
              FORGOT{" "}
              <span style={{ marginLeft: "2px", color: "#5C469C" }}>
                PASSWORD
              </span>
            </h1>

            {/* <h2 className="form-header-sub"></h2> */}

            <ForgotPassword />
          </div>
        </div>
        {/* <div className="login-right-div">
          <img src={myteam} alt="My Team" width="75%" />
        </div> */}
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
