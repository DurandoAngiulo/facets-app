import React from "react";
import Icon from "@/components/Icon";
import { PrimaryButton } from "@/components/Button/Index";

export const LearnAboutYou = ({ handleUpdateProfile }) => {
  const handleClick = () => {
    handleUpdateProfile({
      onboardingStep: 1
    });
  };

  return (
    <div
      className="page bg-center flex flex-col padding bg-cover justify-center"
      style={{ backgroundImage: "url('/dist/images/learnmore.jpg')" }}
    >
      <div className="h-full flex flex-col justify-center items-center">
        <Icon iconName="search" className="h-16 mb-4" />
        <div className=" flex flex-row mx-auto gap-2 justify-center ">
          <h1 className="align-middle text-center leading-snug text-white ">
            Time to learn more <br />
            about <i>you!</i>
          </h1>
        </div>
      </div>
      <div className="items-end flex mb-16">
        <button onClick={handleClick} className="w-full">
          <PrimaryButton active="true" onDark="true" label="Continue"></PrimaryButton>
        </button>
      </div>
    </div>
  );
};
