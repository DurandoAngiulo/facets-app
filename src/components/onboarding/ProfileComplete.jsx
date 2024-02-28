import { PROFILE_MODEL } from "@/constants/model";

export const ProfileComplete = ({ handleUpdateProfile }) => {
  const handleClick = async () => {
    await handleUpdateProfile({
      onboardingStep: 16,
      onboardingStatus: PROFILE_MODEL.onboardingStatus[1]
    });
  };

  return (
    <>
      <p>Time to shine/enter app!</p>
      <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Continue
      </button>
    </>
  );
};
