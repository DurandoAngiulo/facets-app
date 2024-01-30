import React from "react";
import { calculateAge } from "@/utils/util-functions.js";
import Link from "next/link";

const SummaryCard = ({ profileId, name, pronouns, birthday, occupation, location }) => {
  const age = calculateAge(birthday);
  return (
    <div>
      {name}, {pronouns}, {age}, {occupation}, {location},
      <Link href={`/dashboard/profile/${profileId}`}>click my profile</Link>
    </div>
  );
};

export default SummaryCard;
