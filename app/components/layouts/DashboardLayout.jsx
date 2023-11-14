import React from "react";
import Navbar from "@/components/Navbar";
import withProtectedRoutes from "./withProtectedRoutes";

const DashboardLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <footer>2023</footer>
    </>
  );
};

export default withProtectedRoutes(DashboardLayout);
