import "./registerPage.css";
import React from "react";
import FormComp from "../../Components/register/form/formComp";

function RegisterPage() {
  return (
    <div className="register">
      <div className="register-container">
        <div className="register-left-div">
          <div className="register-form">
            <h1 className="register-form-header">
              CREATE YOUR
              <span style={{ marginLeft: "6px", color: "#5C469C" }}>
                ACCOUNT
              </span>{" "}
            </h1>

            <FormComp />
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
