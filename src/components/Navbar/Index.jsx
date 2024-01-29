"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Icon from "@/components/Icon";

const Navbar = ({ activePage }) => {
  // Define the ActiveIcon component for the active page
  const ActiveIcon = () => {
    if (activePage === "Feed") {
      return <Icon iconName="diamondFilled" className="w-9 h-9" />;
    } else if (activePage === "Messages") {
      return <Icon iconName="messageFilled" className="w-9 h-9" />;
    } else if (activePage === "Profile") {
      return <Icon iconName="profileFilled" className="w-9 h-9" />;
    } else {
      return null; // Handle other cases if needed
    }
  };

  const { logout } = useAuth();
  return (
    <div>
      <div className="fixed bottom-0 w-full z-50">
        <div className="w-full h-20 bg-white shadow-[0_4px_13.9px_0px_rgba(0,0,0,0.3)] flex-col justify-center items-center pt-2 pb-6 inline-flex">
          <ul className="justify-start items-center gap-10 pt-2 inline-flex">
            <li>
              <Link href="/dashboard/feed" className={activePage === "Feed" ? "active" : ""}>
                {activePage === "Feed" ? (
                  <ActiveIcon />
                ) : (
                  <Icon style={{ fill: "none" }} iconName="diamondLine" className="w-9 h-9" />
                )}
              </Link>
            </li>
            <li>
              <Link href="/dashboard/feed" className={activePage === "Messages" ? "active" : ""}>
                <Icon iconName="messageLine" className="w-9 h-9" />
              </Link>
            </li>
            <li>
              <Link href="/dashboard/profile" className={activePage === "Profile" ? "active" : ""}>
                {activePage === "Profile" ? (
                  <ActiveIcon />
                ) : (
                  <Icon style={{ fill: "none" }} iconName="profileLine" className="w-9 h-9" />
                )}
              </Link>
            </li>

            <li>
              <Link className="border-solid border-2 border-red-500" href="/" onClick={() => logout()}>
                logout
              </Link>
            </li>
          </ul>
          <div className="w-9 h-9 relative" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
