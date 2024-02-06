"use client";

import {
  AddMoreDetails,
  EnterAgeRange,
  EnterBirthday,
  EnterDatingPreferences,
  EnterGender,
  EnterLocation,
  EnterMoreDetails,
  EnterName,
  EnterOccupation,
  EnterPersonalFacet,
  EnterPronouns,
  InviteFriends,
  LearnAboutYou,
  ProfileComplete,
  TimeToMakeFacet,
  UploadPhotos
} from "@/components/onboarding/Index";
import { useEffect, useState } from "react";

import OnboardingLayout from "@/components/layouts/OnboardingLayout";
import { PROFILE_MODEL } from "@/constants/model";
import ROUTES from "@/constants/routes";
import { useAuth } from "@/context/AuthContext";
import { updateProfile } from "@/services/profile-service";
import { useRouter } from "next/navigation";

const Index = () => {
  const { currentUser, updateUserProfile } = useAuth();
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const componentMap = [
    LearnAboutYou,
    EnterName,
    EnterBirthday,
    EnterGender,
    EnterPronouns,
    EnterDatingPreferences,
    EnterAgeRange,
    EnterLocation,
    EnterOccupation,
    TimeToMakeFacet,
    EnterPersonalFacet,
    UploadPhotos,
    AddMoreDetails,
    EnterMoreDetails,
    InviteFriends,
    ProfileComplete
  ];

  const CurrentComponent = componentMap[progress];

  const handleUpdateProfile = async (profileData) => {
    const { data, error } = await updateProfile(currentUser, profileData);

    if (error) {
      console.log(data.message);
      return;
    }

    await updateUserProfile(data?.user?.profile);
    await setProgress(data?.profile?.onboardingStep);

    const complete_status = PROFILE_MODEL.onboardingStatus[1];

    if (data?.profile?.onboardingStatus === complete_status) {
      console.log("about to reroute");
      router.push(`${ROUTES.DASHBOARD.path}/feed`);
      console.log("routed");
    }
    console.groupEnd();
  };

  useEffect(() => {
    // also have to check if user is done onboarding? If they are, should redirect them
    setProgress(currentUser?.profile?.onboardingStep ?? 0);
  }, [currentUser?.profile?.onboardingStep]);

  return (
    <OnboardingLayout>
      <div>profile Creation</div>
      {CurrentComponent && <CurrentComponent handleUpdateProfile={handleUpdateProfile} />}
    </OnboardingLayout>
  );
};

export default Index;
