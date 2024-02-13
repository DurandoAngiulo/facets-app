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

const Index = () => {
  const { currentUser } = useAuth();
  const pathname = usePathname();
  const profileId = extractIdFromUrl(pathname);
  const [profileInformation, setProfileInformation] = useState("");

  const FacetGroupCard = ({ facet }) => {
    const FacetCard = ({ response }) => {
      return (
        <li key={response.id} className="border border-green">
          <MaskedImage height={298} width={298} />
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
      <div className="mt-2 border rounded border-black">
        <h3>
          Facet By {facet.friendshipPeriod ? `A friend of ${facet.friendshipPeriod}` : profileInformation?.firstName} {}
        </h3>
        <ul>
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
        <h2>all unstyled profile data</h2>
        <p>{profileInformation?.firstName}</p>
        <p>{calculateAge(profileInformation?.birthday)}</p>
        <p>{profileInformation?.bio}</p>
        <p>{profileInformation?.location}</p>
        <p>{profileInformation?.occupation}</p>
        <p>{profileInformation?.pronouns}</p>
        <div className="ml-4">
          {profileInformation?.friendFacets?.map((facet) => (
            <FacetGroupCard key={facet.id} facet={facet} />
          ))}
        </div>

        <div className="ml-4">
          {profileInformation?.personalFacet?.map((facet) => (
            <FacetGroupCard key={facet.id} facet={facet} />
          ))}
        </div>
        <p>image placeholder TBD</p>
      </div>
    </>
  );
};

export default Index;
