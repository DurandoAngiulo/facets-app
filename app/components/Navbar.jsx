"use client";
import React from "react";
import Link from "next/link";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  //   console.log(UserAuth());
  const { user } = UserAuth();
  //   console.log(user);
  return (
    <div>
      <ul>
        <li>
          <Link className="border-solid border-2 border-red-500" href="/feed">
            feed
          </Link>
        </li>
        <li>
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
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
