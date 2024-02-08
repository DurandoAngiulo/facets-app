// Checkbox.jsx
import React from "react";
import "./styles.css";

const Checkbox = ({ label, value, checked, onChange, name }) => {
  return (
    <div>
      <label className=" w-full p-3 rounded border flex-row justify-start items-center inline-flex semibold font-['Arboria']">
        <input className="mr-2" type="checkbox" name={name} value={value} checked={checked} onChange={onChange} />
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
