"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import SummaryCard from "@/components/SummaryCard/Index.jsx";
import { getProfiles } from "@/services/profile-service";
import BeveledContainer from "@/components/BeveledContainer/Index";
import { getPrompts, fetchPromptById } from "@/services/prompt.service";
import FIREBASE from "@/constants/firebase";

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
    <DashboardLayout>
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
    </DashboardLayout>
  );
};

export default Index;
