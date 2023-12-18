"use client";

import React, { useState, useEffect } from "react";
import { capitalizeFirstLetter, getRandomPrompts } from "@/utils/util-functions";

const FriendFacetCreation = () => {
  const [facetResponses, setFacetResponses] = useState([]);

  const [friendFacet, setFriendFacet] = useState({
    friendshipPeriod: "",
    last_updated: "",
    createdAt: "",
    respondantUserId: ""
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prompts = await getRandomPrompts();
        // setPromptArray(prompts);

        // setFriendFacet((prevFacet) => ({
        //   ...prevFacet,
        //   responses: prompts.map((prompt) => ({
        //     prompt_id: prompt.id,
        //     response: ""
        //   }))
        // }));

        const responsesArray = prompts.map((prompt) => ({
          prompt_id: prompt.id,
          response: ""
        }));

        setFriendFacet((prevFacet) => ({
          ...prevFacet,
          responses: responsesArray
        }));
      } catch (error) {
        console.error("Error fetching prompts:", error);
        // Handle error if needed
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const areAllResponsesAnswered = friendFacet.responses.every((response) => response.response.trim() !== "");

    if (!areAllResponsesAnswered) {
      setError("Please answer all prompts");
    } else {
      const updatedFacet = {
        ...friendFacet,
        responses: friendFacet.responses.map((response) => ({
          ...response,
          response: capitalizeFirstLetter(response.response.trim())
        }))
      };

      setFriendFacet(updatedFacet);

      // Call handleUpdateProfile in the callback of setPersonalFacet to ensure the state is updated
      // handleUpdateProfile({
      //   personalFacet: updatedFacet,
      //   onboardingStep: 10,
      // });
    }
  };

  useEffect(() => {
    // Log the updated personalFacet whenever it changes
    console.log("Updated personalFacet:", friendFacet);
  }, [friendFacet]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="">
        <div>
          <label>
            {promptOne}
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
            {promptTwo}
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
            {promptThree}
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

export default FriendFacetCreation;
