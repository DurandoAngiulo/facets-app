import { PROFILE_MODEL } from "@/constants/model";
import Icon from "@/components/Icon";
import { PrimaryButton, SecondaryButton } from "@/components/Button/Index";
import Link from "next/link"; // Import Link from Next.js

export const ProfileComplete = ({ handleUpdateProfile }) => {
  const handleClick = async () => {
    await handleUpdateProfile({
      onboardingStep: 15,
      onboardingStatus: PROFILE_MODEL.onboardingStatus[1]
    });
  };

  return (
    <div
      className="page bg-center flex flex-col padding bg-cover justify-center"
      style={{ backgroundImage: "url('/dist/images/makeown.jpg')" }}
    >
      <div className="h-full flex flex-col justify-center items-center">
        <Icon iconName="shine" className="h-16 mb-4" />
        <div className=" flex flex-row gap-2 mx-5 justify-center ">
          <h1 className="align-middle text-center leading-snug text-white ">
            Your Facet is complete! Time to
            <i> shine...</i>
          </h1>
        </div>
      </div>
      <div className="items-end flex mb-16  flex-col gap-2 justify-center">
        <a className="w-full" href="/dashboard/userProfile">
          {/* this is probably bad... but routing is already bugged so... */}
          <SecondaryButton active="true" onDark="true" label="View profile"></SecondaryButton>
        </a>
        <button onClick={handleClick} className="w-full">
          <PrimaryButton active="true" onDark="true" label="Let's go!"></PrimaryButton>
        </button>
      </div>
    </div>
  );
};
