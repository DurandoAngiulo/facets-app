import React from "react";
import { calculateAge } from "@/utils/util-functions.js";
import Link from "next/link";
import { PrimaryButton } from "@/components/Button/Index";

const SummaryCard = ({ profileId, name, pronouns, birthday, occupation, location, facetPrompt, facetResponse }) => {
  const age = calculateAge(birthday);
  return (
    <div>
      <h3 style={{ color: "var(--brand)" }}>{name}</h3>
      <p style={{ color: "var(--text)" }}>{pronouns}</p>
      <p style={{ color: "var(--text)" }}>{age}</p>
      <p style={{ color: "var(--text)" }}>{occupation}</p>
      <p style={{ color: "var(--text)" }}>{location}</p>
      <p style={{ color: "var(--text)" }}>{facetPrompt}</p>
      <p style={{ color: "var(--text)" }}>{facetResponse}</p>
      <Link href={`/dashboard/profile/${profileId}`}>
        <PrimaryButton label="View full Facet" active="true" />
      </Link>
    </div>
  );
};

export default SummaryCard;
