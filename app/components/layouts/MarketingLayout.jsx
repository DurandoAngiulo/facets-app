import AppFooter from "@/components/Footer/AppFooter";
import UngatedNavbar from "@/components/UngatedNavbar";

const MarketingLayout = ({children}) => {
  return (
    <>
      <UngatedNavbar/>
      {children}
      <AppFooter/>
    </>
  );
};
export default MarketingLayout;
