"use client";
import OnboardingLayout from "@/components/layouts/OnboardingLayout";
import { useState, useEffect } from "react";
import { updateProfile } from "@/services/profile-service";
import { useAuth } from "@/context/AuthContext";

import {
  LearnAboutYou,
  EnterName,
  EnterBirthday,
  EnterGender,
  EnterPronouns,
  EnterDatingPreferences,
  EnterAgeRange,
  EnterLocation,
  TimeToMakeFacet,
  EnterPersonalFacet,
  UploadPhotos,
  AddMoreDetails,
  InviteFriends,
  ProfileComplete,
} from "@/components/onboarding/Index";

const Index = () => {
  const { currentUser } = useAuth();
  const [progress, setProgress] = useState(0);
  console.log("current step", progress);
  const componentMap = [
    LearnAboutYou,
    EnterName,
    EnterBirthday,
    EnterGender,
    EnterPronouns,
    EnterDatingPreferences,
    EnterAgeRange,
    EnterLocation,
    TimeToMakeFacet,
    EnterPersonalFacet,
    UploadPhotos,
    AddMoreDetails,
    InviteFriends,
    ProfileComplete,
  ];
  const CurrentComponent = componentMap[progress];
  const handleUpdateProfile = async (profileData) => {
    const { data, error } = await updateProfile(currentUser, profileData);

    if (error) {
      console.log(data.message);
      return;
    }

    setProgress(data?.profile?.onboardingStep);
  };

  useEffect(() => {
    // also have to check if user is done onboarding? If they are, should redirect them
    setProgress(currentUser?.profile?.onboardingStep ?? 0);
  }, [currentUser]);

  return (
    <OnboardingLayout>
      <div>profile Creation</div>
      {CurrentComponent && (
        <CurrentComponent handleUpdateProfile={handleUpdateProfile} />
      )}
    </OnboardingLayout>
  );
};

export default Index;
