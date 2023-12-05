"use client";
import React from "react";
import { useState } from "react";

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
    <form onSubmit={handleSubmit}>
      <label>
        <input
          type="radio"
          name="gender"
          value="male"
          checked={gender === "male"}
          onChange={handleGenderChange}
        />
        Male
      </label>
      <label>
        <input
          type="radio"
          name="gender"
          value="female"
          checked={gender === "female"}
          onChange={handleGenderChange}
        />
        Female
      </label>
      <label>
        <input
          type="radio"
          name="gender"
          value="non-binary"
          checked={gender === "non-binary"}
          onChange={handleGenderChange}
        />
        Non-Binary
      </label>
      <label>
        <input
          type="radio"
          name="gender"
          value="other"
          checked={gender === "other"}
          onChange={handleGenderChange}
        />
        Other
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
