import React, { useState, useRef, useEffect } from "react";

const MoreOptions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const boxRef = useRef(null);

  // Toggle the visibility of the pop-up box
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  // Close pop-up if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [boxRef]);

  return (
    <div className="relative inline-block text-left">
      {/* More Options Button */}
      <button
        onClick={togglePopup}
        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full focus:outline-none"
      >
        <svg
          className="w-6 h-6 text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 6h.01"
          />
        </svg>
      </button>

      {/* Pop-up Box */}
      {isOpen && (
        <div
          ref={boxRef}
          className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-10"
        >
          <ul className="py-1">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Option 1
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Option 2
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Option 3
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MoreOptions;
