import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getReferralLink } from "@/utils/util-functions";

export const InviteFriends = ({ handleUpdateProfile }) => {
  const { currentUser, currentUserProfile } = useAuth();
  const [referralLink, setReferralLink] = useState(null);
  console.log(currentUser, currentUserProfile);
  useEffect(() => {
    if (currentUser?.profile?.referralID) {
      const link = getReferralLink(currentUser?.profile?.referralID);
      setReferralLink(link);
    }
  }, [currentUser?.profile]);

  const handleClick = () => {
    handleUpdateProfile({
      onboardingStep: 15
    });
  };

  if (!referralLink) {
    return <p>Loading referral link...</p>;
  }

  return (
    <>
      <p>Invite Friends using this link {referralLink}</p>
      <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Continue
      </button>
    </>
  );
};
