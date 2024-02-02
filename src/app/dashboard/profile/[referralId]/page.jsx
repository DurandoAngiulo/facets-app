"use client";

import { useEffect, useState } from "react";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import FIREBASE from "@/constants/firebase";
import { useAuth } from "@/context/AuthContext";
import { getProfileById } from "@/services/profile-service";
import { getPrompts } from "@/services/prompt.service";
import { extractIdFromUrl } from "@/utils/util-functions";
import { calculateAge } from "@/utils/util-functions.js";
import { usePathname } from "next/navigation";

const Index = () => {
  const { currentUser } = useAuth();
  const pathname = usePathname();
  const profileId = extractIdFromUrl(pathname);
  const [profileInformation, setProfileInformation] = useState("");
  const [facetGroups, setFacetGroups] = useState({ friendFacets: [], personalFacets: [] });

  const FacetGroupCard = ({ facet }) => {
    const FacetCard = ({ response }) => {
      return (
        <li key={response.id} className="border border-green">
          <p>{response.prompt}</p>
          <p>{response.response}</p>
        </li>
      );
    };

    return (
      <div key={facet.id} className="mt-2 border rounded border-black">
        <h3>{facet.group_name}</h3>
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
      const uniquePersonalPromptIds = new Set(personalFacets.map((response) => response.prompt_id));

      const friendFacets = profileInformation.friendFacets || [];
      const uniqueFriendPromptIds = new Set(
        friendFacets.flatMap((facet) => facet.responses.map((response) => response.prompt_id))
      );

      const combinedUniquePromptIds = new Set([...uniqueFriendPromptIds, ...uniquePersonalPromptIds]);
      const uniquePromptIdsArray = Array.from(combinedUniquePromptIds);

      const friendPrompts = await getPrompts(FIREBASE.COLLECTIONS.FRIENDPROMPTS, uniquePromptIdsArray);
      const userPrompts = await getPrompts(FIREBASE.COLLECTIONS.USERPROMPTS, uniquePromptIdsArray);

      friendFacets.map((facet) => {
        facet.responses.map((response) => {
          const prompt = friendPrompts.data.find((prompt) => prompt.id === response.prompt_id);
          response.prompt = prompt.prompt;
        });
      });

      personalFacets.map((response) => {
        const prompt = userPrompts.data.find((prompt) => prompt.id === response.prompt_id);
        response.prompt = prompt.prompt;
      });

      // modified personalFacets to match friend Facets
      setFacetGroups({ friendFacets, personalFacets });
    };

    transformFriendsFacets();
  }, [JSON.stringify(profileInformation)]);

  // console.log(facetGroups, "facetGroups");
  return (
    <DashboardLayout>
      <div>
        <h2>all unstyled profile data</h2>
        <p>{profileInformation?.firstName}</p>
        <p>{calculateAge(profileInformation?.birthday)}</p>
        <p>{profileInformation?.bio}</p>
        <p>{profileInformation?.location}</p>
        <p>{profileInformation?.occupation}</p>
        <p>{profileInformation?.pronouns}</p>
        <p>personalFacetprompts placeholder TBD</p>
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
    </DashboardLayout>
  );
};

export default Index;
