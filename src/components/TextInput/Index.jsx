import React from "react";

const TextInput = ({ label, value, onChange }) => {
  return (
    <label>
      {label}
      <input
        type="text"
        className="text-black border-solid border-2 border-red-500"
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

export default TextInput;
