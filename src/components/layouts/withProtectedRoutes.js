import { usePathname, useRouter } from "next/navigation";

import ROUTES from "@/constants/routes";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

/**
 * withProtectedRoutes HOC for route protection
 * @param {React.ComponentType<any>} ComponentToWrap - Component to wrap
 * @returns {React.FC} - Wrapped component
 */
const withProtectedRoutes = (ComponentToWrap) => {
  const WrappedWithProtectedRoutes = ({ ...props }) => {
    const { currentUser, loading } = useAuth();
    const userRole = currentUser?.profile?.role;
    const router = useRouter();
    const pathname = usePathname();
    const isAdminRoute = pathname.startsWith("/admin");
    const isOnboardingRoute = pathname.includes("/onboarding");
    const profileCreationRoute = ROUTES.PROFILE_CREATION.path;

    useEffect(() => {
      // Ensure all conditions are checked after the loading state is resolved
      if (!loading) {
        if (!currentUser) {
          router.push(`${ROUTES.LOGIN.path}?redirectTo=${pathname}`);
        } else if (isAdminRoute && userRole !== "admin") {
          router.push(`${ROUTES.UNAUTHORIZED.path}`);
        } else if (
          currentUser?.profile?.onboardingStatus === "inProgress" &&
          !isOnboardingRoute &&
          profileCreationRoute !== pathname
        ) {
          router.push(ROUTES.PROFILE_CREATION.path);
        } else if (currentUser?.profile?.onboardingStatus === "complete" && isOnboardingRoute) {
          router.push(ROUTES.FEED.path);
        }
      }
    }, [currentUser, loading, pathname, router, userRole, isAdminRoute, isOnboardingRoute, profileCreationRoute]);

    // Render loading state outside of useEffect
    if (loading) {
      return <div>Loading...</div>;
    }

    // Render the wrapped component if not loading
    return <ComponentToWrap {...props} />;
  };

  return WrappedWithProtectedRoutes;
};

export default withProtectedRoutes;
