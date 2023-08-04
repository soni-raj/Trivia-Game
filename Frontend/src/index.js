import ReactDOM from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/login/loginPage";
import LoginCheckSecurityQuestionPage from "./pages/login/loginSecurityQuestions/loginSecurityQuestionsPage.jsx";

import RegisterPage from "./pages/register/registerPage";
import RegisterSecurityQuestionPage from "./pages/register/securityQuestions/registerSecurityQuestionsPage";
import EditProfilePage from "./pages/editProfile/editProfilePage";
import ForgotPasswordPage from "./pages/forgotPassword/forgotPassword";

// import ConfirmOtpPage from "./pages/forgotPassword/forgotPasswordOtp/otpPage";
import App from "./app";

import Questions from "./Components/triviaManagement/QuestionManagement/Questions";

import UserTeams from "./pages/teams/userTeams";
import TeamStatistics from "./pages/teams/teamStatistics";
import TeamManagement from "./pages/teams/manageTeam";


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
        <Route path="/editprofile" element={<EditProfilePage />} />
        <Route
          path="/registersecurityquestion"
          element={<RegisterSecurityQuestionPage />}
        />
        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
        {/* Updated component name */}
        {/* <Route path="/confirmotp" element={<ConfirmOtpPage />} /> */}
      </Route>

      <Route exact path="/questions" element={<Questions />} />

      {/* FEATURE 3: TEAM ROUTES */}
      <Route path="/user-teams" element={< UserTeams/>} />
      <Route path="/team-statistics" element={< TeamStatistics/>} />
      <Route path="/team-management" element={< TeamManagement/>} />
    </Routes>
  </BrowserRouter>
);
