import React from "react";

export const AddMoreDetails = ({ handleUpdateProfile }) => {
  const handleClickContinue = () => {
    handleUpdateProfile({
      onboardingStep: 13
    });
  };
  const handleClickLater = () => {
    handleUpdateProfile({
      onboardingStep: 14
    });
  };

  return (
    <>
      <p>add more deatils</p>
      <button
        onClick={handleClickLater}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        later
      </button>
      <button
        onClick={handleClickContinue}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        yes
      </button>
    </>
  );
};
