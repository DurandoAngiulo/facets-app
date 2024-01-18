"user client";
import { useEffect, useState } from "react";

export const EnterMoreDetails = ({ handleUpdateProfile }) => {
  const [sexuality, setSexuality] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [school, setSchool] = useState("");
  const [hometown, setHometown] = useState("");
  const [smoking, setSmoking] = useState("");
  const [drinking, setDrinking] = useState("");
  const [mbti, setMBTI] = useState("");
  const [astrologicalSign, setAstrologicalSign] = useState("");
  const [height, setHeight] = useState("");
  const [religion, setReligion] = useState("");
  const [politicalAffiliation, setPoliticalAffiliation] = useState("");

  const [error, setError] = useState(null);
  const handleRadioChange = (event, prompt) => {
    if (prompt === "smoking") {
      setSmoking(event.target.value);
    }
    if (prompt === "politics") {
      setPoliticalAffiliation(event.target.value);
    } else {
      setDrinking(event.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateProfile({
      moreDetails: { sexuality: sexuality },
      onboardingStep: 14
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="">
        {/* Jobtitle */}
        <label>
          Job Title
          <input
            type="text"
            className="text-black border-solid border-2 border-red-500"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </label>
        {/* School */}
        <label>
          School
          <input
            type="text"
            className="text-black border-solid border-2 border-red-500"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
          />
        </label>
        {/* Hometown */}
        <label>
          Hometown
          <input
            type="text"
            className="text-black border-solid border-2 border-red-500"
            value={hometown}
            onChange={(e) => setHometown(e.target.value)}
          />
        </label>
        {/*Sexuality*/}
        <label>
          Sexuality
          <input
            type="text"
            className="text-black border-solid border-2 border-red-500"
            value={sexuality}
            onChange={(e) => setSexuality(e.target.value)}
          />
        </label>
        {/* smoking */}
        <div>
          <label>
            <input
              type="radio"
              name="smoking"
              value="smoker"
              checked={smoking === "smoker"}
              onChange={handleRadioChange(e, "smoking")}
            />
            Smoker
          </label>
          <label>
            <input
              type="radio"
              name="smoking"
              value="nonsmoker"
              checked={smoking === "nonsmoker"}
              onChange={handleRadioChange(e, "smoking")}
            />
            NonSmoker
          </label>
        </div>
        {/* Drinking*/}
        <div>
          <label>
            <input
              type="radio"
              name="drinking"
              value="socialDrinker"
              checked={drinking === "socialDrinker"}
              onChange={handleRadioChange(e, "drinking")}
            />
            social drinker
          </label>
          <label>
            <input
              type="radio"
              name="drinking"
              value="nondrinker"
              checked={drinking === "nondrinker"}
              onChange={handleRadioChange(e, "drinking")}
            />
            doesnt drink
          </label>
          <label>
            <input
              type="radio"
              name="drinking"
              value="drinker"
              checked={drinking === "drinker"}
              onChange={handleRadioChange(e, "drinking")}
            />
            drinks
          </label>
        </div>
        {/* MBTI */}
        <label>
          MBTI
          <input
            type="text"
            className="text-black border-solid border-2 border-red-500"
            value={mbti}
            onChange={(e) => setMBTI(e.target.value)}
          />
        </label>
        <label>
          Astrological Sign
          <input
            type="text"
            className="text-black border-solid border-2 border-red-500"
            value={astrologicalSign}
            onChange={(e) => setAstrologicalSign(e.target.value)}
          />
          {/* TODO: make function to determine astro sign for this with toggle */}
        </label>
        <label>
          Height
          <input
            type="text"
            className="text-black border-solid border-2 border-red-500"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
          {/* TODO: scroll selection */}
        </label>
        <label>
          Religion
          <input
            type="text"
            className="text-black border-solid border-2 border-red-500"
            value={religion}
            onChange={(e) => setReligion(e.target.value)}
          />
        </label>
        {/* politics*/}
        <div>
          <label>
            <input
              type="radio"
              name="politics"
              value="liberal"
              checked={politics === "liberal"}
              onChange={handleRadioChange(e, "politics")}
            />
            Liberal
          </label>
          <label>
            <input
              type="radio"
              name="politics"
              value="moderate"
              checked={politics === "moderate"}
              onChange={handleRadioChange(e, "politics")}
            />
            Moderate
          </label>
          <label>
            <input
              type="radio"
              name="politics"
              value="conservative"
              checked={politics === "conservative"}
              onChange={handleRadioChange(e, "politics")}
            />
            Conservative
          </label>
          <label>
            <input
              type="radio"
              name="politics"
              value="nonPolitical"
              checked={politics === "nonPolitical"}
              onChange={handleRadioChange(e, "politics")}
            />
            Not Political
          </label>
          <label>
            <input
              type="radio"
              name="politics"
              value="other"
              checked={politics === "other"}
              onChange={handleRadioChange(e, "politics")}
            />
            Other
          </label>
        </div>
        <button id="details-continue" type="submit">
          Continue
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </form>
  );
};
