"use client";
import React from "react";
import { useNavigate } from "react-router-dom";

function BackButton() {
  let navigate = useNavigate();

  function handleClick() {
    navigate(-1); // This will also take the user to the previous page
  }

  return (
    <button type="button" onClick={handleClick}>
      Go Back
    </button>
  );
}

export default BackButton;
