// RadioInput.js
import React from "react";
import "./styles.css";

const RadioInput = ({ label, value, checked, onChange, name }) => {
  return (
    <div>
      <div
        className="w-full p-3 rounded border flex-col justify-center items-start gap-2.5 inline-flex"
        style={{ borderColor: checked ? "var(--brand)" : "var(--border)" }}
      >
        <div className="justify-start items-center gap-2.5 inline-flex">
          <label className="mr-2 semibold font-['Arboria']" style={{ color: checked ? "var(--brand)" : "var(--text)" }}>
            <input
              className="mr-2"
              type="radio"
              name={name}
              value={value}
              checked={checked}
              onChange={onChange}
              style={{ color: "var(--text)" }}
            />
            {label}
          </label>
        </div>
      </div>
    </div>
  );
};

export default RadioInput;
