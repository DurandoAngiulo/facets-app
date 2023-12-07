import React from "react";

export const TimeToMakeFacet = ({ handleUpdateProfile }) => {
  const handleClick = () => {
    handleUpdateProfile({
      onboardingStep: 9
    });
  };
  return (
    <>
      <p>Time to create your facet!</p>
      <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Continue
      </button>
    </>
  );
};
