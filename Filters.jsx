import React from "react";

function toggle(list, value) {
  return list.includes(value)
    ? list.filter((v) => v !== value)
    : [...list, value];
}

export default function Filters({ filters, onChange }) {
  const update = (patch) => onChange({ ...filters, ...patch });
  const handleMulti = (field, value) =>
    update({ [field]: toggle(filters[field], value) });

  return (
    <div className="filters">
      <div className="filter-group">
        <label>Customer Region</label>
        {["North", "South", "East", "West"].map((r) => (
          <label key={r} className="checkbox-label">
            <input
              type="checkbox"
              checked={filters.regions.includes(r)}
              onChange={() => handleMulti("regions", r)}
            />
            {r}
          </label>
        ))}
      </div>

      <div className="filter-group">
        <label>Gender</label>
        {["Male", "Female"].map((g) => (
          <label key={g} className="checkbox-label">
            <input
              type="checkbox"
              checked={filters.genders.includes(g)}
              onChange={() => handleMulti("genders", g)}
            />
            {g}
          </label>
        ))}
      </div>

      <div className="filter-group">
        <label>Age Range</label>
        <div className="range-inputs">
          <input
            type="number"
            placeholder="Min"
            value={filters.ageMin}
            onChange={(e) => update({ ageMin: e.target.value })}
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.ageMax}
            onChange={(e) => update({ ageMax: e.target.value })}
          />
        </div>
      </div>

      <div className="filter-group">
        <label>Product Category</label>
        {["Clothing", "Electronics", "Beauty"].map((c) => (
          <label key={c} className="checkbox-label">
            <input
              type="checkbox"
              checked={filters.categories.includes(c)}
              onChange={() => handleMulti("categories", c)}
            />
            {c}
          </label>
        ))}
      </div>

      <div className="filter-group">
        <label>Tags</label>
        <input
          type="text"
          placeholder="fashion,casual"
          value={filters.tagsInput}
          onChange={(e) => update({ tagsInput: e.target.value })}
        />
      </div>

      <div className="filter-group">
        <label>Payment Method</label>
        {["Cash", "Card", "UPI", "Wallet", "Net Banking"].map((p) => (
          <label key={p} className="checkbox-label">
            <input
              type="checkbox"
              checked={filters.payments.includes(p)}
              onChange={() => handleMulti("payments", p)}
            />
            {p}
          </label>
        ))}
      </div>

      <div className="filter-group">
        <label>Date Range</label>
        <div className="range-inputs">
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => update({ dateFrom: e.target.value })}
          />
          <span>-</span>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => update({ dateTo: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
