"use client";

import React, { useState } from "react";
import { capitalizeFirstLetter } from "@/utils/util-functions";

export const EnterOccupation = ({ handleUpdateProfile }) => {
  const [occupation, setOccupation] = useState("Student");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (occupation.trim() === "") {
      setError("Please enter your location.");
    } else {
      setOccupation(capitalizeFirstLetter(occupation));
      handleUpdateProfile({ occupation: occupation, onboardingStep: 9 });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="">
        <label>
          occupation?
          <input
            type="text"
            className="text-black border-solid border-2 border-red-500"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
          />
        </label>
        <button id="occupation-continue" type="submit">
          Continue
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </form>
  );
};
