"use client";
import React, { useState } from "react";
import Icon from "@/components/Icon";
import { PrimaryButton } from "@/components/Button/Index";
import ProgressBar from "../ProgressBar/Index";

export const EnterBirthday = ({ handleUpdateProfile }) => {
  const [birthday, setBirthday] = useState("2001-10-05"); // Use the correct date format for the input
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
    <div className="page border border-yellow-950">
      <div></div>
      <ProgressBar width="20%" step="2"></ProgressBar>
      <form onSubmit={handleSubmit}>
        {/* TODO: make birthday formatting */}
        <div className="w-full h-4 relative mt-12">
          <Icon iconName="cake" className="w-full h-8 left-0 top-6 bottom-6 absolute" />
        </div>
        <h1 style={{ color: "var(--brand)" }} className="my-14 w-full text-center">
          What is your birthday?
          <p style={{ color: "var(--text)" }}>
            <input
              type="date"
              className="text-black border-solid w-full h-14 rounded border border-zinc-500 border-opacity-50 p-4 my-8"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </p>
        </h1>
        <button className="w-full leading-none align-bottom " id="birthday-continue" type="submit">
          <PrimaryButton active="true" label="Continue"></PrimaryButton>
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};
