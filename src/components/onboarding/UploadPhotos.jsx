import React from "react";
import ImageUploadInput from "@/components/ImageUploadInput/Index.jsx";
import Icon from "@/components/Icon";
import { PrimaryButton } from "@/components/Button/Index";

export const UploadPhotos = ({ handleUpdateProfile, currentUser }) => {
  const handleClick = () => {
    handleUpdateProfile({
      onboardingStep: 12
    });
  };

  return (
    <div className="page padding h-full flex flex-col bg-white ">
      <div className="flex flex-col gap-4 mt-24 mb-4">
        <Icon iconName="photoupload" className="h-5" />
        <h1 style={{ color: "var(--brand)" }} className="w-full text-center">
          Upload photos.
        </h1>
        <p className="text-center leading-snug" style={{ color: "var(--text)" }}>
          Choose photos where your face is clearly visible. Try not to have other people in the photos - your friends
          will include those!
        </p>
      </div>
      <ImageUploadInput refPath={"personal"} submitFunction={handleUpdateProfile} />
      <p className="text-center leading-snug mt-2" style={{ color: "var(--text)" }}>
        Upload <b>4 photos.</b>
      </p>
      <div className="absolute px-1 bottom-8 left-0 right-0 flex justify-center "></div>
    </div>
  );
};
