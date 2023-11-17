import { usePathname, useRouter } from "next/navigation";

import ROUTES from "@/constants/routes";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { getProfileById } from "@/services/profile-service";

const withProtectedRoutes = (ComponentToWrap) => {
  const WrappedWithProtectedRoutes = ({ ...props }) => {
    const { currentUser, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    console.log("currentUser", currentUser);
    const currentUserProfile = getProfileById(currentUser.uid);
    console.log("currentUserProfile", currentUserProfile.data);

    useEffect(() => {
      if (loading) return;
      const isAdminRoute = pathname.startsWith("/admin");
      const isMemberRoute = pathname.startsWith("/dashboard");

      if (!currentUserProfile) {
        router.push(`${ROUTES.LOGIN.path}?redirectTo=${pathname}`);
        return;
      }

      if (
        (isAdminRoute && currentUserProfile.role !== "admin") ||
        (isMemberRoute && currentUserProfile.role !== "member")
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
