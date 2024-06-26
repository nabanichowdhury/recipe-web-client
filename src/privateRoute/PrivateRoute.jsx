import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    console.log("User not logged in. Redirecting to login page...");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
