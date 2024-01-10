"use client";
import React, { useState, useEffect } from "react";

import FriendFacetCreation from "@/components/FriendFacetCreation";
import { referralIdValidation } from "@/services/profile-service";
import ReferralPageVerifcation from "@/components/ReferralPageVerifcation";

const Index = ({ params }) => {
  const [verificationState, setVerificationState] = useState(null);
  const [referralValidated, setReferralValidated] = useState(null);
  const [pageReferral, setPageReferral] = useState(null);
  const { referralId: pageReferralId } = params;
  // const pageReferralId = "a";
  const FACET_LIMIT = 4;

  const validateReferral = async () => {
    const { data, loading, error } = await referralIdValidation(pageReferralId);
    //validates that the link is tied to an actual user
    if (!data) {
      setReferralValidated(false);
      return;
    }
    // console.log(data, "data");
    setReferralValidated(true);
    setPageReferral(data);
  };
  //in case params doesnt load in right away form the url
  useEffect(() => {
    if (!pageReferralId) return;
    validateReferral();
  }, [pageReferralId]);

  if (verificationState === true) {
    return <FriendFacetCreation pageReferralId={pageReferral?.referralID} />;
  }

  if (!pageReferralId || referralValidated === null) {
    return <>Loading...</>;
  }

  if (referralValidated === false) {
    return <p>bad link, no user found</p>;
  }
  // console.log(pageReferral, "pageReferral");
  // console.log(pageReferral?.friendFacets?.length);
  if (pageReferral?.friendFacets?.length > FACET_LIMIT) {
    return <p>too many facets, no room for new ones</p>;
  }

  if (pageReferral?.referralID) {
    return (
      <ReferralPageVerifcation pageReferralId={pageReferral?.referralID} setVerificationState={setVerificationState} />
    );
  }
};

export default Index;
