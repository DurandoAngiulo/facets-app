"use client";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Navbar from "@/components/Navbar/Index";

const Index = () => {
  const { currentUser } = useAuth();
  // console.log(currentUser)
  return (
    <div>
      <Navbar activePage={"Profile"} />
      <div>profile</div>
    </div>
  );
};

export default Index;
