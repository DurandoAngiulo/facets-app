import React from "react";

export const LearnAboutYou = ({ handleUpdateProfile }) => {
  const handleClick = () => {
    handleUpdateProfile({
      onboardingStep: 1
    });
  };

  return (
    <>
      <p>Time to learn more about you!</p>
      <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Continue
      </button>
    </>
  );
};
