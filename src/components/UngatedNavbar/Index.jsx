"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getAuth } from "firebase/auth";
import { PrimaryButton, SecondaryButton } from "@/components/Button/Index";

const UngatedNavbar = () => {
  // const { logout } = useAuth();
  return (
    <div className="w-full">
      <ul className="w-full">
        {/* <li>
          <Link className="border-solid border-2 border-red-500" href="/">
            marketing/info
          </Link>
        </li> */}
        <div className="mx-auto flex flex-col gap-2 justify-center">
          <li className="mx-auto w-full">
            <Link href="/loginAndSignup">
              <SecondaryButton label="Create account" active="true" />
            </Link>
          </li>
          <li className="mx-auto w-full">
            <Link href="/loginAndSignup">
              <PrimaryButton label="Sign in" active="true" />
            </Link>
          </li>
        </div>
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
