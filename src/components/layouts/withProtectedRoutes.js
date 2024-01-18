import { usePathname, useRouter } from "next/navigation";

import ROUTES from "@/constants/routes";
import { useAuth } from "@/context/AuthContext";

const withProtectedRoutes = (ComponentToWrap) => {
  const WrappedWithProtectedRoutes = ({ ...props }) => {
    const { currentUser, loading } = useAuth();
    const userRole = currentUser?.profile?.role;
    const router = useRouter();
    const pathname = usePathname();
    const isAdminRoute = pathname.startsWith("/admin");
    const isOnboardingRoute = pathname.includes("/onboarding");
    const profileCreationRoute = `${ROUTES.ONBOARDING.path}/profile-creation`;

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
      router.push(`${ROUTES.ONBOARDING.path}/profile-creation`);
      // redirect to onboarding screen
      // router.push(`${ROUTES.UNAUTHORIZED.path}`);
      return;
    }

    if (currentUser?.profile?.onboardingStatus === "complete" && isOnboardingRoute) {
      router.push(`${ROUTES.DASHBOARD.path}/feed`);
    }
    // redirect to dashboard main page

    return <ComponentToWrap {...props} />;
  };

  return WrappedWithProtectedRoutes;
};

export default withProtectedRoutes;
