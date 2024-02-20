"use client";
import React, { useState } from "react";
import TextInput from "@/components/Inputs/TextInput/Index";
import RadioInputGroup from "@/components/Inputs/RadioInputGroup/Index";

export const EnterMoreDetails = ({ handleUpdateProfile }) => {
  const [moreDetails, setMoreDetails] = useState({
    school: "",
    hometown: "",
    sexuality: "",
    smoking: "",
    drinking: "",
    mtbi: "",
    astrologicalSign: "",
    height: "",
    religion: "",
    politicalAffiliation: ""
  });

  const handleTextInputChange = (field, value) => {
    setMoreDetails((prevDetails) => ({ ...prevDetails, [field]: value }));
  };

  const handleRadioInputChange = (field, value) => {
    setMoreDetails((prevDetails) => ({ ...prevDetails, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateProfile({
      moreDetails: {
        school: moreDetails.school,
        hometown: moreDetails.hometown,
        sexuality: moreDetails.sexuality,
        smoking: moreDetails.smoking,
        drinking: moreDetails.drinking,
        mtbi: moreDetails.mtbi,
        astrologicalSign: moreDetails.astrologicalSign,
        height: moreDetails.height,
        religion: moreDetails.religion,
        politicalAffiliation: moreDetails.politicalAffiliation
      },
      onboardingStep: 14
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="page padding">
        <TextInput
          label="School:"
          value={moreDetails.school}
          onChange={(e) => handleTextInputChange("school", e.target.value)}
        />
        <TextInput
          label="Hometown:"
          value={moreDetails.hometown}
          onChange={(e) => handleTextInputChange("hometown", e.target.value)}
        />
        <TextInput
          label="Sexuality:"
          value={moreDetails.sexuality}
          onChange={(e) => handleTextInputChange("sexuality", e.target.value)}
        />

        <RadioInputGroup
          radioInputs={[
            {
              name: "smoking",
              label: "Smokes",
              value: "smokes",
              checked: moreDetails.smoking === "smokes",
              onChange: () => handleRadioInputChange("smoking", "smokes")
            },
            {
              name: "smoking",
              label: "Doesn't Smoke",
              value: "doesn't smoke",
              checked: moreDetails.smoking === "doesn't smoke",
              onChange: () => handleRadioInputChange("smoking", "doesn't smoke")
            },
            {
              name: "smoking",
              label: "Sometimes Smokes",
              value: "sometimes smokes",
              checked: moreDetails.smoking === "sometimes smokes",
              onChange: () => handleRadioInputChange("smoking", "sometimes smokes")
            }
          ]}
        />

        <RadioInputGroup
          radioInputs={[
            {
              name: "drinking",
              label: "Does Drink",
              value: "does drink",
              checked: moreDetails.drinking === "does drink",
              onChange: () => handleRadioInputChange("drinking", "does drink")
            },
            {
              name: "drinking",
              label: "Doesn't Drink",
              value: "doesn't drink",
              checked: moreDetails.drinking === "doesn't drink",
              onChange: () => handleRadioInputChange("drinking", "doesn't drink")
            },
            {
              name: "drinking",
              label: "Sometimes Drinks",
              value: "sometimes drinks",
              checked: moreDetails.drinking === "sometimes drinks",
              onChange: () => handleRadioInputChange("drinking", "sometimes drinks")
            }
          ]}
        />

        <TextInput
          label="MTBI:"
          value={moreDetails.mtbi}
          onChange={(e) => handleTextInputChange("mtbi", e.target.value)}
        />
        <TextInput
          label="Astrological Sign:"
          value={moreDetails.astrologicalSign}
          onChange={(e) => handleTextInputChange("astrologicalSign", e.target.value)}
        />
        <TextInput
          label="Height:"
          value={moreDetails.height}
          onChange={(e) => handleTextInputChange("height", e.target.value)}
        />
        <TextInput
          label="Religion:"
          value={moreDetails.religion}
          onChange={(e) => handleTextInputChange("religion", e.target.value)}
        />

        <RadioInputGroup
          radioInputs={[
            {
              name: "politicalAffiliation",
              label: "Liberal",
              value: "liberal",
              checked: moreDetails.politicalAffiliation === "liberal",
              onChange: () => handleRadioInputChange("politicalAffiliation", "liberal")
            },
            {
              name: "politicalAffiliation",
              label: "Moderate",
              value: "moderate",
              checked: moreDetails.politicalAffiliation === "moderate",
              onChange: () => handleRadioInputChange("politicalAffiliation", "moderate")
            },
            {
              name: "politicalAffiliation",
              label: "Conservative",
              value: "conservative",
              checked: moreDetails.politicalAffiliation === "conservative",
              onChange: () => handleRadioInputChange("politicalAffiliation", "conservative")
            },
            {
              name: "politicalAffiliation",
              label: "Not Political",
              value: "not political",
              checked: moreDetails.politicalAffiliation === "not political",
              onChange: () => handleRadioInputChange("politicalAffiliation", "not political")
            },
            {
              name: "politicalAffiliation",
              label: "Other",
              value: "other",
              checked: moreDetails.politicalAffiliation === "other",
              onChange: () => handleRadioInputChange("politicalAffiliation", "other")
            }
          ]}
        />

        <div className="">
          <button id="details-continue" type="submit">
            Continue
          </button>
        </div>
      </div>
    </form>
  );
};
