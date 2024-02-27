"use client";

import { useEffect, useState } from "react";

import { useAuth } from "@/context/AuthContext";
import { transformUserFacets } from "@/services/facet-services";
import { calculateAge, replaceNameInString, extractIdFromUrl } from "@/utils/util-functions";
import { usePathname } from "next/navigation";
import MoreDetailsPillGroup from "@/components/MoreDetailsPillGroup/Index.jsx";
import Icon from "@/components/Icon";

import FacetsList from "@/components/FacetsList";
import { getProfileById } from "@/services/profile-service";

const Index = () => {
  const { currentUser } = useAuth();
  const pathname = usePathname();
  const profileId = extractIdFromUrl(pathname); // You need to define this function
  const [profileInformation, setProfileInformation] = useState(null);
  const [facetGroups, setFacetGroups] = useState({ friendFacets: [], personalFacets: [] });
  const friendFacetsExist = facetGroups?.friendFacets.length > 0;
  const profileFacetsExist = facetGroups?.personalFacets[0] !== undefined;

  useEffect(() => {
    const fetchProfile = async (profileId) => {
      try {
        const profileResult = await getProfileById(profileId);
        let profileData = profileResult?.data?.data;
        setProfileInformation(profileData);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };
    fetchProfile(profileId);
  }, [profileId]);

  useEffect(() => {
    if (!profileInformation) return;

    const transformFacetData = async () => {
      const newProfile = await transformUserFacets(profileInformation);
      setFacetGroups({ ...profileInformation, ...newProfile });
    };

    transformFacetData();
  }, [JSON.stringify(profileInformation)]);

  if (!profileInformation) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div>
        <div className="page-container pb-6">
          <header>
            {/* <h2>all unstyled profile data</h2> */}
            {/* <p>{profileInformation?.firstName}</p>
          <p>{calculateAge(profileInformation?.birthday)}</p>
          <p>{profileInformation?.bio}</p>
          <p>{profileInformation?.location}</p>
          <p>{profileInformation?.occupation}</p>
          <p>{profileInformation?.pronouns}</p> */}

            {/* Header with name and icons */}
            <div className="w-full justify-center items-center gap-2 inline-flex flex-wrap px-8">
              {/* header with back button, name, and kabob with modal options */}
              <div className="w-full inline-flex pt-8">
                {/* <Link href={`${ROUTES.FEED.path}`}> */}
                <Icon className="w-6 h-6 justify-between items-center flex" iconName="backArrow"></Icon>
                {/* </Link> */}
                <h2 className="w-full flex-col justify-start items-center inline-flex gradient-text">
                  {profileInformation?.firstName}
                </h2>
                <Icon className="w-6 h-6 origin-top-left justify-between items-center flex" iconName="kabob"></Icon>
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

          {/* Pills with more details */}
          <MoreDetailsPillGroup moreDetails={profileInformation?.moreDetails} />

          <p className="pt-2 px-8"> {profileInformation?.bio} </p>
        </div>

        <section className="bg-green-400 page">
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

export default Index;
