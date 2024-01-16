import React from "react";
import { PROFILE_MODEL } from "@/constants/model";
import { useRouter } from "next/navigation";
import ROUTES from "@/constants/routes";

export const ProfileComplete = ({ handleUpdateProfile }) => {
  const router = useRouter();
  const handleClick = () => {
    handleUpdateProfile({
      onboardingStep: 14,
      onboardingStatus: PROFILE_MODEL.onboardingStatus[1]
    });
    router.push(`${ROUTES.DASHBOARD.path}/feed`);
  };

  return (
    <>
      <p>Time to shine/enter app!</p>
      <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Continue
      </button>
    </>
  );
};
