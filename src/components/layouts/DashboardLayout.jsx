import MarketingFooter from "@/components/Footer/MarketingFooter";
import Navbar from "@/components/Navbar";
import withProtectedRoutes from "@/components/layouts/withProtectedRoutes";
const DashboardLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <MarketingFooter />
    </>
  );
};

export default withProtectedRoutes(DashboardLayout);
