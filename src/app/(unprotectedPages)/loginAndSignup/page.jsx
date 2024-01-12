"use client";

import React, { useState } from "react";
import SignUpForm from "@/components/SignUpForm/Index";
import MarketingLayout from "@/components/layouts/MarketingLayout";

const Signup = () => {
  return (
    <MarketingLayout>
      <SignUpForm />
    </MarketingLayout>
  );
};

export default Signup;
