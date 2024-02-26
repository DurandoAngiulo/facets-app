"use client";
import React, { useState } from "react";
import TextInput from "@/components/Inputs/TextInput/Index";
import RadioInputGroup from "@/components/Inputs/RadioInputGroup/Index";
import Checkbox from "@/components/Inputs/Checkbox/Index";
import { PrimaryButton } from "@/components/Button/Index";
import Icon from "@/components/Icon/index";

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
      <div className="page padding ">
        <Icon iconName="back" className="h-5 mt-8" style={{ fill: "none" }} />
        <h1 style={{ color: "var(--brand)" }} className="w-full text-center">
          Add more details.
        </h1>
        <p className="text-center leading-snug" style={{ color: "var(--text)" }}>
          Customize your Facets profile by choosing what you would like to share – skip any fields you&apos;d rather
          keep blank.
        </p>
        <hr className="my-4" style={{ borderColor: "var(--border)" }}></hr>
        <div className="flex flex-col gap-5">
          <div>
            <div className="flex flex-row gap-1 items-center">
              <Icon iconName="bio" className="h-4" />
              <p className="semibold" style={{ color: "var(--element-subtle)" }}>
                Bio
              </p>
            </div>
            <p className="py-1" style={{ color: "var(--element-subtle)" }}>
              Craft your bio and let your true self shine through to attract your perfect match!
            </p>
            <TextInput
              value={moreDetails.school}
              placeholder="None"
              onChange={(e) => handleTextInputChange("school", e.target.value)}
            />
          </div>
          <div>
            <div className="flex flex-row gap-1 pb-1 items-center">
              <Icon iconName="sexuality" className="h-4" />
              <p className="semibold" style={{ color: "var(--element-subtle)" }}>
                Sexuality
              </p>
            </div>
            <TextInput
              value={moreDetails.sexuality}
              placeholder="None"
              onChange={(e) => handleTextInputChange("sexuality", e.target.value)}
            />
          </div>
          <div>
            <div className="flex flex-row gap-1 pb-1 items-center">
              <Icon iconName="school" className="h-4" />
              <p className="semibold" style={{ color: "var(--element-subtle)" }}>
                School
              </p>
            </div>
            <TextInput
              value={moreDetails.school}
              placeholder="None"
              onChange={(e) => handleTextInputChange("school", e.target.value)}
            />
          </div>
          <div>
            <div className="flex flex-row gap-1 pb-1 items-center">
              <Icon iconName="hometown" className="h-4" />
              <p className="semibold" style={{ color: "var(--element-subtle)" }}>
                Hometown
              </p>
            </div>
            <TextInput
              value={moreDetails.hometown}
              placeholder="ex: Philadelphia, PA"
              onChange={(e) => handleTextInputChange("hometown", e.target.value)}
            />
          </div>
          <div>
            <div className="flex flex-row gap-1 pb-1 items-center">
              <Icon iconName="height" className="h-4" />
              <p className="semibold" style={{ color: "var(--element-subtle)" }}>
                Height
              </p>
            </div>
            <TextInput
              value={moreDetails.height}
              placeholder="None"
              onChange={(e) => handleTextInputChange("height", e.target.value)}
            />
          </div>
          <div>
            <div className="flex flex-row gap-1 pb-1 items-center">
              <Icon iconName="religion" className="h-4" />
              <p className="semibold" style={{ color: "var(--element-subtle)" }}>
                Religion
              </p>
            </div>
            <TextInput
              value={moreDetails.religion}
              placeholder="None"
              onChange={(e) => handleTextInputChange("religion", e.target.value)}
            />
          </div>
          <div>
            <div className="flex flex-row gap-1 pb-1 items-center">
              <Icon iconName="smokes" className="h-4" />
              <p className="semibold" style={{ color: "var(--element-subtle)" }}>
                Smoking
              </p>
            </div>
            <select
              id="smoking"
              name="smoking"
              value={moreDetails.smoking}
              onChange={(e) => handleRadioInputChange("smoking", e.target.value)}
              className="w-full p-3 text-body rounded border border-border flex-row justify-start items-center inline-flex semibold font-['Arboria']"
            >
              <option value="">None</option>
              <option value="Smokes">Smokes</option>
              <option value="Doesn't smoke">Doesn&apos;t smoke</option>
              <option value="Sometimes smokes">Sometimes Smokes</option>
            </select>
          </div>

          <div>
            <div className="flex flex-row gap-1 pb-1 items-center">
              <Icon iconName="drinking" className="h-4" />
              <p className="semibold" style={{ color: "var(--element-subtle)" }}>
                Drinking
              </p>
            </div>

            <select
              id="drinking"
              name="drinking"
              value={moreDetails.drinking}
              onChange={(e) => handleRadioInputChange("drinking", e.target.value)}
              className="w-full p-3 text-body rounded border border-border flex-row justify-start items-center inline-flex semibold font-['Arboria']"
            >
              <option value="">None</option>
              <option value="Drinks">Drinks</option>
              <option value="Doesn't dmoke">Doesn&apos;t drink</option>
              <option value="Sometimes drinks">Sometimes drinks</option>
            </select>
          </div>

          <div>
            <div className="flex flex-row gap-1 pb-1 items-center">
              <Icon iconName="mbti" className="h-4" />
              <p className="semibold" style={{ color: "var(--element-subtle)" }}>
                MBTI
              </p>
            </div>

            <TextInput
              value={moreDetails.mtbi}
              maxlength="4"
              placeholder="None"
              onChange={(e) => handleTextInputChange("mtbi", e.target.value)}
            />
          </div>

          <div>
            <div className="flex flex-row gap-1 pb-1 items-center">
              <Icon iconName="astrological" className="h-4" />
              <p className="semibold" style={{ color: "var(--element-subtle)" }}>
                Astrological sign
              </p>
            </div>
            <Checkbox
              label={"Show on profile"}
              value={moreDetails.astrologicalSign}
              onChange={(e) => handleTextInputChange("astrologicalSign", e.target.value)}
            />
          </div>

          <div className="mb-32">
            <div className="flex flex-row gap-1 pb-1 items-center">
              <Icon iconName="political" className="h-4" />
              <p className="semibold" style={{ color: "var(--element-subtle)" }}>
                Political affiliation
              </p>
            </div>

            <select
              id="politicalAffiliation"
              name="politicalAffiliation"
              value={moreDetails.politicalAffiliation}
              onChange={(e) => handleRadioInputChange("politicalAffiliation", e.target.value)}
              className="w-full p-3 text-body rounded border border-border flex-row justify-start items-center inline-flex semibold font-['Arboria']"
            >
              <option value="">None</option>
              <option value="Liberal">Liberal</option>
              <option value="Moderate">Moderate</option>
              <option value="Conservative">Conservative</option>
              <option value="Not political">Not political</option>
            </select>
          </div>
        </div>

        <div class="w-96 h-32 fixed bottom-0 bg-gradient-to-t from-white from-70% to-transparent"></div>
        <div className="fixed bottom-8 w-full z-50 " style={{ maxWidth: "372px" }}>
          <button className="w-full" id="details-continue" type="submit">
            <PrimaryButton active="true" label="Save changes"></PrimaryButton>
          </button>
        </div>
      </div>
    </form>
  );
};
