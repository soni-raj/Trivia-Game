import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const email = localStorage.getItem("email");
  const isAuthenticated = email ? true : false;

  if (isAuthenticated) {
    return children;
  }

  return <Navigate to="/login" />;
};
