"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const Navbar = () => {
  const { logout } = useAuth();
  return (
    <div>
      <ul>
        <li>
          <Link className="border-solid border-2 border-red-500" href="/dashboard/feed">
            feed
          </Link>
        </li>
        <li>
          <Link className="border-solid border-2 border-red-500" href="/dashboard/profile">
            profile
          </Link>
        </li>
        <li>
          <Link className="border-solid border-2 border-red-500" href="/dashboard/feed">
            chat
          </Link>
        </li>
        {/* <li>
          <Link className="border-solid border-2 border-red-500" href="/">
            home
          </Link>
        </li>
        <li>
          <Link className="border-solid border-2 border-red-500" href="/login">
            login
          </Link>
        </li>
        <li>
          <Link className="border-solid border-2 border-red-500" href="/signup">
            signup
          </Link>
        </li> */}
        <li>
          <Link className="border-solid border-2 border-red-500" href="/" onClick={() => logout()}>
            logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
