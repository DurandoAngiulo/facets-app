"use client";

import Navbar from "@/components/Navbar/Index.jsx";
import withProtectedRoutes from "@/components/layouts/withProtectedRoutes";

/**
 * Dashboard Layout component
 * @param {{ children: React.ReactNode }} props - The component props
 */
const DashboardLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default withProtectedRoutes(DashboardLayout);
