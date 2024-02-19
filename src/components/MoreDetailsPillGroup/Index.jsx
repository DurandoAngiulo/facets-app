import React from "react";

const MoreDetailsPillGroup = ({ moreDetails }) => {
  if (!moreDetails) return;
  return (
    <div>
      {Object.entries(moreDetails).map(
        ([key, value]) =>
          // Check if the value is not empty before rendering
          value && (
            <p key={key}>
              <strong>{key}:</strong> {value}
            </p>
          )
      )}
    </div>
  );
};

export default MoreDetailsPillGroup;
