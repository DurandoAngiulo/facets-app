import React from "react";
import Icon from "@/components/Icon";
import { PrimaryButton } from "@/components/Button/Index";

export const TimeToMakeFacet = ({ handleUpdateProfile }) => {
  const handleClick = () => {
    handleUpdateProfile({
      onboardingStep: 10
    });
  };
  return (
    <div
      className="page bg-center flex flex-col padding bg-cover justify-center"
      style={{ backgroundImage: "url('/dist/images/makeown.jpg')" }}
    >
      <div className="h-full flex flex-col justify-center items-center">
        <Icon iconName="mining" className="h-16 mb-4" />
        <div className=" flex flex-row gap-2 mx-5 justify-center ">
          <h1 className="align-middle text-center leading-snug text-white ">
            Time to create your own
            <i> Facet!</i>
          </h1>
        </div>
      </div>
      <div className="items-end flex mb-16">
        <button onClick={handleClick} className="w-full">
          <PrimaryButton active="true" onDark="true" label="Let's go!"></PrimaryButton>
        </button>
      </div>
    </div>
  );
};
