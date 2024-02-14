"use client";
import "./styles.css";
import { fetchPromptById, getPrompts } from "@/services/prompt.service";
import { useEffect, useState } from "react";

import BeveledContainer from "@/components/BeveledContainer/Index.jsx";
import SummaryCard from "@/components/SummaryCard/Index.jsx";
import FIREBASE from "@/constants/firebase";
import { useAuth } from "@/context/AuthContext";
import { getProfiles } from "@/services/profile-service";
import { PrimaryButton } from "@/components/Button/Index";
import Icon from "@/components/Icon";

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
      <div className="page flex flex-col items-center pb-8">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-0">
            <h1 className="text-center leading-tight mt-6" style={{ color: "var(--brand)" }}>
              We&apos;ve curated 5 gems
            </h1>
            <div className="flex flex-row gap-3 self-center">
              <h1 className="text-center leading-tight" style={{ color: "var(--brand)" }}>
                <i>for you!</i>
              </h1>
              <Icon className="h-5 self-center mb-1" iconName="diamondFilled" />
            </div>
          </div>
          <PrimaryButton
            label="Refresh"
            icon={<Icon iconName="refresh" className="h-3" />}
            iconRight
            active="true"
            small
          ></PrimaryButton>
          <p className="text-center" style={{ color: "var(--element-subtle)" }}>
            2 remaining today
          </p>
          <hr className="mb-4" style={{ borderColor: "var(--border)" }}></hr>
        </div>
        <div className="pb-24">
          {profiles.map((profile) => (
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
          ))}
        </div>
      </div>
    </>
  );
};

export default Index;
