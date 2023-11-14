"use client";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import ROUTES from "@/constants/routes";

const withProtectedRoutes = (ComponentToWrap) => {
  const WrappedWithProtectedRoutes = () => {
    const { currentUser, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    if (loading) {
      // If the authentication state is still loading, you can show a loading indicator
      return <div>Loading...</div>;
    }

    // Check if the current route starts with "/admin"
    const isAdminRoute = pathname.startsWith("/admin");

    // Check if the current route starts with "/app"
    const isMemberRoute = pathname.startsWith("/dashboard");
    console.log(isMemberRoute, "route");

    // If currentUser is null, allow access to all pages that are not "/admin" or "/dashboard/"
    if (!currentUser) {
      router.push(`${ROUTES.LOGIN.path}?redirectTo=${pathname}`);
      return;
    }

    // If the route starts with "/admin" and the user's role is "admin," allow access
    if (isAdminRoute && currentUser.role === "admin") {
      return <>{children}</>;
    }
    // If the route starts with "/app" and the user's role is "member," allow access
    if (isMemberRoute && currentUser.role === "member") {
      return <>{children}</>;
    }
    return <ComponentToWrap />;
    // // For all other cases, redirect to a page or show an error message
    // router.push("/unauthorized"); // Redirect to an unauthorized page or route

    // return null; // Return null to prevent rendering the child components
  };
  return WrappedWithProtectedRoutes;
};

export default withProtectedRoutes;
