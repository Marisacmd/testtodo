import React from "react";
import { Navigate } from "react-router-dom";
import PrivateRouteProps from "../../../types/PrivateRoute";

const PrivateRoute = ({
  children,
  authenticated,
  redirectPath,
  onSuccessReturnChilden,
}: PrivateRouteProps) => {
  if (!authenticated && onSuccessReturnChilden) {
    return <Navigate to={redirectPath} />;
  }
  return children;
};

export default PrivateRoute;
