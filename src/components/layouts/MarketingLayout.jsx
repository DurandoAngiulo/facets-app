import AppFooter from "@/components/Footer/AppFooter";
import UngatedNavbar from "@/components/UngatedNavbar/Index";

const MarketingLayout = ({ children }) => {
  return (
    <>
      <UngatedNavbar />
      {children}
      <AppFooter />
    </>
  );
};
export default MarketingLayout;
