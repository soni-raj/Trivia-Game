import React from "react";

import OtpComponent from "../../../Components/forgotPassword/forgotPasswordOtp/otpComponent";
function ConfirmOtpPage() {
  return (
    <div className="login">
      <div className="login-container">
        <div className="login-left-div">
          <div className="login-form">
            <h1 className="login-form-header">
              Enter {"  "}
              <span style={{ marginLeft: "2px", color: "#5C469C" }}>OTP</span>
            </h1>

            {/* <h2 className="form-header-sub"></h2> */}

            <OtpComponent />
          </div>
        </div>
        {/* <div className="login-right-div">
          <img src={myteam} alt="My Team" width="75%" />
        </div> */}
      </div>
    </div>
  );
}

export default ConfirmOtpPage;
