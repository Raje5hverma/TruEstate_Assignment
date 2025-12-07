import React from "react";

export default function SortBar({ value, onChange }) {
  return (
    <select
      className="sort-select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Sort by</option>
      <option value="name">Customer Name (A–Z)</option>
      <option value="date">Date (Newest First)</option>
      <option value="quantity">Quantity</option>
    </select>
  );
}
