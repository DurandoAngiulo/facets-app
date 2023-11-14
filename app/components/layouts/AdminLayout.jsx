import React from "react";
import Navbar from "@/components/Navbar";
import withProtectedRoutes from "@/components/withProtectedRoutes";

const AdminLayout = (children) => {
  return (
    <>
      <Navbar />
      {children}
      <footer>admin 2023</footer>
    </>
  );
};
export default withProtectedRoutes(AdminLayout);
