"use client";

import "./styles.css";

import { fetchPromptById, getPrompts } from "@/services/prompt.service";
import { useEffect, useState } from "react";

import { PrimaryButton } from "@/components/Button/Index";
import Icon from "@/components/Icon";
import SummaryCard from "@/components/SummaryCard/Index.jsx";
import FIREBASE from "@/constants/firebase";
import { useAuth } from "@/context/AuthContext";
import { getProfiles } from "@/services/profile-service";
import Modal from "@/components/Modal/Index.jsx";

// Shuffle function to shuffle the array
const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const Index = () => {
  const { currentUser } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const [prompts, setPrompts] = useState([]);
  const [randomProfiles, setRandomProfiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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

  useEffect(() => {
    const fetchProfiles = async () => {
      if (currentUser?.profile?.referralID) {
        try {
          const profilesData = await getProfiles(currentUser.profile.referralID);
          setProfiles(profilesData);
          setRandomProfiles(shuffleArray(profilesData).slice(0, 5)); // Set randomProfiles after fetching profiles
        } catch (error) {
          console.error("Error fetching profiles:", error);
        }
      }
    };

    fetchProfiles();
  }, [currentUser]);

  const refreshProfiles = () => {
    setRandomProfiles(shuffleArray(profiles).slice(0, 5)); // Set randomProfiles after fetching profiles
    closeModal();
  };
  console.log(isModalOpen);
  return (
    <>
      <div className="page padding flex flex-col items-center pb-8">
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
          <button onClick={openModal}>
            <PrimaryButton
              label="Refresh"
              icon={<Icon iconName="refresh" className="h-3" />}
              iconRight
              active="true"
              small
            ></PrimaryButton>
          </button>
          <p className="text-center" style={{ color: "var(--element-subtle)" }}>
            2 remaining today
          </p>
          <hr className="mb-4" style={{ borderColor: "var(--border)" }}></hr>
        </div>
        <div className="pb-24">
          {randomProfiles.map((profile) => (
            <SummaryCard
              key={profile.id} // Assuming each profile has a unique ID
              name={profile.firstName}
              pronouns={profile.pronouns}
              birthday={profile.birthday}
              occupation={profile.occupation}
              location={profile.location}
              facetPrompt={fetchPromptById(profile?.personalFacet?.[0]?.responses?.[0]?.prompt_id, prompts)}
              facetResponse={profile?.personalFacet?.[0]?.responses?.[0]?.response}
              profileId={profile.id}
              src={profile?.personalFacet?.[0]?.photos?.[0]?.path}
            />
          ))}
        </div>
      </div>
      {/* Render modal conditionally */}
      <Modal isOpen={isModalOpen} isClosed={closeModal} onRefresh={refreshProfiles} />
    </>
  );
};

export default Index;
