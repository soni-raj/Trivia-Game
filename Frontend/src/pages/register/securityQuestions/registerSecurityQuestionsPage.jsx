import React from "react";

import RegisterSecurityQuestion from "../../../Components/register/registerSecurityQuestions/registerSecurityQuestionsComponent";
function RegisterSecurityQuestionPage() {
  return (
    <div className="login">
      <div className="login-container">
        <div className="login-left-div">
          <div className="login-form">
            <h1 className="login-form-header">
              2 Factor{"  "}
              <span style={{ marginLeft: "2px", color: "#5C469C" }}>
                Authenticaton
              </span>
            </h1>

            {/* <h2 className="form-header-sub"></h2> */}

            <RegisterSecurityQuestion />
          </div>
        </div>
        {/* <div className="login-right-div">
          <img src={myteam} alt="My Team" width="75%" />
        </div> */}
      </div>
    </div>
  );
}

export default RegisterSecurityQuestionPage;
