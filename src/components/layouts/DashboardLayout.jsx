import Navbar from "@/components/Navbar/Index.jsx";
import withProtectedRoutes from "@/components/layouts/withProtectedRoutes";
import { usePathname } from "next/navigation";

const DashboardLayout = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className="page">
      {children}
      {/* <MarketingFooter /> */}
    </div>
  );
};

export default withProtectedRoutes(DashboardLayout);
