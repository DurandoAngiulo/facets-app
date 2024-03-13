"use client";
import { useEffect, useState, useRef } from "react";
import FacetsList from "@/components/FacetsList";
import ROUTES from "@/constants/routes";
import { useAuth } from "@/context/AuthContext";
import { transformUserFacets } from "@/services/facet-services";
import { calculateAge } from "@/utils/util-functions.js";
import Link from "next/link";
import MoreDetailsPillGroup from "@/components/MoreDetailsPillGroup/Index.jsx";
import Icon from "@/components/Icon";
import { PrimaryButton } from "@/components/Button/Index";

const Page = ({ params }) => {
  const { currentUser } = useAuth();
  const profileInformation = currentUser?.profile;
  const [facetGroups, setFacetGroups] = useState({ friendFacets: [], personalFacets: [] });
  const friendFacetsExist = facetGroups?.friendFacets.length > 0;
  const profileFacetsExist = facetGroups?.personalFacets[0] !== undefined;

  // Ref to the container
  const containerRef = useRef(null);
  // State to store the currently visible column
  const [visibleColumn, setVisibleColumn] = useState(0);

  useEffect(() => {
    if (!profileInformation) return;

    const transformFacetData = async () => {
      const newProfile = await transformUserFacets(profileInformation);
      setFacetGroups({ ...profileInformation, ...newProfile });
    };
    transformFacetData();
  }, [profileInformation]);

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

  if (!profileInformation) {
    return <h1>loading...</h1>;
  }

  // Function to handle dot click
  const handleDotClick = (index) => {
    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const totalWidth = container.scrollWidth;
    const scrollPercentage = index / (1 + (friendFacetsExist ? facetGroups.friendFacets.length : 0));
    const scrollLeft = scrollPercentage * (totalWidth - containerWidth);
    container.scrollTo({ left: scrollLeft, behavior: "smooth" });
  };

  return (
    <>
      <div className="page-container pb-6">
        <div className="shadow-lg w-full z-50 px-4 pb-3 relative bg-white">
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
          <p className="pl-2 py-2" style={{ color: "var(--text)" }}>
            {" "}
            {profileInformation?.moreDetails.bio}{" "}
          </p>
          <Link href={ROUTES.EDIT_PROFILE.path}>
            <PrimaryButton active="true" label="Edit Profile">
              Edit Profile
            </PrimaryButton>
          </Link>
        </div>

        <section
          ref={containerRef}
          className="flex flex-row overflow-auto gap-5 px-8 pt-3 snap-proximity snap-x relative"
          style={{ background: "var(--background-gradient-lr)" }}
        >
          {/* Your existing code */}
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

        {/* Carousel Slider Dots */}
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

export default Page;
