"use client";

import { useEffect, useState } from "react";

import FIREBASE from "@/constants/firebase";
import { getRandomPrompts } from "@/services/prompt.service";
import { capitalizeFirstLetter } from "@/utils/util-functions";
import Icon from "@/components/Icon";
import { PrimaryButton, TertiaryButton } from "@/components/Button/Index";

export const EnterPersonalFacet = ({ handleUpdateProfile }) => {
  const [promptArray, setPromptArray] = useState([]);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [inputs, setInputs] = useState(["", "", ""]);
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
    fetchRandomPrompts();
  }, []);

  const fetchRandomPrompts = async () => {
    try {
      const prompts = await getRandomPrompts(FIREBASE.COLLECTIONS.USERPROMPTS);
      setPromptArray(prompts);
    } catch (error) {
      console.error("Error fetching prompts:", error);
      // Handle error if needed
    }
  };

  const handleNewPrompt = () => {
    fetchRandomPrompts();
    setCurrentPromptIndex(0);
    setInputs(["", "", ""]);
  };

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
      <div className="page padding h-full flex flex-col gap-y-16">
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

          <button className="w-full mt-3" type="reset" onClick={handleNewPrompt}>
            <TertiaryButton
              active="true"
              label="New prompt"
              icon={<Icon iconName="shuffle" className="h-2.5" />}
              iconRight
            ></TertiaryButton>
          </button>
        </div>

        <div className="absolute bottom-32 left-0 right-0 flex justify-center ">
          <button className="w-full mx-6" type="submit" style={{ maxWidth: "420px" }}>
            <PrimaryButton active="true" label="Continue"></PrimaryButton>
          </button>
        </div>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      
    </form>
  );
};
