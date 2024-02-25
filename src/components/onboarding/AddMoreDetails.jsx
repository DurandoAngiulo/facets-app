import React from "react";
import Icon from "@/components/Icon";
import { PrimaryButton } from "@/components/Button/Index";

export const AddMoreDetails = ({ handleUpdateProfile }) => {
  const handleClick = () => {
    handleUpdateProfile({
      onboardingStep: 14
    });
  };

  return (
    <>
      <div className="page padding h-full flex flex-col gap-y-16">
        <div className="flex flex-col gap-4 mt-24">
          <Icon iconName="editGradient" className="h-5" />
          <h1 style={{ color: "var(--brand)" }} className="w-full text-center">
            Want to add more details?
          </h1>
          <p className="text-center leading-snug" style={{ color: "var(--text)" }}>
            Don&apos;t worry! You can always add more details later from your Facets profile.
          </p>
        </div>
        <img
          src="/dist/images/more-details-preview.png"
          alt="Profile page with Edit my profile highlighted"
          style={{ maxWidth: "100%", maxHeight: "50vh", width: "auto", height: "auto", margin: "0 auto" }}
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
