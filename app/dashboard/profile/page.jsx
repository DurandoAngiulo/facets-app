"use client";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/components/layouts/DashboardLayout";

const Index = () => {
  const { currentUser } = useAuth();
  // console.log(currentUser)
  return (
    <DashboardLayout>
      <div>profile</div>
    </DashboardLayout>
  );
};

export default Index;
