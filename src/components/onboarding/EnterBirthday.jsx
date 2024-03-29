"use client";

import React, { useState } from "react";
import Icon from "@/components/Icon";
import { PrimaryButton } from "@/components/Button/Index";
import ProgressBar from "../ProgressBar/Index";

export const EnterBirthday = ({ handleUpdateProfile }) => {
  const [birthday, setBirthday] = useState(""); // Use the correct date format for the input
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (birthday.trim() === "") {
      setError("Please enter your birthday.");
    } else {
      handleUpdateProfile({ birthday: birthday, onboardingStep: 3 });
    }
  };

  return (
    // border for testing purposes
    <div className="page padding bg-white">
      <ProgressBar width="20%" step="2"></ProgressBar>
      <div className="w-full h-4 relative mt-12">
        <Icon iconName="cake" className="w-full h-8 left-0 mb-4 absolute" />
      </div>

      <h1 style={{ color: "var(--brand)" }} className="my-8 w-full text-center">
        What is your birthday?
      </h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <div>
              <p style={{ color: "var(--text)" }}>
                <input
                  type="date"
                  className="border-solid w-full rounded border border-zinc-500 border-opacity-50 p-4 mb-4"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                />
              </p>
            </div>
          </label>

          <div className="absolute px-1 bottom-16 left-0 right-0 flex justify-center ">
            <button className="w-full px-6" id="birthday-continue" type="submit" style={{ maxWidth: "420px" }}>
              <PrimaryButton active="true" label="Continue"></PrimaryButton>
            </button>
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </form>
    </div>
  );
};
