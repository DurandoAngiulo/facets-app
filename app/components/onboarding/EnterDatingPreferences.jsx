"use client";
import React, { useState } from "react";

export const EnterDatingPreferences = ({ handleUpdateProfile }) => {
  const [selectedDatingPreferences, setSelectedDatingPreferences] = useState(
    []
  );

  const handlePreferenceChange = (event) => {
    const selectedValue = event.target.value;
    const isSelected = selectedDatingPreferences.includes(selectedValue);

    if (isSelected) {
      // If already selected, remove it
      setSelectedDatingPreferences(
        selectedDatingPreferences.filter(
          (datingPreference) => datingPreference !== selectedValue
        )
      );
    } else {
      // If not selected, add it
      setSelectedDatingPreferences([
        ...selectedDatingPreferences,
        selectedValue,
      ]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedDatingPreferences.length === 0) {
      setError("Please select dating preferences.");
    } else {
      handleUpdateProfile({
        datingPreference: selectedDatingPreferences,
        onboardingStep: 6,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input
          type="checkbox"
          name="datingPreference"
          value="men"
          checked={selectedDatingPreferences.includes("men")}
          onChange={handlePreferenceChange}
        />
        Male
      </label>
      <label>
        <input
          type="checkbox"
          name="datingPreference"
          value="women"
          checked={selectedDatingPreferences.includes("women")}
          onChange={handlePreferenceChange}
        />
        Female
      </label>
      <label>
        <input
          type="checkbox"
          name="gender"
          value="non-binary"
          checked={selectedDatingPreferences.includes("non-binary")}
          onChange={handlePreferenceChange}
        />
        Non-Binary
      </label>
      <label>
        <input
          type="checkbox"
          name="datingPreference"
          value="everyone"
          checked={selectedDatingPreferences.includes("everyone")}
          onChange={handlePreferenceChange}
        />
        Other
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
