"use client";
import React, { useState } from "react";
import Icon from "@/components/Icon";
import { PrimaryButton } from "@/components/Button/Index";
import ProgressBar from "../ProgressBar/Index";

export const EnterGender = ({ handleUpdateProfile }) => {
  const [gender, setGender] = useState("");
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (gender.trim() === "") {
      setError("Please select your gender.");
    } else {
      handleUpdateProfile({ gender: gender, onboardingStep: 4 });
    }
  };

  return (
    // border for testing purposes
    <div className="page padding border border-yellow-950">
      <ProgressBar width="37.5%" step="3"></ProgressBar>

      <div className="w-full h-4 relative mt-12">
        <Icon iconName="familyStar" className="w-full h-8 left-0 mb-4 absolute" />
      </div>

      <h1 style={{ color: "var(--brand)" }} className="my-8 w-full text-center">
        Which gender identity best describes you?
      </h1>

      <form onSubmit={handleSubmit}>
        {/* gender options */}
        <div className="w-full flex-col justify-center items-start gap-2.5 inline-flex">
          <div className="w-full p-3 rounded border border-zinc-500 border-opacity-50 justify-start items-center gap-2.5 inline-flex">
            <label className="justify-center items-center flex">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={handleGenderChange}
                className="w-4 h-4 mr-2 relative bg-white rounded-lg border border-zinc-500 border-opacity-50"
              />
              <p>Male</p>
            </label>
          </div>

          <div className="w-full p-3 rounded border border-zinc-500 border-opacity-50 justify-start items-center gap-2.5 inline-flex">
            <label className="justify-center items-center flex">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={handleGenderChange}
                className="w-4 h-4 mr-2 relative bg-white rounded-lg border border-zinc-500 border-opacity-50 focus:border-purple-500"
              />
              <p>Female</p>
            </label>
          </div>

          <div className="w-full p-3 rounded border border-zinc-500 border-opacity-50 justify-start items-center gap-2.5 inline-flex">
            <label className="justify-center items-center flex">
              <input
                type="radio"
                name="gender"
                value="non-binary"
                checked={gender === "non-binary"}
                onChange={handleGenderChange}
                className="w-4 h-4 mr-2 relative bg-white rounded-lg border border-zinc-500 border-opacity-50"
              />
              <p>Non-Binary</p>
            </label>
          </div>

          <div className="w-full p-3 rounded border border-zinc-500 border-opacity-50 justify-start items-center gap-2.5 inline-flex">
            <label className="justify-center items-center flex">
              <input
                type="radio"
                name="gender"
                value="other"
                checked={gender === "other"}
                onChange={handleGenderChange}
                className="w-4 h-4 mr-2 relative bg-white rounded-lg border border-zinc-500 border-opacity-50"
              />
              <p>Other</p>
            </label>
          </div>
        </div>

        <div className="w-full items-end flex mt-10 ">
          <button className="w-full" id="gender-continue" type="submit">
            <PrimaryButton active="true" label="Continue"></PrimaryButton>
          </button>
        </div>
      </form>
    </div>
  );
};
