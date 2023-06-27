import React from "react";
import { Outlet } from "react-router-dom";

import "./app.css";
const App = () => {
  return (
    <div className="app">
      <Outlet></Outlet>
    </div>
  );
};

export default App;
