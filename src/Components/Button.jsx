import React from "react";

function Button({
  children,
  type = "Button",
  className = "",
  onClick,
  ...props
}) {
  return (
    <button
      className={`rounded-lg w-3/4 p-2 bg-blue-700 text-center text-white ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
