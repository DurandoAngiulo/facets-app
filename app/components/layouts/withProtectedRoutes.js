import { usePathname, useRouter } from "next/navigation";

import ROUTES from "@/constants/routes";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

const withProtectedRoutes = (ComponentToWrap) => {
  const WrappedWithProtectedRoutes = ({ ...props }) => {
    const { currentUser, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      if (loading) return;
      const isAdminRoute = pathname.startsWith("/admin");
      const isMemberRoute = pathname.startsWith("/dashboard");

      if (!currentUser) {
        router.push(`${ROUTES.LOGIN.path}?redirectTo=${pathname}`);
        return;
      }

      if (
        (isAdminRoute && currentUser.role !== "admin") ||
        (isMemberRoute && currentUser.role !== "member")
      ) {
        router.push("/unauthorized");
        return;
      }
    }, [currentUser, loading, router]);

    if (loading) {
      return <div>Loading...</div>;
    }

    return <ComponentToWrap {...props} />;
  };

  return WrappedWithProtectedRoutes;
};

export default withProtectedRoutes;
