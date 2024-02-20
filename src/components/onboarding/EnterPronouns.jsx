"use client";
import React, { useState } from "react";
import Icon from "@/components/Icon";
import { PrimaryButton } from "@/components/Button/Index";
import ProgressBar from "../ProgressBar/Index";

export const EnterPronouns = ({ handleUpdateProfile }) => {
  const [pronouns, setPronouns] = useState("");
  const [customPronouns, setCustomPronouns] = useState("");
  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setPronouns(selectedValue);
    if (selectedValue !== "custom") {
      setCustomPronouns("");
    }
  };
  const handleCustomInputChange = (event) => {
    setCustomPronouns(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    if (pronouns === "custom" && customValue.trim() === "") {
      alert("Please enter a custom value.");
    } else {
      pronouns === "custom" ? setPronouns(customPronouns) : pronouns;
      handleUpdateProfile({ pronouns: pronouns, onboardingStep: 5 });
    }
  };

  return (
    <div className="page border border-yellow-950">
      <ProgressBar width="50%" step="4"></ProgressBar>

      <div className="w-full h-4 relative mt-12">
        <Icon iconName="pronouns" className="w-full h-8 left-0 mb-4 absolute" />
      </div>

      <h1 style={{ color: "var(--brand)" }} className="my-8 w-full text-center">
        What are your pronouns?
      </h1>

      <form onSubmit={handleSubmit}>
        <label>
          <div className="w-full p-3 rounded border border-zinc-500 border-opacity-50 justify-start items-center gap-2.5 inline-flex">
            {/* Select an option: */}
            {/* <select value={pronouns} onChange={handleOptionChange}>
              <option value="">Select Your Pronouns</option>
              <option value="he/him">He/Him</option>
              <option value="she/her">She/Her</option>
              <option value="they/them">They/Them</option>
              <option value="custom">Custom</option>
            </select> */}
            <input
              type="text"
              className="focus:outline-none"
              value={pronouns}
              onChange={(e) => setPronouns(e.target.value)}
            />

            <div>
              {pronouns === "custom" && (
                <label className="justify-center items-center flex">
                  Custom value:
                  <input
                    type="text"
                    value={customPronouns}
                    onChange={handleCustomInputChange}
                    placeholder="Enter custom value"
                  />
                </label>
              )}
            </div>
          </div>
        </label>

        <div className="absolute bottom-16 left-0 right-0 flex justify-center ">
          <button className="w-full mx-6" id="pronouns-continue" type="submit">
            <PrimaryButton active="true" label="Continue"></PrimaryButton>
          </button>
        </div>
      </form>
    </div>
  );
};
