import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // check token
  if (!token) {
    return <Navigate to="/login" />; // redirect to login if not logged in
  }
  return children; // allow access if token exists
};

export default PrivateRoute;
