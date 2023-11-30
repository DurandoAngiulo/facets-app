"use client";

import React, { useState, useEffect } from "react";
import { capitalizeFirstLetter } from "@/services/util-functions";

export const EnterPersonalFacet = ({ handleUpdateProfile }) => {
  const [inputOne, setInputOne] = useState("");
  const [inputTwo, setInputTwo] = useState("");
  const [inputThree, setInputThree] = useState("");
  const [personalFacet, setPersonalFacet] = useState({
    facetPromptOneID: 0,
    facetPromptTwoID: 1,
    facetPromptThreeID: 2,
    facetResponseOne: "",
    facetResponseTwo: "",
    facetResponseThree: "",
  });
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      inputOne.trim() === "" ||
      inputTwo.trim() === "" ||
      inputThree.trim() === ""
    ) {
      setError("Please answer all prompts");
    } else {
      const capInputOne = capitalizeFirstLetter(inputOne);
      const capInputTwo = capitalizeFirstLetter(inputTwo);
      const capInputThree = capitalizeFirstLetter(inputThree);

      setPersonalFacet({
        ...personalFacet,
        facetResponseOne: capInputOne,
        facetResponseTwo: capInputTwo,
        facetResponseThree: capInputThree,
      });

      // Call handleUpdateProfile in the callback of setPersonalFacet to ensure the state is updated
      setPersonalFacet((updatedFacet) => {
        handleUpdateProfile({
          personalFacet: updatedFacet,
          onboardingStep: 10,
        });
      });
    }
  };

  useEffect(() => {
    // Log the updated personalFacet whenever it changes
    console.log("Updated personalFacet:", personalFacet);
  }, [personalFacet]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="">
        <div>
          <label>
            prompt 1
            <input
              type="text"
              className="text-black border-solid border-2 border-red-500"
              value={inputOne}
              onChange={(e) => setInputOne(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            prompt 2
            <input
              type="text"
              className="text-black border-solid border-2 border-red-500"
              value={inputTwo}
              onChange={(e) => setInputTwo(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            prompt 3
            <input
              type="text"
              className="text-black border-solid border-2 border-red-500"
              value={inputThree}
              onChange={(e) => setInputThree(e.target.value)}
            />
          </label>
        </div>
        <button id="location-continue" type="submit">
          Continue
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </form>
  );
};
