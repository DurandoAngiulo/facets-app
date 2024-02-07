// Checkbox.jsx
import React from "react";

const Checkbox = ({ label, value, checked, onChange, name }) => {
  return (
    <div>
      <div
        className="w-full p-3 rounded border flex-col justify-center items-start gap-2.5 inline-flex"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="justify-start items-center gap-2.5 inline-flex">
          <label className="mr-2 semibold font-['Arboria']" style={{ color: "var(--text)" }}>
            <input
              className="mr-2"
              type="checkbox"
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

export default Checkbox;
