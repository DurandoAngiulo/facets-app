"use client";
import React, { useState } from "react";
import Icon from "@/components/Icon";
import { PrimaryButton } from "@/components/Button/Index";
import ProgressBar from "../ProgressBar/Index";

export const EnterAgeRange = ({ handleUpdateProfile }) => {
  const [lowerBound, setLowerBound] = useState(18);
  const [upperBound, setUpperBound] = useState(70);
  const [lowerBoundInput, setLowerBoundInput] = useState("");
  const [upperBoundInput, setUpperBoundInput] = useState("");

  const handleLowerBoundChange = (event) => {
    const newLowerBoundInput = event.target.value;
    setLowerBoundInput(newLowerBoundInput);

    if (!isNaN(parseInt(newLowerBoundInput))) {
      const newLowerBound = parseInt(newLowerBoundInput, 10);
      setLowerBound(newLowerBound);

      if (newLowerBound > upperBound) {
        setUpperBound(newLowerBound);
        setUpperBoundInput(newLowerBoundInput);
      }
    }
  };

  const handleUpperBoundChange = (event) => {
    const newUpperBoundInput = event.target.value;
    setUpperBoundInput(newUpperBoundInput);

    if (!isNaN(parseInt(newUpperBoundInput))) {
      const newUpperBound = parseInt(newUpperBoundInput, 10);
      setUpperBound(newUpperBound);

      if (newUpperBound < lowerBound) {
        setLowerBound(newUpperBound);
        setLowerBoundInput(newUpperBoundInput);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdateProfile({
      ageRange: [lowerBound, upperBound],
      onboardingStep: 7
    });
  };

  return (
    <div className="page padding bg-white">
      <ProgressBar width="75%" step="6"></ProgressBar>

      <div className="w-full h-4 relative mt-12">
        <Icon iconName="ageRange" className="w-full h-8 left-0 mb-4 absolute" />
      </div>

      <h1 style={{ color: "var(--brand)" }} className="my-8 w-full text-center">
        What age range are you interested in?
      </h1>

      <form onSubmit={handleSubmit} className="h-full">
        {/* Select your age range: */}
        <div className="justify-start items-start gap-4 inline-flex">
          {/* <label>Lower Bound: {lowerBound}</label> */}
          {/* <label>{lowerBound}</label> */}
          <div className="grow shrink basis-0 rounded flex-col justify-center items-start gap-1 inline-flex">
            <p className="text-zinc-500 text-base">No younger than:</p>
            <input
              type="text"
              min={18}
              max={upperBound}
              value={lowerBoundInput}
              onChange={handleLowerBoundChange}
              className="mr-4 border-solid w-full h-14 rounded border focus:outline-none border-zinc-500 border-opacity-50 p-4"
              placeholder="Age"
            />
          </div>

          {/* <label>Upper Bound: {upperBound}</label> */}
          <div className="grow shrink basis-0 rounded flex-col justify-center items-start gap-1 inline-flex">
            <p className="text-zinc-500 text-base">No older than:</p>
            <input
              type="text"
              min={lowerBound}
              max={70}
              value={upperBoundInput}
              onChange={handleUpperBoundChange}
              className="mr-4 border-solid w-full h-14 focus:outline-none rounded border border-zinc-500 border-opacity-50 p-4"
              placeholder="Age"
            />
          </div>
        </div>

        <div className="absolute px-1 bottom-16 left-0 right-0 flex justify-center ">
          <button className="w-full px-6" id="ageRange-continue" type="submit" style={{ maxWidth: "420px" }}>
            <PrimaryButton active="true" label="Continue"></PrimaryButton>
          </button>
        </div>
      </form>
    </div>
  );
};
