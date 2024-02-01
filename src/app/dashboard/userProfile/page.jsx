"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/components/layouts/DashboardLayout";

const Index = () => {
  return (
    <DashboardLayout>
      <div>Main User profile</div>
    </DashboardLayout>
  );
};

export default Index;
