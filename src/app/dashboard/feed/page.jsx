"use client";

import { fetchPromptById, getPrompts } from "@/services/prompt.service";
import { useEffect, useState } from "react";

import BeveledContainer from "@/components/BeveledContainer/Index.jsx";
import SummaryCard from "@/components/SummaryCard/Index.jsx";
import FIREBASE from "@/constants/firebase";
import { useAuth } from "@/context/AuthContext";
import { getProfiles } from "@/services/profile-service";

const Index = () => {
  const { currentUser } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const [prompts, setPrompts] = useState([]);
  console.log(currentUser);

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const { data: promptTable } = await getPrompts(FIREBASE.COLLECTIONS.USERPROMPTS);
        // console.log(promptTable, "promptTable");
        setPrompts(promptTable);
        // console.log(prompts, "prompts!");
      } catch (error) {
        console.error("Error fetching prompts:", error);
      }
    };

    fetchPrompts();
  }, []);

  useEffect(() => {
    console.log(currentUser, "useefect");
    const fetchProfiles = async () => {
      if (currentUser?.profile?.referralID) {
        try {
          const profilesData = await getProfiles(currentUser.profile.referralID);
          setProfiles(profilesData);

          console.log(profiles, "profiles!");
        } catch (error) {
          console.error("Error fetching profiles:", error);
        }
      }
    };

    fetchProfiles();
  }, [currentUser]);
  // console.log(prompts);
  return (
    <>
      <div>
        {profiles.map((profile) => (
          <BeveledContainer key={profile.id}>
            <SummaryCard
              key={profile.id} // Assuming each profile has a unique ID
              name={profile.firstName}
              pronouns={profile.pronouns}
              birthday={profile.birthday}
              occupation={profile.occupation}
              location={profile.location}
              facetPrompt={fetchPromptById(profile.personalFacet[0].responses[0].prompt_id, prompts)}
              facetResponse={profile.personalFacet[0].responses[0].response}
              profileId={profile.id}
            />
          </BeveledContainer>
        ))}
      </div>
    </>
  );
};

export default Index;
