import React from "react";
import withProtectedRoutes from "@/components/layouts/withProtectedRoutes";

const OnboardingLayout = ({ children }) => {
  return <>{children}</>;
};
export default withProtectedRoutes(OnboardingLayout);
