import React from "react";
import "./styles.css";

const TextInput = ({ label, value, placeholder, onChange, maxlength }) => {
  return (
    <div>
      <label
        className=" w-full p-3 rounded border flex-row justify-start items-center inline-flex font-medium font-['Arboria']"
        style={{ color: "var(--text)", borderColor: "var(--border" }}
      >
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          maxlength={maxlength}
          onChange={onChange}
          style={{ color: "var(--text)", backgroundColor: "transparent" }}
        />
        {label}
      </label>
    </div>
  );
};

export default TextInput;
