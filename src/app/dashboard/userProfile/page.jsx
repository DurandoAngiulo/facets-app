"use client";

import { useEffect, useState } from "react";

import FacetsList from "@/components/FacetsList";
import ROUTES from "@/constants/routes";
import { useAuth } from "@/context/AuthContext";
import { transformUserFacets } from "@/services/facet-services";
import { calculateAge } from "@/utils/util-functions.js";
import Link from "next/link";
import MoreDetailsPillGroup from "@/components/MoreDetailsPillGroup/Index.jsx";

const Page = ({ params }) => {
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
          <Link href={ROUTES.EDIT_PROFILE.path}>
            <h2>edit profile</h2>
          </Link>

          <h2>all unstyled profile data</h2>
          <p>{profileInformation?.firstName}</p>
          <p>{calculateAge(profileInformation?.birthday)}</p>
          <p>{profileInformation?.bio}</p>
          <p>{profileInformation?.location}</p>
          <p>{profileInformation?.occupation}</p>
          <p>{profileInformation?.pronouns}</p>
        </header>
        <MoreDetailsPillGroup moreDetails={profileInformation?.moreDetails} />
        <p className="pl-2 py-2" style={{ color: "var(--text)" }}>
          {" "}
          {profileInformation?.moreDetails.bio}{" "}
        </p>
        <section className="bg-green-400">
          {profileFacetsExist && (
            <div>
              <h3>Facet By {profileInformation?.firstName}</h3>
              <ul>
                <FacetsList facet={facetGroups.personalFacets[0]} currentProfile={profileInformation} />{" "}
              </ul>
            </div>
          )}

          {friendFacetsExist &&
            facetGroups.friendFacets.map((facet) => (
              <div key={facet.respondantUserId}>
                <h3>Facet By A friend of {facet.friendshipPeriod}</h3>
                {facet && profileInformation && <FacetsList facet={facet} currentProfile={profileInformation} />}
              </div>
            ))}
        </section>
      </div>
    </>
  );
};

export default Page;
