import { getReferralLink } from "@/utils/util-functions";
import { useAuth } from "@/context/AuthContext";
import React, { useState, useEffect } from "react";
import Icon from "@/components/Icon";

const CopyToClipboard = () => {
  const { currentUser, currentUserProfile } = useAuth();
  const [referralLink, setReferralLink] = useState(null);
  console.log(currentUser, currentUserProfile);
  useEffect(() => {
    if (currentUser?.profile?.referralID) {
      const link = getReferralLink(currentUser?.profile?.referralID);
      setReferralLink(link);
    }
  }, [currentUser?.profile]);

  if (!referralLink) {
    return <p>Loading referral link...</p>;
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(referralLink)
      .then(() => {
        // Optionally, you can provide some feedback to the user that the text has been copied
        alert("Copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy: ", error);
      });
  };

  return (
    <div className="w-1/6">
      {/* Replace the i element with your icon component */}
      <Icon iconName="contentCopy" onClick={handleCopyToClipboard} className="h-[30px] m-auto w-full cursor-pointer" />
    </div>
  );
};

export default CopyToClipboard;
