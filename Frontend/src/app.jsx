// app.js
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Components/navBar/navBarComp";
import "./app.css";
import ChatBot from "./Components/chatBot/bot";

const App = () => {
  return (
    <div className="app">
      <Navbar />
        <ChatBot />
      <Outlet />
    </div>
  );
};

export default App;
