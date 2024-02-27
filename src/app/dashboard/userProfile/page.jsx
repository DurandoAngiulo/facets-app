"use client";

import { useEffect, useState } from "react";

import FacetsList from "@/components/FacetsList";
import ROUTES from "@/constants/routes";
import { useAuth } from "@/context/AuthContext";
import { transformUserFacets } from "@/services/facet-services";
import { calculateAge } from "@/utils/util-functions.js";
import Link from "next/link";
import MoreDetailsPillGroup from "@/components/MoreDetailsPillGroup/Index.jsx";

const Page = () => {
  const { currentUser } = useAuth();
  const profileInformation = currentUser?.profile;
  const [facetGroups, setFacetGroups] = useState({ friendFacets: [], personalFacets: [] });
  const friendFacetsExist = facetGroups?.friendFacets.length > 0;
  const profileFacetsExist = facetGroups?.personalFacets[0] !== undefined;

  useEffect(() => {
    if (!profileInformation) return;

    const transformFacetData = async () => {
      const newProfile = await transformUserFacets(profileInformation);
      setFacetGroups({ ...profileInformation, ...newProfile });
    };

    transformFacetData();
  }, [JSON.stringify(profileInformation)]);

  if (!profileInformation) {
    return <h1>loading...</h1>;
  }

  return (
    <>
      <div>
        <header>
          <h2>all unstyled profile data</h2>
          <p>{profileInformation?.firstName}</p>
          <p>{calculateAge(profileInformation?.birthday)}</p>
          <p>{profileInformation?.bio}</p>
          <p>{profileInformation?.location}</p>
          <p>{profileInformation?.occupation}</p>
          <p>{profileInformation?.pronouns}</p>
        </header>
        <MoreDetailsPillGroup moreDetails={profileInformation?.moreDetails} />

        <section className="bg-green-400">
          {profileFacetsExist && (
            <div>
              <h3>Facet By {profileInformation?.firstName}</h3>
              <ul>
                <FacetsList facet={facetGroups.personalFacets[0]} />
              </ul>
            </div>
          )}

          {friendFacetsExist &&
            facetGroups.friendFacets.map((facet) => (
              <div key={facet.respondantUserId}>
                <h3>Facet By A friend of {facet.friendshipPeriod}</h3>
                <FacetsList facet={facet} currentProfile={profileInformation} />
              </div>
            ))}
        </section>
      </div>
    </>
  );
};

export default Page;
