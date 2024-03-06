"use client";
import React, { useState } from "react";
import Icon from "@/components/Icon";
import { PrimaryButton } from "@/components/Button/Index";
import ProgressBar from "../ProgressBar/Index";
import { capitalizeFirstLetter } from "@/utils/util-functions";

export const EnterLocation = ({ handleUpdateProfile }) => {
  const [location, setLocation] = useState("home");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (location.trim() === "") {
      setError("Please enter your location.");
    } else {
      setLocation(capitalizeFirstLetter(location));
      handleUpdateProfile({ location: location, onboardingStep: 8 });
    }
  };

  return (
    // border for testing purposes
    <div className="page padding bg-white">
      <ProgressBar width="85.5%" step="7"></ProgressBar>
      <div className="w-full h-4 relative mt-12">
        <Icon iconName="location" className="w-full h-8 left-0 mb-4 absolute" />
      </div>

      <h1 style={{ color: "var(--brand)" }} className="my-8 w-full text-center">
        Where do you currently live?
      </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <div className="w-full p-3 rounded border border-zinc-500 border-opacity-50 flex-col justify-center items-start gap-2.5 inline-flex">
              <p>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  // fix character limit to actually work
                  maxLength={16}
                  className="focus:outline-none"
                />
              </p>
            </div>
          </label>

          <div className="absolute px-1 bottom-16 left-0 right-0 flex justify-center ">
            <button className="w-full px-6" id="location-continue" type="submit" style={{ maxWidth: "420px" }}>
              <PrimaryButton active="true" label="Continue"></PrimaryButton>
            </button>
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </form>
    </div>
  );
};
