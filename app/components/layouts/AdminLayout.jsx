import AppFooter from "@/components/Footer/AppFooter";
import Navbar from "@/components/Navbar";
import withProtectedRoutes from "@/components/withProtectedRoutes";
import React from "react";

const AdminLayout = (children) => {
  return (
    <>
      <Navbar />
      {children}
      <AppFooter/>
    </>
  );
};
export default withProtectedRoutes(AdminLayout);
