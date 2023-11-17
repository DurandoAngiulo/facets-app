import React from "react";
import withProtectedRoutes from "@/components/withProtectedRoutes";

const OnboardingLayout = (children) => {
  return (
    <>
      {children}
      <footer>onboarding 2023</footer>
    </>
  );
};
export default withProtectedRoutes(OnboardingLayout);
