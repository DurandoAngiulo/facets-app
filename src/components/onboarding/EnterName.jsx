"use client";

import React, { useState } from "react";
import { capitalizeFirstLetter } from "@/services/util-functions";
export const EnterName = ({ handleUpdateProfile }) => {
  const [name, setName] = useState("john");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === "") {
      setError("Please enter your first name.");
    } else {
      setName(capitalizeFirstLetter(name));
      handleUpdateProfile({
        firstName: name,
        onboardingStep: 2,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="">
        <label>
          What is your first name?
          <input
            type="text"
            className="text-black border-solid border-2 border-red-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <button id="name-continue" type="submit">
          Continue
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </form>
  );
};
