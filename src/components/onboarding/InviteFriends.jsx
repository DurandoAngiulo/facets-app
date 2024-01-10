import React from "react";
import { useAuth } from "@/context/AuthContext";

export const InviteFriends = ({ handleUpdateProfile }) => {
  const { currentUser } = useAuth();
  const handleClick = () => {
    handleUpdateProfile({
      onboardingStep: 13
    });
  };
  //TODO: check this to make sure it works
  return (
    <>
      <p>`Invite Friends using this link ${currentUser?.profile?.referralID}`</p>
      <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Continue
      </button>
    </>
  );
};
