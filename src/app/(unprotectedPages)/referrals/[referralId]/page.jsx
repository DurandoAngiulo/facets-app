"use client";
import React, { useState, useEffect } from "react";

import FriendFacetCreation from "@/components/FriendFacetCreation";
import { referralIdValidation } from "@/services/profile-service";
import ReferralPageVerifcation from "@/components/ReferralPageVerifcation";
const Index = ({ params }) => {
  const [verificationState, setVerificationState] = useState(false);
  const [referralValidated, setReferralValidated] = useState(null);
  const [pageReferral, setPageReferral] = useState(null);
  const { referralId: pageReferralId } = params;
  const FACET_LIMIT = 4;

  const validateReferral = async () => {
    const { data, loading, error } = await referralIdValidation(pageReferralId);
    //validates that the link is tied to an actual user
    if (!data) {
      setReferralValidated(false);
      return;
    }
    console.log(data, "data");
    setReferralValidated(true);
    setPageReferral(data);
  };
  //in case params doesnt load in right away form the url
  useEffect(() => {
    if (!pageReferralId) return;
    validateReferral();
  }, [pageReferralId]);
  //TODO:

  //verify that user with that referral id exists, if not, render specific error page based on case ***DONE***
  //check if more than 4 facets exist in refferal id user's list, if they do render no more can be added ***DONE***
  //render verifcation opener (asks guest user to verify before reponding to prompts)
  //verification process: if they dont exist, verify them and make a guest account, then allow them to make a facet
  //if they do exist, (guest or/member) check if they have a facet assccociated witht the freinds referral id
  //if they do, return that you cant make another one, if they don't allow them to make one

  console.group("verify");
  console.log(verificationState, "verificationState");
  console.log(referralValidated, "referralValidated");
  console.log(pageReferral, "pageReferral");
  console.log(pageReferralId, "pageReferralId");
  console.groupEnd();
  if (verificationState === true) {
    return <FriendFacetCreation />;
  }

  if (!pageReferralId || referralValidated === null) {
    return <>Loading...</>;
  }

  if (referralValidated === false) {
    return <p>bad link, no user found</p>;
  }
  console.log(pageReferral, "pageReferral");
  console.log(pageReferral?.friendFacets?.length);
  if (pageReferral?.friendFacets?.length >= FACET_LIMIT) {
    return <p>too many facets, no room for new ones</p>;
  }

  if (pageReferral?.referralID) {
    return (
      <ReferralPageVerifcation pageReferralId={pageReferral?.referralID} setVerificationState={setVerificationState} />
    );
  }

  // return <FriendFacetCreation />;
};

export default Index;
