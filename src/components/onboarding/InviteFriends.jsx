import React from "react";
import { useAuth } from "@/context/AuthContext";
import { getReferralLink } from "@/utils/util-functions";

export const InviteFriends = ({ handleUpdateProfile }) => {
  const { currentUser } = useAuth();
  const referralLink = getReferralLink(currentUser?.profile?.referralID);
  const handleClick = () => {
    handleUpdateProfile({
      onboardingStep: 15
    });
  };

  return (
    <>
      <p>Invite Friends using this link {referralLink}</p>
      <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Continue
      </button>
    </>
  );
};
