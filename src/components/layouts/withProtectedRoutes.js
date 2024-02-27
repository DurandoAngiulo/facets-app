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
      if (loading && !currentUser) {
        return <div>Loading...</div>;
      }

      if (!currentUser) {
        router.push(`${ROUTES.LOGIN.path}?redirectTo=${pathname}`);
        return;
      }

      if (isAdminRoute && userRole !== "admin") {
        router.push(`${ROUTES.UNAUTHORIZED.path}`);
        return;
      }

      if (
        currentUser?.profile?.onboardingStatus === "inProgress" &&
        !isOnboardingRoute &&
        profileCreationRoute !== pathname
      ) {
        router.push(ROUTES.PROFILE_CREATION.path);
        return;
      }

      if (currentUser?.profile?.onboardingStatus === "complete" && isOnboardingRoute) {
        router.push(ROUTES.FEED.path);
        return;
      }
    }, [currentUser, loading, pathname, router, userRole, isAdminRoute, isOnboardingRoute, profileCreationRoute]);

    if (loading) {
      return <div>Loading...</div>;
    }

    return <ComponentToWrap {...props} />;
  };

  return WrappedWithProtectedRoutes;
};

export default withProtectedRoutes;
