"use client";
import React, { useState } from "react";

export const EnterAgeRange = ({ handleUpdateProfile }) => {
  const [lowerBound, setLowerBound] = useState(18);
  const [upperBound, setUpperBound] = useState(70);

  const handleLowerBoundChange = (event) => {
    const newLowerBound = parseInt(event.target.value, 10);
    setLowerBound(newLowerBound);

    // Ensure that lowerBound is always less than or equal to upperBound
    if (newLowerBound > upperBound) {
      setUpperBound(newLowerBound);
    }
  };

  const handleUpperBoundChange = (event) => {
    const newUpperBound = parseInt(event.target.value, 10);
    setUpperBound(newUpperBound);

    // Ensure that upperBound is always greater than or equal to lowerBound
    if (newUpperBound < lowerBound) {
      setLowerBound(newUpperBound);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdateProfile({
      ageRange: [lowerBound, upperBound],
      onboardingStep: 7
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Select your age range:
        <div>
          <label>Lower Bound: {lowerBound}</label>
          <input
            type="range"
            name="lowerBound"
            min={18}
            max={upperBound}
            value={lowerBound}
            onChange={handleLowerBoundChange}
          />
        </div>
        <div>
          <label>Upper Bound: {upperBound}</label>
          <input
            type="range"
            name="upperBound"
            min={lowerBound}
            max={70}
            value={upperBound}
            onChange={handleUpperBoundChange}
          />
        </div>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
