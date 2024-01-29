import MarketingFooter from "@/components/Footer/MarketingFooter";
import withProtectedRoutes from "@/components/layouts/withProtectedRoutes";
const DashboardLayout = ({ children }) => {
  return (
    <>
      {children}
      <MarketingFooter />
    </>
  );
};

export default withProtectedRoutes(DashboardLayout);
