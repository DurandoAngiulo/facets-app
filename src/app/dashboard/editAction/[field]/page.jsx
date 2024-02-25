"use client";
import React from "react";
import { useState, useEffect } from "react";
import { updateProfile } from "@/services/profile-service";
import { useAuth } from "@/context/AuthContext";
import ROUTES from "@/constants/routes";
import { PROFILE_MODEL } from "@/constants/model";
import { usePathname } from "next/navigation";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { extractFieldFromUrl } from "@/utils/util-functions";
import { useRouter } from "next/navigation";

import FIREBASE from "@/constants/firebase";
import Link from "next/link";
import {
  EnterName,
  EnterBirthday,
  EnterGender,
  EnterPronouns,
  EnterDatingPreferences,
  EnterAgeRange,
  EnterLocation,
  EnterOccupation,
  UploadPhotos,
  EnterMoreDetails
} from "@/components/onboarding/Index";

const Index = () => {
  const { currentUser, updateUserProfile } = useAuth();
  const pathname = usePathname();
  const categoryId = extractFieldFromUrl(pathname);
  const router = useRouter();

  const handleUpdateProfile = async (profileData) => {
    console.group("handleUpdateProfile");
    const { data, error } = await updateProfile(currentUser, profileData);

    if (error) {
      console.log(data.message);
      return;
    }

    console.log("data", data);

    await updateUserProfile(data?.profile);

    console.log("about to reroute");
    router.push(`${ROUTES.DASHBOARD.path}/userProfile/edit`);
    console.log("routed");
  };
  console.groupEnd();

  let componentToRender;

  switch (categoryId) {
    case "name":
      componentToRender = <EnterName handleUpdateProfile={handleUpdateProfile} />;
      break;
    case "birthday":
      componentToRender = <EnterBirthday handleUpdateProfile={handleUpdateProfile} />;
      break;
    case "gender":
      componentToRender = <EnterGender handleUpdateProfile={handleUpdateProfile} />;
      break;
    case "pronouns":
      componentToRender = <EnterPronouns handleUpdateProfile={handleUpdateProfile} />;
      break;
    case "datingPreferences":
      componentToRender = <EnterDatingPreferences handleUpdateProfile={handleUpdateProfile} />;
      break;
    case "ageRange":
      componentToRender = <EnterAgeRange handleUpdateProfile={handleUpdateProfile} />;
      break;
    case "location":
      componentToRender = <EnterLocation handleUpdateProfile={handleUpdateProfile} />;
      break;
    case "occupation":
      componentToRender = <EnterOccupation handleUpdateProfile={handleUpdateProfile} />;
      break;
    case "uploadPhotos":
      componentToRender = <UploadPhotos handleUpdateProfile={handleUpdateProfile} />;
      break;
    case "moreDetails":
      componentToRender = <EnterMoreDetails handleUpdateProfile={handleUpdateProfile} />;
      break;
    default:
      componentToRender = null; // Render nothing if step is not matched
      break;
  }

  return <DashboardLayout>{componentToRender}</DashboardLayout>;
};

export default Index;
