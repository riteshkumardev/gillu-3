import React from "react";
import { Route, Navigate } from "react-router-dom";

// const PrivateRoute = ({ element: Element, ...rest }) => {
//   const user = localStorage.getItem("user")
//     ? JSON.parse(localStorage.getItem("user"))
//     : null;

//   return <>{user ? <Element /> : <Navigate to="/login" replace={true} />}</>;
// };
function PrivateRoutes({ children }) {
  // const auth = useAuth();
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  return user ? <>{children}</> : <Navigate to="/login" />;
}

export default PrivateRoutes;
