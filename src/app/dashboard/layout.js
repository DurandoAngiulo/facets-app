"use client";

import Navbar from "@/components/Navbar";
import withProtectedRoutes from "@/components/layouts/withProtectedRoutes";

const DashboardLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default withProtectedRoutes(DashboardLayout);
