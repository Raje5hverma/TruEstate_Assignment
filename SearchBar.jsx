import React from "react";

export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Name, Phone no."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="search-input"
    />
  );
}
