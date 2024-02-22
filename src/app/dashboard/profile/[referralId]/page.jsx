"use client";

import { extractIdFromUrl, replaceNameInString } from "@/utils/util-functions";
import { useEffect, useState } from "react";

import BeveledContainer from "@/components/BeveledContainer/Index.jsx";
import Icon from "@/components/Icon";
import { useAuth } from "@/context/AuthContext";
import { transformUserFacets } from "@/services/facet-services";
import { getProfileById } from "@/services/profile-service";
import { calculateAge } from "@/utils/util-functions";
import { usePathname } from "next/navigation";
import MaskedImage from "@/components/MaskedImage/Index";
import { PillContainer } from "@/components/PillContainer/Index";
// import { BackButton } from "@/components/BackButton/Index";
import Link from "next/link";
import ROUTES from "@/constants/routes";

const Index = () => {
  const { currentUser } = useAuth();
  const pathname = usePathname();
  const profileId = extractIdFromUrl(pathname);
  const [profileInformation, setProfileInformation] = useState("");

  const newBerryGradient = {
    background: "linear-gradient(to right, rgba(111, 116, 207, 1), rgba(130, 104, 201, 1), rgba(149, 91, 195, 1))",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  };

  const FacetGroupCard = ({ facet }) => {
    const FacetCard = ({ response }) => {
      return (
        <li key={response.id} className="flex flex-col gap-4">
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
      <div className="mt-3 flex flex-col gap-2">
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
      <div className="bg-white pb-4 style={{ maxWidth: '420px' }}">
        <div className="w-full justify-center items-center gap-2 inline-flex flex-wrap my-2 mb-2">
          {/* header with back button, name, and kabob with modal options */}
          <div className="flex inline-flex w-full mx-auto ">
            {/* <Link href={`${ROUTES.FEED.path}`}> */}
            <Icon className="w-6 h-6 w-1/6 align-middle fill-none" iconName="backArrow"></Icon>
            {/* </Link> */}
            <h2 style={newBerryGradient} className="text-center pt-6 w-4/6">
              {profileInformation?.firstName}
            </h2>
            <Icon className="w-6 h-6 w-1/6 align-middle" iconName="kabob"></Icon>
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

        {/* pills with extra info 
          to add: gradient on name, capitalize content in pills, white bg, text bio (and expand button), back button, kabob*/}

        <div className="w-full justify-center items-center gap-2 inline-flex flex-wrap my-2 mb-2">
          <PillContainer>Libra</PillContainer>
          <PillContainer>Gay</PillContainer>
          <PillContainer>from Red Bank, NJ</PillContainer>
          <PillContainer>from Red Bank, NJ</PillContainer>
          <PillContainer>from Red Bank, NJ</PillContainer>
          <PillContainer>from Red Bank, NJ</PillContainer>
          <PillContainer>from Red Bank, NJ</PillContainer>

          {/* <PillContainer>Doesn't Smoke</PillContainer> */}
          <PillContainer>Atheist</PillContainer>
        </div>

        <p className="mx-6">{profileInformation?.bio}</p>
      </div>

      <div className="page">
        {/* main info */}

        <div className="ml-4">
          {profileInformation?.friendFacets?.map((facet) => (
            <FacetGroupCard key={facet.id} facet={facet} />
          ))}
        </div>

        <div className="snap-center">
          {profileInformation?.friendFacets?.map((facet) => (
            <FacetGroupCard key={facet.id} facet={facet} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Index;
