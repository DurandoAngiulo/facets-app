"use client";
import React from "react";
import { useState } from "react";

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
    <form onSubmit={handleSubmit}>
      ;
      <label>
        Select an option:
        <select value={pronouns} onChange={handleOptionChange}>
          <option value="">Select an option</option>
          <option value="he/him">He/Him</option>
          <option value="she/her">She/Her</option>
          <option value="they/them">They/Them</option>
          <option value="custom">Custom</option>
        </select>
      </label>
      {pronouns === "custom" && (
        <label>
          Custom value:
          <input
            type="text"
            value={customPronouns}
            onChange={handleCustomInputChange}
            placeholder="Enter custom value"
          />
        </label>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};
