"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar/Index.jsx";
import withProtectedRoutes from "@/components/layouts/withProtectedRoutes";
import { usePathname } from "next/navigation";

/**
 * Dashboard Layout component
 * @param {{ children: React.ReactNode }} props - The component props
 */
const DashboardLayout = ({ children }) => {
  const [showNavbar, setShowNavbar] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Check if the pathname includes "editAction" or "onboarding"
    if (pathname.includes("editAction") || pathname.includes("onboarding") || pathname.includes("edit")) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [pathname]);

  return (
    <>
      {showNavbar && <Navbar />}
      {children}
    </>
  );
};

export default withProtectedRoutes(DashboardLayout);
