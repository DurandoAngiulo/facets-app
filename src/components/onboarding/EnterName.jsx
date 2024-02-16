"use client";

import React, { useState } from "react";
import { capitalizeFirstLetter } from "@/utils/util-functions";
import { PrimaryButton } from "@/components/Button/Index";
import ProgressBar from "../ProgressBar/Index";
import Icon from "@/components/Icon";

export const EnterName = ({ handleUpdateProfile }) => {
  const [name, setName] = useState("john");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === "") {
      setError("Please enter your first name.");
    } else {
      setName(capitalizeFirstLetter(name));
      handleUpdateProfile({
        firstName: name,
        onboardingStep: 2
      });
    }
  };

  return (
    // border for testing purposes
    <div className="page border border-yellow-950">
      <ProgressBar width="20%" step="1"></ProgressBar>
      <div className="w-full h-4 relative mt-12">
        <Icon iconName="emojiPeople" className="w-full h-8 left-0 mb-4 absolute" />
      </div>

      <h1 style={{ color: "var(--brand)" }} className="my-8 w-full text-center">
        What is your first name?
      </h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <div className="w-full p-3 rounded border border-zinc-500 border-opacity-50 flex-col justify-center items-start gap-2.5 inline-flex mb-4">
              <p>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="focus:outline-none"
                />
              </p>
            </div>
          </label>

          <div className="w-full items-end flex mb-16 ">
            <button className="w-full" id="name-continue" type="submit">
              <PrimaryButton active="true" label="Continue"></PrimaryButton>
            </button>
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </form>
    </div>
  );
};
