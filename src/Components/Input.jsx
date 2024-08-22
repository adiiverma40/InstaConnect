
import React, { forwardRef } from "react";
import { nanoid } from "@reduxjs/toolkit";

const Input = forwardRef(function Input(
  {
    label,
    placeholder,
    type = "text",
    divClass = "flex flex-col",
    value,
    onChange, // Ensure onChange is included
    ...props
  },
  ref
) {
  const id = nanoid();

  return (
    <div className={`mb-4 ${divClass} w-3/4`}>
      {label && (
        <label className="mb-2 font-bold text-gray-700" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        type={type}
        value={value}
        onChange={onChange} // Ensure onChange is handled
        placeholder={placeholder}
        className="hover:cursor-pointer px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        style={{ width: "100%" }}
        {...props}
      />
    </div>
  );
});

export default Input;
