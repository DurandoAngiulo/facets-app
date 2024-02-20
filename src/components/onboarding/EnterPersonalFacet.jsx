"use client";

import { useEffect, useState } from "react";

import FIREBASE from "@/constants/firebase";
import { getRandomPrompts } from "@/services/prompt.service";
import { capitalizeFirstLetter } from "@/utils/util-functions";
import Icon from "@/components/Icon";
import { PrimaryButton, TertiaryButton } from "@/components/Button/Index";

export const EnterPersonalFacet = ({ handleUpdateProfile }) => {
  const [promptArray, setPromptArray] = useState([]);
  const [promptOne, setPromptOne] = useState("loading");
  const [promptTwo, setPromptTwo] = useState("loading");
  const [promptThree, setPromptThree] = useState("loading");
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [inputs, setInputs] = useState(["", "", ""]);
  const [inputOne, setInputOne] = useState("");
  const [inputTwo, setInputTwo] = useState("");
  const [inputThree, setInputThree] = useState("");
  const [personalFacet, setPersonalFacet] = useState({
    facetPromptOneID: 0,
    facetPromptTwoID: 1,
    facetPromptThreeID: 2,
    facetResponseOne: "",
    facetResponseTwo: "",
    facetResponseThree: ""
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prompts = await getRandomPrompts(FIREBASE.COLLECTIONS.USERPROMPTS);
        setPromptArray(prompts);

        // Assuming prompts is an array with three prompt objects
        setPersonalFacet((prevFacet) => ({
          ...prevFacet,
          facetPromptOneID: prompts[0].id,
          facetPromptTwoID: prompts[1].id,
          facetPromptThreeID: prompts[2].id
        }));
        setPromptOne(prompts[0].prompt);
        setPromptTwo(prompts[1].prompt);
        setPromptThree(prompts[2].prompt);
      } catch (error) {
        console.error("Error fetching prompts:", error);
        // Handle error if needed
      }
    };

    fetchData();
  }, []);

  /* const handleSubmit = (e) => {
    e.preventDefault();

    if (inputOne.trim() === "" || inputTwo.trim() === "" || inputThree.trim() === "") {
      setError("Please answer all prompts");
    } else {
      const capInputOne = capitalizeFirstLetter(inputOne);
      const capInputTwo = capitalizeFirstLetter(inputTwo);
      const capInputThree = capitalizeFirstLetter(inputThree);

      // Use the state values for prompt IDs
      const updatedFacetResponses = [
        { prompt_id: personalFacet.facetPromptOneID, response: capInputOne },
        { prompt_id: personalFacet.facetPromptTwoID, response: capInputTwo },
        { prompt_id: personalFacet.facetPromptThreeID, response: capInputThree }
      ];

      handleUpdateProfile({
        personalFacet: [{ responses: updatedFacetResponses }],
        onboardingStep: 11
      });

      // Don't think we need to reset the facets, just update the responses
      // setPersonalFacet(updatedFacetResponses);

      // Call handleUpdateProfile in the callback of setPersonalFacet to ensure the state is updated
      // setPersonalFacet((updatedFacet) => {
      //   handleUpdateProfile({
      //     personalFacet: updatedFacet,
      //     onboardingStep: 11
      //   });
      // });
    }
  };
 */
  const handleSubmit = (e) => {
    e.preventDefault();

    const currentInput = inputs[currentPromptIndex].trim();
    if (currentInput === "") {
      setError("Please answer the prompt");
    } else {
      const capInput = capitalizeFirstLetter(currentInput);
      const updatedInputs = [...inputs];
      updatedInputs[currentPromptIndex] = capInput;
      setInputs(updatedInputs);

      if (currentPromptIndex < 2) {
        // If there are more prompts, move to the next one
        setCurrentPromptIndex(currentPromptIndex + 1);
      } else {
        // If all prompts are answered, proceed to the next page
        handleUpdateProfile({
          personalFacet: [
            { prompt_id: promptArray[0].id, response: updatedInputs[0] },
            { prompt_id: promptArray[1].id, response: updatedInputs[1] },
            { prompt_id: promptArray[2].id, response: updatedInputs[2] }
          ],
          onboardingStep: 11
        });
      }
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    const updatedInputs = [...inputs];
    updatedInputs[currentPromptIndex] = value;
    setInputs(updatedInputs);
  };

  useEffect(() => {
    // Log the updated personalFacet whenever it changes
    console.log("Updated personalFacet:", personalFacet);
  }, [personalFacet]);

  const currentPrompt = promptArray[currentPromptIndex];

  return (
    <form onSubmit={handleSubmit}>
      <div className="page h-full flex flex-col gap-y-16">
        <div className="flex flex-col gap-4 mt-24">
          <Icon iconName="diamondFilled" className="h-5" />
          <h1 style={{ color: "var(--brand)" }} className="w-full text-center">
            Answer 3 short prompts.
          </h1>
          <p className="text-center leading-snug" style={{ color: "var(--text)" }}>
            Tell us about yourself in the prompt below. Be real and let your personality shine through!
          </p>
        </div>
        <div>
          <p className="bold" style={{ color: "var(--text)" }}>
            Prompt {currentPromptIndex + 1} of 3
          </p>
          <div>
            {" "}
            <label>
              <p className="mb-3" style={{ fontSize: "var(--font-size-p-md)", color: "var(--text)" }}>
                {currentPrompt?.prompt}
              </p>
              <div className="w-full p-3 rounded border border-zinc-500 border-opacity-50 flex-col justify-center items-start gap-2.5 inline-flex">
                <p>
                  <input
                    type="text"
                    value={inputs[currentPromptIndex]}
                    onChange={handleInputChange}
                    // fix character limit to actually work
                    maxLength="250"
                    className="focus:outline-none"
                  />
                </p>
              </div>
            </label>
          </div>

          <button className="w-full mt-3" type="reset">
            <TertiaryButton
              active="true"
              label="New prompt"
              icon={<Icon iconName="shuffle" className="h-2.5" />}
              iconRight
            ></TertiaryButton>
          </button>
        </div>

        <div className="absolute bottom-16 left-0 right-0 flex justify-center ">
          <button className="w-full mx-6" type="submit" style={{ maxWidth: "420px" }}>
            <PrimaryButton active="true" label="Continue"></PrimaryButton>
          </button>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </form>
  );
};
