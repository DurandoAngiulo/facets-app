// DatePicker.js
import React from "react";
import "./styles.css";

const DatePicker = ({ label, value, checked, onChange, name }) => {
  return (
    <div>
      <label className=" w-full p-3 rounded border flex-row justify-start items-center inline-flex font-medium font-['Arboria']">
        <input className="mr-2" type="date" name={name} value={value} onChange={onChange} />
        {label}
      </label>
    </div>
  );
};

export default DatePicker;
