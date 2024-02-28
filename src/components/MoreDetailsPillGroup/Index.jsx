import React from "react";
import { PillContainer } from "@/components/PillContainer/Index";

const MoreDetailsPillGroup = ({ moreDetails }) => {
  if (!moreDetails) return;

  const filteredDetails = Object.entries(moreDetails)
    .filter(([key]) => key !== "bio") // Filtering out the 'bio' property
    .reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});

  return (
    <div className="py-2 ">
      {Object.entries(filteredDetails).map(
        ([key, value]) =>
          // Check if the value is not empty before rendering
          value && (
            <PillContainer key={key}>{value}</PillContainer>
            // <p key={key}>
            //   <strong>{key}:</strong> {value}
            // </p>
          )
      )}
    </div>
  );
};

export default MoreDetailsPillGroup;
