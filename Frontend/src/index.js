import ReactDOM from "react-dom/client";

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/login/loginPage";
import LoginCheckSecurityQuestionPage from "./pages/login/loginSecurityQuestions/loginSecurityQuestionsPage.jsx";

import RegisterPage from "./pages/register/registerPage";
import RegisterSecurityQuestionPage from "./pages/register/securityQuestions/registerSecurityQuestionsPage";
import RegisterOtpPage from "./pages/register/registerOtp/registerOtpPage";

import ForgotPasswordPage from "./pages/forgotPassword/forgotPassword";
import ConfirmOtpPage from "./pages/forgotPassword/forgotPasswordOtp/otpPage";
import App from "./app";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<App />}>
        <Route exact path="/login" element={<LoginPage />} />
        <Route
          path="/loginchecksecurityquestionPage"
          element={<LoginCheckSecurityQuestionPage />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/registerotp" element={<RegisterOtpPage />} />{" "}
        <Route
          path="/registersecurityquestion"
          element={<RegisterSecurityQuestionPage />}
        />
        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
        {/* Updated component name */}
        <Route path="/confirmotp" element={<ConfirmOtpPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
