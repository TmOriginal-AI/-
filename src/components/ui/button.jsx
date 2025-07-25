// src/components/ui/button.jsx
import React from "react";

export function Button({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white transition-all ${className}`}
    >
      {children}
    </button>
  );
}
