// EnterOccupation.js
"use client";
import React, { useState } from "react";
import RadioInput from "@/components/RadioInput/Index";

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
      <h1>occupation</h1>
      <form onSubmit={handleSubmit}>
        <RadioInput
          label="student"
          value="student"
          checked={occupation === "student"}
          onChange={handleOccupationChange}
          name="occupation"
        />
        <RadioInput
          label="part-time employed"
          value="part-time-employed"
          checked={occupation === "part-time-employed"}
          onChange={handleOccupationChange}
          name="occupation"
        />
        <RadioInput
          label="Full time employed"
          value="full-time-employed"
          checked={occupation === "full-time-employed"}
          onChange={handleOccupationChange}
          name="occupation"
        />
        <RadioInput
          label="Self-employed"
          value="self-employed"
          checked={occupation === "self-employed"}
          onChange={handleOccupationChange}
          name="occupation"
        />
        <RadioInput
          label="Other"
          value="other"
          checked={occupation === "other"}
          onChange={handleOccupationChange}
          name="occupation"
        />

        <button type="submit">Submit</button>
      </form>
    </>
  );
};
