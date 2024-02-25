import React from "react";
import ImageUploadInput from "@/components/ImageUploadInput/Index.jsx";

export const UploadPhotos = ({ handleUpdateProfile, currentUser }) => {
  const handleClick = () => {
    handleUpdateProfile({
      onboardingStep: 12
    });
  };

  return (
    <>
      <ImageUploadInput refPath={"personal"} />
      <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Continue
      </button>
    </>
  );
};
