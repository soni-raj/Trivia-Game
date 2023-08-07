import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./utils/privateRoutes";
import LoginPage from "./pages/login/loginPage";
import LoginCheckSecurityQuestionPage from "./pages/login/loginSecurityQuestions/loginSecurityQuestionsPage.jsx";

import RegisterPage from "./pages/register/registerPage";
import RegisterSecurityQuestionPage from "./pages/register/securityQuestions/registerSecurityQuestionsPage";
import EditProfilePage from "./pages/editProfile/editProfilePage";
import ForgotPasswordPage from "./pages/forgotPassword/forgotPassword";
import Leaderboard from "./pages/leaderBoard/LeaderboardPage";

// import ConfirmOtpPage from "./pages/forgotPassword/forgotPasswordOtp/otpPage";
import App from "./app";

import Questions from "./Components/triviaManagement/QuestionManagement/Questions";

import UserTeams from "./pages/teams/userTeams";
import TeamStatistics from "./pages/teams/teamStatistics";
import TeamManagement from "./pages/teams/manageTeam";
import Games from "./Components/triviaManagement/GameManagement/Games";
import Lobby from "./Components/gameLobby/Lobby";
import InGamePage from "./Components/InGameExperience/InGamePage";
import WaitingPage from "./Components/InGameExperience/WaitingPage";

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
        <Route
          path="/editprofile"
          element={
            <PrivateRoute>
              <EditProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/registersecurityquestion"
          element={
            <PrivateRoute>
              <RegisterSecurityQuestionPage />
            </PrivateRoute>
          }
        />
        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
        {/* Updated component name */}
        {/* <Route path="/confirmotp" element={<ConfirmOtpPage />} /> */}

        <Route
          exact
          path="/questions"
          element={
            <PrivateRoute>
              <Questions />
            </PrivateRoute>
          }
        />

        {/* FEATURE 3: TEAM ROUTES */}
        <Route
          path="/user-teams"
          element={
            <PrivateRoute>
              <UserTeams />
            </PrivateRoute>
          }
        />
        <Route
          path="/team-statistics"
          element={
            <PrivateRoute>
              <TeamStatistics />
            </PrivateRoute>
          }
        />
        <Route
          path="/team-management"
          element={
            <PrivateRoute>
              <TeamManagement />
            </PrivateRoute>
          }
        />

        {/* FEATURE 6: LEADERBOARD ROUTE */}
        <Route
          path="/leaderboard"
          element={
            <PrivateRoute>
              <Leaderboard />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/questions"
          element={
            <PrivateRoute>
              <Questions />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/admin"
          element={
            <PrivateRoute>
              <Games />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/lobby"
          element={
            <PrivateRoute>
              <Lobby />
            </PrivateRoute>
          }
        />
        <Route
          path="/game/"
          element={
            <PrivateRoute>
              <WaitingPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/game/:game_id"
          element={
            <PrivateRoute>
              <InGamePage />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>
);
