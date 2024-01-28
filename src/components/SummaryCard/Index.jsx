import React from "react";
import { calculateAge } from "@/utils/util-functions.js";

const SummaryCard = ({ name, pronouns, birthday, occupation, location }) => {
  const age = calculateAge(birthday);
  return (
    <div>
      {name}, {pronouns}, {age}, {occupation}, {location}
    </div>
  );
};

export default SummaryCard;
