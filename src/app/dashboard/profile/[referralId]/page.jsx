"use client";

import { extractIdFromUrl, replaceNameInString } from "@/utils/util-functions";
import { useEffect, useState } from "react";

import BeveledContainer from "@/components/BeveledContainer/Index";
import Icon from "@/components/Icon";
import MaskedImage from "@/components/MaskedImage/Index";
import { useAuth } from "@/context/AuthContext";
import { transformUserFacets } from "@/services/facet-services";
import { getProfileById } from "@/services/profile-service";
import { calculateAge } from "@/utils/util-functions";
import { usePathname } from "next/navigation";
import MoreDetailsPillGroup from "@/components/MoreDetailsPillGroup/Index.jsx";

const Index = () => {
  const { currentUser } = useAuth();
  const pathname = usePathname();
  const profileId = extractIdFromUrl(pathname);
  const [profileInformation, setProfileInformation] = useState("");

  const FacetGroupCard = ({ facet }) => {
    const FacetCard = ({ response }) => {
      return (
        <li key={response.id} className="flex flex-col gap-4 snap-center">
          <MaskedImage
            height={292}
            width={292}
            image="https://imgv3.fotor.com/images/blog-richtext-image/take-a-selfie-with-friends.jpg"
          />
          <BeveledContainer>
            <p style={{ color: "var(--text)" }}>
              <i>{replaceNameInString(response.prompt, profileInformation?.firstName)}</i>
            </p>
            <p className="semibold" style={{ fontSize: "var(--font-size-p-md)", color: "var(--brand)" }}>
              {response.response}
            </p>
            <div className="absolute bottom-4 right-4">
              <Icon className="h-7 w-7" iconName="messageDots" />
            </div>
          </BeveledContainer>
        </li>
      );
    };

    return (
      <div className="mt-3 flex flex-col gap-2 snap-center">
        <p className="text-center" style={{ fontSize: "var(--font-size-p-md)", color: "var(--text)" }}>
          Facet by{" "}
          <b>{facet.friendshipPeriod ? `a friend of ${facet.friendshipPeriod}` : profileInformation?.firstName}</b> {}
        </p>
        <ul className="flex flex-col gap-2">
          {facet.responses.map((response) => (
            <FacetCard key={response.prompt_id} response={response} />
          ))}
        </ul>
      </div>
    );
  };

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
  }, []);

  useEffect(() => {
    if (!profileInformation) return;

    const transformFacetData = async () => {
      const newProfile = await transformUserFacets(profileInformation);
      setProfileInformation({ ...profileInformation, ...newProfile });
    };

    transformFacetData();
  }, [JSON.stringify(profileInformation)]);

  return (
    <>
      <div className="page">
        <div style={{ background: "#fff" }} className="pb-8">
          <div className="w-full justify-center items-center gap-2 inline-flex flex-wrap my-2 mb-2">
            {/* header with back button, name, and kabob with modal options */}
            <div className="inline-flex page-container pt-8">
              {/* <Link href={`${ROUTES.FEED.path}`}> */}
              <Icon className="w-6 h-6 justify-between items-center flex" iconName="backArrow"></Icon>
              {/* </Link> */}
              <h2 className="w-48 flex-col justify-start items-center inline-flex gradient-text">
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

          <p className="pt-2"> {profileInformation?.bio} </p>
        </div>

        <div
          className="flex flex-row overflow-auto gap-5 px-8 snap-proximity snap-x"
          style={{ background: "var(--background-gradient-lr" }}
        >
          <div className="mb-24 ">
            {profileInformation?.personalFacet?.map((facet) => (
              <FacetGroupCard key={facet.id} facet={facet} />
            ))}
          </div>

          {profileInformation?.friendFacets?.map((facet) => (
            <FacetGroupCard key={facet.id} facet={facet} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Index;
