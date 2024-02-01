import MarketingFooter from "@/components/Footer/MarketingFooter";
import Navbar from "@/components/Navbar/Index";
import withProtectedRoutes from "@/components/layouts/withProtectedRoutes";
import { usePathname, useRouter } from "next/navigation";

const DashboardLayout = ({ children }) => {
  const pathname = usePathname();
  const isFeed = pathname.includes("/feed");
  const isProfile = pathname.includes("/userProfile");
  const isMessage = pathname.includes("/messages");
  console.log(isFeed, isProfile, isMessage, "data");
  return (
    <>
      <Navbar activePage={[isFeed, isProfile, isMessage]} />
      {children}
      <MarketingFooter />
    </>
  );
};

export default withProtectedRoutes(DashboardLayout);
