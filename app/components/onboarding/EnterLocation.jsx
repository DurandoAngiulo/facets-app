"use client";

import React, { useState } from "react";
import { capitalizeFirstLetter } from "@/services/util-functions";

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
    <form onSubmit={handleSubmit}>
      <div className="">
        <label>
          Where do you live?
          <input
            type="text"
            className="text-black border-solid border-2 border-red-500"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <button id="location-continue" type="submit">
          Continue
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </form>
  );
};
