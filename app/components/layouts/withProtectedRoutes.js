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

    if (loading) {
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

    return <ComponentToWrap {...props} />;
  };

  return WrappedWithProtectedRoutes;
};

export default withProtectedRoutes;
