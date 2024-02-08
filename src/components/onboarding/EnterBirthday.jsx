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
    <div className="page">
      <ProgressBar width="20%" step="2"></ProgressBar>
      <form onSubmit={handleSubmit}>
        {/* TODO: make birthday formatting */}

        <label>
          What is your birthday?
          <input
            type="date"
            className="text-black border-solid border-2 border-red-500"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </label>
        <button id="birthday-continue" type="submit">
          Continue
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};
