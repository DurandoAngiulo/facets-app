import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getReferralLink } from "@/utils/util-functions";

export const InviteFriends = ({ handleUpdateProfile }) => {
  const { currentUser } = useAuth();
  const [referralLink, setReferralLink] = useState(null);
  console.log(currentUser);
  useEffect(() => {
    if (currentUser?.profile?.referralID) {
      const link = getReferralLink(currentUser?.profile?.referralID);
      setReferralLink(link);
    }
  }, [currentUser]);

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
