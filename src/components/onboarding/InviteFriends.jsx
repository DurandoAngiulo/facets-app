import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getReferralLink } from "@/utils/util-functions";
import Icon from "@/components/Icon";
import { PrimaryButton } from "@/components/Button/Index";

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
    <div className="page padding h-full flex flex-col gap-y-16">
      <div className="flex flex-col gap-4 mt-24">
        <Icon iconName="letter" className="h-5" />
        <h1 style={{ color: "var(--brand)" }} className="w-full text-center">
          Invite friends.
        </h1>
        <p className="text-center leading-snug" style={{ color: "var(--text)" }}>
          Enhance your profile with input from your closest friends! Share the link to invite them to contribute prompts
          and photos.
        </p>
      </div>
      <div
        className="flex justify-between items-center p-3 rounded border semibold font-['Arboria']"
        style={{ color: "var(--text)", borderColor: "var(--border" }}
      >
        <p className="">{referralLink}</p>
        <Icon iconName="copy" className="h-4" />
      </div>

      <div className="absolute bottom-32 left-0 right-0 flex justify-center ">
        <button onClick={handleClick} className="w-full mx-6" type="submit" style={{ maxWidth: "420px" }}>
          <PrimaryButton active="true" label="Continue"></PrimaryButton>
        </button>
      </div>
    </div>
  );
};
