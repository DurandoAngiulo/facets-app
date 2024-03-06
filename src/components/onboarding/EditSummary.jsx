import React from "react";
import { PrimaryButton } from "@/components/Button/Index";
import Icon from "@/components/Icon";
import { useAuth } from "@/context/AuthContext";
import SummaryCard from "@/components/SummaryCard/Index.jsx";
import { fetchPromptById, getPrompts } from "@/services/prompt.service";
import { useEffect, useState } from "react";
import FIREBASE from "@/constants/firebase";

export const EditSummary = ({ handleUpdateProfile }) => {
  const { currentUser } = useAuth();
  const [prompts, setPrompts] = useState([]);

  const profile = currentUser.profile;
  console.log(profile);
  const handleClick = () => {
    handleUpdateProfile({
      onboardingStep: 13
    });
  };

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const { data: promptTable } = await getPrompts(FIREBASE.COLLECTIONS.USERPROMPTS);
        setPrompts(promptTable);
      } catch (error) {
        console.error("Error fetching prompts:", error);
      }
    };

    fetchPrompts();
  }, []);
  return (
    <>
      <div className="page padding h-full flex flex-col gap-y-4 bg-white">
        <div className="flex flex-col gap-4 mt-16">
          <Icon iconName="crown" className="h-5" />
          <h1 style={{ color: "var(--brand)" }} className="w-full text-center">
            Edit your Summary.
          </h1>
          <p className="text-center leading-snug" style={{ color: "var(--text)" }}>
            This is how you will first appear to other Facets users. Think of it as your first impression! Choose a
            photo and prompt that highlights who you are.
          </p>
        </div>
        {/* <img
          src="/dist/images/editsummary.png"
          alt="Profile page with Edit my profile highlighted"
          style={{ maxWidth: "100%", maxHeight: "40vh", width: "auto", height: "auto", margin: "0 auto" }}
        /> */}
        <SummaryCard
          name={profile.firstName}
          pronouns={profile.pronouns}
          birthday={profile.birthday}
          occupation={profile.occupation}
          location={profile.location}
          facetPrompt={fetchPromptById(profile?.personalFacet?.[0]?.responses?.[0]?.prompt_id, prompts)}
          facetResponse={profile?.personalFacet?.[0]?.responses?.[0]?.response}
          profileId={profile.id}
          src={profile?.personalFacet?.[0]?.photos?.[0]?.path}
          disabledState={true}
        />
        <div className="absolute bottom-12 left-0 right-0 flex justify-center ">
          <button className="w-full mx-6" onClick={handleClick} type="submit" style={{ maxWidth: "420px" }}>
            <PrimaryButton active="true" label="Continue"></PrimaryButton>
          </button>
        </div>
      </div>
    </>
  );
};
