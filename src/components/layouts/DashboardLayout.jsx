import MarketingFooter from "@/components/Footer/MarketingFooter";
import Navbar from "@/components/Navbar/Index";
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
//nikki was here
export default withProtectedRoutes(DashboardLayout);
