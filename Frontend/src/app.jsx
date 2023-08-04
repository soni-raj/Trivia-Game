// app.js
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Components/navbar/navBarComp";
import "./app.css";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;
