// EnterOccupation.js
"use client";
import React, { useState } from "react";
import Icon from "@/components/Icon";
import { PrimaryButton } from "@/components/Button/Index";
import ProgressBar from "../ProgressBar/Index";
import RadioInput from "@/components/Inputs/RadioInput/Index";

export const EnterOccupation = ({ handleUpdateProfile }) => {
  const [occupation, setOccupation] = useState("");
  const [error, setError] = useState("");

  const handleOccupationChange = (event) => {
    setOccupation(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (occupation.trim() === "") {
      setError("Please select your occupation.");
    } else {
      handleUpdateProfile({ occupation: occupation, onboardingStep: 9 });
    }
  };

  return (
    <>
      <div className="page padding bg-white h-screen">
        <ProgressBar width="100%" step="8"></ProgressBar>

        <div className="w-full h-4 relative mt-12">
          <Icon iconName="occupation" className="w-full h-8 left-0 mb-4 absolute" />
        </div>

        <h1 style={{ color: "var(--brand)" }} className="my-8 w-full text-center">
          What is your current employment situation?
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="w-full flex-col justify-center items-start gap-2.5 inline-flex">
            <div className="w-full">
              <RadioInput
                label="Student"
                value="Student"
                checked={occupation === "Student"}
                onChange={handleOccupationChange}
                name="occupation"
              />
            </div>

            <div className="w-full">
              <RadioInput
                label="Part-time employed"
                value="Part-time employed"
                checked={occupation === "Part-time employed"}
                onChange={handleOccupationChange}
                name="occupation"
              />
            </div>

            <div className="w-full">
              <RadioInput
                label="Full time employed"
                value="Full time employed"
                checked={occupation === "Full time employed"}
                onChange={handleOccupationChange}
                name="occupation"
              />
            </div>

            <div className="w-full">
              <RadioInput
                label="Self-employed"
                value="Self-employed"
                checked={occupation === "Self-employed"}
                onChange={handleOccupationChange}
                name="occupation"
              />
            </div>

            <div className="w-full">
              <RadioInput
                label="Other"
                value="Other"
                checked={occupation === "Other"}
                onChange={handleOccupationChange}
                name="occupation"
              />
            </div>
          </div>

          <div className="absolute px-1 bottom-16 left-0 right-0 flex justify-center ">
            <button className="w-full px-6" id="occupation-continue" type="submit" style={{ maxWidth: "420px" }}>
              <PrimaryButton active="true" label="Continue"></PrimaryButton>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
