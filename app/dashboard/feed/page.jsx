"use client";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/components/layouts/DashboardLayout";
const Index = () => {
  const { currentUser } = useAuth();

  return (
    <DashboardLayout>
      <p>feed</p>
    </DashboardLayout>
  );
};

export default Index;
