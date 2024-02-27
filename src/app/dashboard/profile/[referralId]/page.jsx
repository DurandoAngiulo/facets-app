"use client";

import { useEffect, useState } from "react";

import { useAuth } from "@/context/AuthContext";
import { transformUserFacets } from "@/services/facet-services";
import { calculateAge, replaceNameInString, extractIdFromUrl } from "@/utils/util-functions";
import { usePathname } from "next/navigation";
import MoreDetailsPillGroup from "@/components/MoreDetailsPillGroup/Index.jsx";
import BeveledContainer from "@/components/BeveledContainer/Index";
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
      <div className="page">
        <div className="shadow-lg w-full z-50 px-4 pb-2 relative bg-white">
          <div className="w-full justify-center items-center gap-2 inline-flex flex-wrap">
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

          <p style={{ color: "var(--text)" }} className="text-center italic">
            {profileInformation?.pronouns}
          </p>

          <div className="w-full justify-center items-center gap-1 inline-flex my-1">
            <p style={{ color: "var(--text)" }}>{calculateAge(profileInformation?.birthday)}</p>
            <Icon iconName="diamondBio" className="w-[12px] h-[12px]" />
            <p style={{ color: "var(--text)" }}>{profileInformation?.occupation}</p>
            <Icon iconName="diamondBio" className="w-[12px] h-[12px]" />
            <p style={{ color: "var(--text)" }}>{profileInformation?.location}</p>
          </div>

          <MoreDetailsPillGroup moreDetails={profileInformation?.moreDetails} />

          <p className="pl-2 py-2" style={{ color: "var(--text)" }}>
            {" "}
            {profileInformation?.moreDetails.bio}{" "}
          </p>
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
      </div>
    </>
  );
};

export default Index;
