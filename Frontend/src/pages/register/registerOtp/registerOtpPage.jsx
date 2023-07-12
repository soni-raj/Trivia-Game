import React from "react";

import RegisterOtpComponent from "../../../Components/register/registerOtp/registerOtpComponent";

function RegisterOtpPage() {
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

            <RegisterOtpComponent />
          </div>
        </div>
        {/* <div className="login-right-div">
          <img src={myteam} alt="My Team" width="75%" />
        </div> */}
      </div>
    </div>
  );
}

export default RegisterOtpPage;
