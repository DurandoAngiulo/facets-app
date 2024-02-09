// RadioInputGroup.js
import React from "react";
import RadioInput from "@/components/Inputs/RadioInput/Index";
const RadioInputGroup = ({ radioInputs }) => {
  return (
    <div>
      {radioInputs.map((radio, index) => (
        <RadioInput
          key={index}
          name={radio.name}
          label={radio.label}
          value={radio.value}
          checked={radio.checked}
          onChange={radio.onChange}
        />
      ))}
    </div>
  );
};

export default RadioInputGroup;
