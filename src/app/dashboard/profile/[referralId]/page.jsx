"use client";

import { useEffect, useState, useRef } from "react";

import { useAuth } from "@/context/AuthContext";
import { transformUserFacets } from "@/services/facet-services";
import { calculateAge, replaceNameInString, extractIdFromUrl } from "@/utils/util-functions";
import { usePathname } from "next/navigation";
import MoreDetailsPillGroup from "@/components/MoreDetailsPillGroup/Index.jsx";
import Icon from "@/components/Icon";
import BeveledContainer from "@/components/BeveledContainer/Index";
import FacetsList from "@/components/FacetsList";
import { getProfileById } from "@/services/profile-service";

const Index = () => {
  const { currentUser } = useAuth();
  const pathname = usePathname();
  const profileId = extractIdFromUrl(pathname);
  const [profileInformation, setProfileInformation] = useState(null);
  const [facetGroups, setFacetGroups] = useState({ friendFacets: [], personalFacets: [] });
  const friendFacetsExist = facetGroups?.friendFacets.length > 0;
  const profileFacetsExist = facetGroups?.personalFacets[0] !== undefined;
  const [profileUID, setProfileUID] = useState("");
  // Ref to the container
  const containerRef = useRef(null);
  // State to store the currently visible column
  const [visibleColumn, setVisibleColumn] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;
      const totalWidth = container.scrollWidth;

      // Calculate the scroll percentage
      const scrollPercentage = scrollLeft / (totalWidth - containerWidth);

      // Determine which column is currently visible
      const totalColumns = 1 + (friendFacetsExist ? facetGroups.friendFacets.length : 0);
      const visibleColumnIndex = Math.floor(scrollPercentage * totalColumns);

      // Set the visible column index
      setVisibleColumn(visibleColumnIndex);
    };

    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [profileFacetsExist, friendFacetsExist, facetGroups]);
  useEffect(() => {
    const fetchProfile = async (profileId) => {
      try {
        const profileResult = await getProfileById(profileId);
        let profileData = profileResult?.data?.data;
        setProfileInformation(profileData);
        setProfileUID(profileId);
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

  const handleDotClick = (index) => {
    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const totalWidth = container.scrollWidth;
    const scrollPercentage = index / (1 + (friendFacetsExist ? facetGroups.friendFacets.length : 0));
    const scrollLeft = scrollPercentage * (totalWidth - containerWidth);
    container.scrollTo({ left: scrollLeft, behavior: "smooth" });
  };

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

          <p className="py-2 px-2"> {profileInformation?.moreDetails.bio} </p>
        </div>

        <section
          ref={containerRef}
          className="flex flex-row overflow-auto gap-5 px-8 pt-3 snap-proximity snap-x"
          style={{ background: "var(--background-gradient-lr" }}
        >
          {profileFacetsExist && (
            <div className="mb-32">
              <p className="text-center mb-1" style={{ fontSize: "var(--font-size-p-md)", color: "var(--text)" }}>
                Facet by <b>{profileInformation?.firstName}</b>
              </p>
              {facetGroups.personalFacets[0] && profileInformation && (
                <FacetsList facet={facetGroups.personalFacets[0]} currentProfile={profileInformation} />
              )}
            </div>
          )}

          {friendFacetsExist &&
            facetGroups.friendFacets.map((facet) => (
              <div key={facet.respondantUserId}>
                <p className="text-center mb-1" style={{ fontSize: "var(--font-size-p-md)", color: "var(--text)" }}>
                  Facet by a friend of <b>{facet.friendshipPeriod}</b>
                </p>
                {facet && profileInformation && <FacetsList facet={facet} currentProfile={profileInformation} />}
              </div>
            ))}
        </section>
        <div className="absolute bottom-0 left-0 w-full flex justify-center mt-4">
          {[...Array(1 + (friendFacetsExist ? facetGroups.friendFacets.length : 0))].map((_, index) => (
            <button
              key={index}
              className={`h-4 w-4 mx-1 rounded-full ${index === visibleColumn ? "bg-blue-500" : "bg-gray-300"}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Index;
