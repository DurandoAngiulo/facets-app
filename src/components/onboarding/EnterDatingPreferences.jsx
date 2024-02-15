"use client";
import React, { useState } from "react";
import Icon from "@/components/Icon";
import { PrimaryButton } from "@/components/Button/Index";
import ProgressBar from "../ProgressBar/Index";

export const EnterDatingPreferences = ({ handleUpdateProfile }) => {
  const [selectedDatingPreferences, setSelectedDatingPreferences] = useState([]);

  const handlePreferenceChange = (event) => {
    const selectedValue = event.target.value;
    const isSelected = selectedDatingPreferences.includes(selectedValue);

    if (isSelected) {
      // If already selected, remove it
      setSelectedDatingPreferences(
        selectedDatingPreferences.filter((datingPreference) => datingPreference !== selectedValue)
      );
    } else {
      // If not selected, add it
      setSelectedDatingPreferences([...selectedDatingPreferences, selectedValue]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedDatingPreferences.length === 0) {
      setError("Please select dating preferences.");
    } else {
      handleUpdateProfile({
        datingPreference: selectedDatingPreferences,
        onboardingStep: 6
      });
    }
  };

  return (
    <div className="page border border-yellow-950">
      <ProgressBar width="62.5%" step="5"></ProgressBar>

      <div className="w-full h-4 relative mt-12">
        <Icon iconName="preference" className="w-full h-8 left-0 mb-4 absolute" />
      </div>

      <h1 style={{ color: "var(--brand)" }} className="my-8 w-full text-center">
        Who are you searching for?
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="w-full flex-col justify-center items-start gap-2.5 inline-flex">
          <div className="w-full my-2 p-3 rounded border border-zinc-500 border-opacity-50 justify-start items-center gap-2.5 inline-flex">
            <label className="justify-center items-center flex">
              <input
                type="checkbox"
                name="datingPreference"
                value="men"
                checked={selectedDatingPreferences.includes("men")}
                onChange={handlePreferenceChange}
                className="mr-2"
              />
              <p>Male</p>
            </label>
          </div>
        </div>

        <div className="w-full flex-col justify-center items-start gap-2.5 inline-flex">
          <div className="w-full p-3 my-2 rounded border border-zinc-500 border-opacity-50 justify-start items-center gap-2.5 inline-flex">
            <label className="justify-center items-center flex">
              <input
                type="checkbox"
                name="datingPreference"
                value="women"
                checked={selectedDatingPreferences.includes("women")}
                onChange={handlePreferenceChange}
                className="mr-2"
              />
              <p>Female</p>
            </label>
          </div>
        </div>

        <div className="w-full flex-col justify-center items-start gap-2.5 inline-flex">
          <div className="w-full p-3 my-2 rounded border border-zinc-500 border-opacity-50 justify-start items-center gap-2.5 inline-flex">
            <label className="justify-center items-center flex">
              <input
                type="checkbox"
                name="datingPreference"
                value="non-binary"
                checked={selectedDatingPreferences.includes("non-binary")}
                onChange={handlePreferenceChange}
                className="mr-2"
              />
              <p>Non-Binary People</p>
            </label>
          </div>
        </div>

        <div className="w-full flex-col justify-center items-start gap-2.5 inline-flex">
          <div className="w-full p-3 my-2 rounded border border-zinc-500 border-opacity-50 justify-start items-center gap-2.5 inline-flex">
            <label className="justify-center items-center flex">
              <input
                type="checkbox"
                name="datingPreference"
                value="everyone"
                checked={selectedDatingPreferences.includes("everyone")}
                onChange={handlePreferenceChange}
                className="mr-2"
              />
              <p>Everyone</p>
            </label>
          </div>
        </div>
      </form>
      <div className="w-full items-end flex mb-16 ">
        <button className="w-full" id="preferences-continue" type="submit">
          <PrimaryButton active="true" label="Continue"></PrimaryButton>
        </button>
      </div>
    </div>
  );
};
