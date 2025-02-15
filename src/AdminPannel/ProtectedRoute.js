// import { Navigate } from "react-router-dom";
// import { getUser } from "./Auth";

// const ProtectedRoute = ({ children }) => {
//   const user = getUser();
//   return user && user.role === "admin" ? children : <Navigate to="/login" />;
// };

// export default ProtectedRoute;

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
