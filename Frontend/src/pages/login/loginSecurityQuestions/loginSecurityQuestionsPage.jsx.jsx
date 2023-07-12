import React from "react";

import LoginSecurityQuestionsComp from "../../../Components/login/loginSecurityQuestions/loginSecurityQuestionsComp";
function LoginCheckSecurityQuestionPage() {
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

            <LoginSecurityQuestionsComp />
          </div>
        </div>
        {/* <div className="login-right-div">
          <img src={myteam} alt="My Team" width="75%" />
        </div> */}
      </div>
    </div>
  );
}

export default LoginCheckSecurityQuestionPage;
