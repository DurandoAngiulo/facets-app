import React from "react";

const TextInput = ({ label, value, placeholder, onChange }) => {
  return (
    <div>
      <div
        className="w-full p-3 rounded border flex-col justify-center items-start gap-2.5 inline-flex"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="justify-start items-center gap-2.5 inline-flex">
          <label className="mr-2 semibold font-['Arboria']" style={{ color: "var(--text)" }}>
            <input
              type="text"
              value={value}
              placeholder={placeholder}
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

export default TextInput;
