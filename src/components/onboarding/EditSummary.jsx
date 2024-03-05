import React from "react";
import { PrimaryButton } from "@/components/Button/Index";
import Icon from "@/components/Icon";

export const EditSummary = ({ handleUpdateProfile, currentUser }) => {
  const handleClick = () => {
    handleUpdateProfile({
      onboardingStep: 13
    });
  };
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
        <img
          src="/dist/images/editsummary.png"
          alt="Profile page with Edit my profile highlighted"
          style={{ maxWidth: "100%", maxHeight: "40vh", width: "auto", height: "auto", margin: "0 auto" }}
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
