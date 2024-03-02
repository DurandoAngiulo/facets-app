"use client";

import { useEffect, useState } from "react";

import FacetsList from "@/components/FacetsList";
import ROUTES from "@/constants/routes";
import { useAuth } from "@/context/AuthContext";
import { transformUserFacets } from "@/services/facet-services";
import { calculateAge } from "@/utils/util-functions.js";
import Link from "next/link";
import MoreDetailsPillGroup from "@/components/MoreDetailsPillGroup/Index.jsx";
import Icon from "@/components/Icon";
import { PrimaryButton } from "@/components/Button/Index";

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
      <div className="page-container pb-6">
        <div className="pb-6">
          <header>
            {/* Header with name and icons */}
            <div className="w-full justify-center items-center gap-2 inline-flex flex-wrap px-8">
              {/* header with back button, name, and kabob with modal options */}
              <div className="w-full inline-flex pt-8">
                {/* <Link href={`${ROUTES.FEED.path}`}> */}
                {/* </Link> */}
                <h2 className="w-full flex-col justify-start items-center inline-flex gradient-text">
                  {profileInformation?.firstName}
                </h2>
              </div>
            </div>

            {/* Pronouns */}
            <p style={{ color: "var(--text)" }} className="text-center italic">
              {profileInformation?.pronouns}
            </p>

            {/* Basic Info */}
            <div className="w-full justify-center items-center gap-1 inline-flex my-1">
              <p style={{ color: "var(--text)" }}>{calculateAge(profileInformation?.birthday)}</p>
              <Icon iconName="diamondBio" className="w-[12px] h-[12px]" />
              <p style={{ color: "var(--text)" }}>{profileInformation?.occupation}</p>
              <Icon iconName="diamondBio" className="w-[12px] h-[12px]" />
              <p style={{ color: "var(--text)" }}>{profileInformation?.location}</p>
            </div>
          </header>
          <MoreDetailsPillGroup moreDetails={profileInformation?.moreDetails} />
          <p className="py-2 px-2"> {profileInformation?.bio} </p>

          <Link href={ROUTES.EDIT_PROFILE.path}>
            <PrimaryButton active="true" label="Edit Profile">
              Edit Profile
            </PrimaryButton>
          </Link>
        </div>

        <section
          className="flex flex-row overflow-auto gap-5 px-8 pt-3 snap-proximity snap-x"
          style={{ background: "var(--background-gradient-lr" }}
        >
          {profileFacetsExist && (
            <div className="mb-32">
              <p className="text-center mb-1" style={{ fontSize: "var(--font-size-p-md)", color: "var(--text)" }}>
                Facet by <b>{profileInformation?.firstName}</b>
              </p>
              <FacetsList facet={facetGroups.personalFacets[0]} />
            </div>
          )}

          {friendFacetsExist &&
            facetGroups.friendFacets.map((facet) => (
              <div key={facet.respondantUserId}>
                <p className="text-center mb-1" style={{ fontSize: "var(--font-size-p-md)", color: "var(--text)" }}>
                  Facet by a friend of <b>{facet.friendshipPeriod}</b>
                </p>
                <FacetsList facet={facet} currentProfile={profileInformation} />
              </div>
            ))}
        </section>

        {/* <section className="bg-green-400">
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
        </section> */}
      </div>
    </>
  );
};

export default Page;
