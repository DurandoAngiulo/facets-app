"use client";

import {
  AddMoreDetails,
  EditSummary,
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
import { useAuth } from "@/context/AuthContext";
import { updateProfile } from "@/services/profile-service";

const Index = () => {
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
    EditSummary,
    AddMoreDetails,
    EnterMoreDetails,
    InviteFriends,
    ProfileComplete
  ];
  const { currentUser, updateUserProfile } = useAuth();
  const [progress, setProgress] = useState(0);
  const CurrentComponent = componentMap[progress];

  const handleUpdateProfile = async (profileData) => {
    const { data, error } = await updateProfile(currentUser, profileData);

    if (error) {
      console.error(data.message);
      return;
    }

    await updateUserProfile(data?.profile);
    await setProgress(data?.profile?.onboardingStep);
  };

  useEffect(() => {
    // also have to check if user is done onboarding? If they are, should redirect them
    setProgress(currentUser?.profile?.onboardingStep ?? 0);
  }, [currentUser?.profile?.onboardingStep]);

  return (
    <OnboardingLayout>
      {CurrentComponent && <CurrentComponent handleUpdateProfile={handleUpdateProfile} />}
    </OnboardingLayout>
  );
};

export default Index;
