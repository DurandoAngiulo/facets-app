// RadioInput.js
import React from "react";

const RadioInput = ({ label, value, checked, onChange, name }) => {
  return (
    <label>
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} />
      {label}
    </label>
  );
};

export default RadioInput;
