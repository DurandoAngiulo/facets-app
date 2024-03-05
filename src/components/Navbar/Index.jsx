"use client";

import Icon from "@/components/Icon";
import ROUTES from "@/constants/routes";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  { href: ROUTES.FEED.path, iconName: "diamond", label: ROUTES.FEED.name },
  { href: ROUTES.MESSAGES.path, iconName: "message", label: ROUTES.MESSAGES.name },
  { href: ROUTES.USERPROFILE.path, iconName: "profile", label: ROUTES.USERPROFILE.name }
];

const Navbar = () => {
  const pathname = usePathname();
  const { logout } = useAuth();
  const isActive = (href) => pathname.includes(href);
  return (
    <div>
      <div className="fixed bottom-0 w-full z-20">
        <div className="w-full h-20 bg-white shadow-[0_4px_13.9px_0px_rgba(0,0,0,0.3)] flex-col justify-center items-center pt-2 pb-6 inline-flex">
          <ul className="justify-start items-center gap-10 pt-2 inline-flex">
            {navigationItems.map(({ href, iconName, label }) => (
              <li key={href}>
                <Link href={href} className={isActive(href) ? "active" : ""}>
                  <Icon
                    iconName={`${iconName}${isActive(href) ? "Filled" : "Line"}`}
                    className="w-9 h-9"
                    style={{ fill: isActive(href) ? "" : "none" }}
                  />
                </Link>
              </li>
            ))}
            <li>
              <button onClick={logout} className="border-solid border-2 border-red-500">
                Logout
              </button>
            </li>
          </ul>
          <div className="w-9 h-9 relative" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
