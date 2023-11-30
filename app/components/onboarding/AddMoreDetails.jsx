import React from "react";

export const AddMoreDetails = ({ handleUpdateProfile }) => {
  const handleClick = () => {
    handleUpdateProfile({
      onboardingStep: 12,
    });
  };

  return (
    <>
      <p>add more deatils</p>
      <button
        onClick={handleClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Continue
      </button>
    </>
  );
};
