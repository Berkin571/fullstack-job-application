import React from "react";
import { Navigate } from "react-router-dom";

import { useUser } from "@clerk/clerk-react";

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const { isSignedIn, isLoaded } = useUser();
  // const { pathname } = useLocation();

  if (isLoaded && !isSignedIn && isSignedIn !== undefined) {
    return <Navigate to={"/?sign-in=true"} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
