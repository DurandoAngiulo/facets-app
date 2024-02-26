import React from "react";
import { PillContainer } from "@/components/PillContainer";

const MoreDetailsPillGroup = ({ moreDetails }) => {
  if (!moreDetails) return;
  return (
    <div className="pb-8">
      {Object.entries(moreDetails).map(
        ([key, value]) =>
          // Check if the value is not empty before rendering
          value && (
            <PillContainer key={key}>
              {value}
            </PillContainer>
            // <p key={key}>
            //   <strong>{key}:</strong> {value}
            // </p>
          )
      )}
    </div>
  );
};

export default MoreDetailsPillGroup;
