"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getAuth } from "firebase/auth";

const UngatedNavbar = () => {
  // const { logout } = useAuth();
  return (
    <div>
      <ul>
        <li>
          <Link className="border-solid border-2 border-red-500" href="/">
            marketing/info
          </Link>
        </li>
        <li>
          <Link className="border-solid border-2 border-red-500" href="/loginAndSignup">
            Login/Signup
          </Link>
        </li>
        {/* <li>
          <Link className="border-solid border-2 border-red-500" href="/signup">
            signup
          </Link>
        </li> */}
        {/* <li>
          <Link
            className="border-solid border-2 border-red-500"
            href="/signup"
            onClick={() => logout()}
          >
            logout
          </Link>
        </li> */}
      </ul>
    </div>
  );
};

export default UngatedNavbar;
