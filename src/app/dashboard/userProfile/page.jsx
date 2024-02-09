"use client";

import { useEffect, useState } from "react";

import BeveledContainer from "@/components/BeveledContainer";
import FIREBASE from "@/constants/firebase";
import { useAuth } from "@/context/AuthContext";
import { getProfileById } from "@/services/profile-service";
import { getPrompts } from "@/services/prompt.service";
import { replaceNameInString } from "@/utils/util-functions";
import { calculateAge } from "@/utils/util-functions.js";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Index = () => {
  const { currentUser } = useAuth();
  const pathname = usePathname();
  const profileId = currentUser?.uid;
  const [profileInformation, setProfileInformation] = useState("");
  const [facetGroups, setFacetGroups] = useState({ friendFacets: [], personalFacets: [] });

  const FacetGroupCard = ({ facet }) => {
    const FacetCard = ({ response }) => {
      return (
        <li key={response.id} className="border border-green">
          <img src="https://placehold.co/50x50" />
          <BeveledContainer>
            <p style={{ color: "var(--text)" }}>
              <i>{replaceNameInString(response.prompt, profileInformation?.firstName)}</i>
            </p>
            <p className="semibold" style={{ fontSize: "var(--font-size-p-md)", color: "var(--brand)" }}>
              {response.response}
            </p>
          </BeveledContainer>
        </li>
      );
    };

    return (
      <div key={facet.id} className="mt-2 border rounded border-black">
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

    const transformFriendsFacets = async () => {
      const personalFacets = profileInformation.personalFacet || [];
      const uniquePersonalPromptIds = new Set(
        personalFacets
          .flatMap((facet) => facet.responses)
          .map((response) => response.prompt_id)
          .filter((id) => id) // Filter out falsy values, including empty strings
      );

      const friendFacets = profileInformation.friendFacets || [];
      const uniqueFriendPromptIds = new Set(
        friendFacets
          .flatMap((facet) => facet.responses)
          .map((response) => response.prompt_id)
          .filter((id) => id) // Filter out falsy values, including empty strings
      );

      const combinedUniquePromptIds = new Set([...uniqueFriendPromptIds, ...uniquePersonalPromptIds]);
      const uniquePromptIdsArray = Array.from(combinedUniquePromptIds);

      const friendPrompts = await getPrompts(FIREBASE.COLLECTIONS.FRIENDPROMPTS, uniquePromptIdsArray);
      const userPrompts = await getPrompts(FIREBASE.COLLECTIONS.USERPROMPTS, uniquePromptIdsArray);

      friendFacets?.map((facet) => {
        facet.responses.map((response) => {
          if (!response.prompt_id || !response.prompt_id) return;
          const prompt = friendPrompts.data.find((prompt) => prompt.id === response.prompt_id);
          response.prompt = prompt.prompt;
        });
      });

      personalFacets?.map((facet) => {
        facet.responses.map((response) => {
          if (!response.prompt_id || !response.prompt_id) return;
          const prompt = userPrompts.data.find((prompt) => prompt.id === response.prompt_id);
          response.prompt = prompt.prompt;
        });
      });

      // modified personalFacets to match friend Facets
      setFacetGroups({ friendFacets, personalFacets });
    };

    transformFriendsFacets();
    // console.log(profileInformation);
  }, [JSON.stringify(profileInformation)]);

  // console.log(facetGroups, "facetGroups");
  return (
    <>
      <div>
        <Link href="/dashboard/userProfile/edit">
          <h2>edit profile</h2>
        </Link>

        <h2>all unstyled profile data</h2>
        <p>{profileInformation?.firstName}</p>
        <p>{calculateAge(profileInformation?.birthday)}</p>
        <p>{profileInformation?.bio}</p>
        <p>{profileInformation?.location}</p>
        <p>{profileInformation?.occupation}</p>
        <p>{profileInformation?.pronouns}</p>
        <div className="ml-4">
          {facetGroups.friendFacets.map((facet) => (
            <FacetGroupCard key={facet.id} facet={facet} />
          ))}
        </div>
        <div className="ml-4">
          {facetGroups.personalFacets.map((facet) => (
            <FacetGroupCard key={facet.id} facet={facet} />
          ))}
        </div>
        <p>image palcehodler TBD</p>
      </div>
    </>
  );
};

export default Index;
