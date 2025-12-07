import { useEffect, useState } from "react";
import { fetchSales } from "./services/api";
import "./styles.css";

const REGIONS = ["North", "South", "East", "West"];
const GENDERS = ["Male", "Female"];
const CATEGORIES = ["Clothing", "Electronics", "Beauty"];
const PAYMENTS = ["Cash", "Card", "UPI", "Wallet", "Net Banking"];

function App() {
  const [filters, setFilters] = useState({
    search: "",
    regions: [],
    genders: [],
    categories: [],
    payments: [],
    tags: "",
    ageMin: "",
    ageMax: "",
    dateFrom: "",
    dateTo: "",
    sortBy: "",
    limit: 100,   // ✅ IMPORTANT: show 100 rows
  });

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleInArray = (field, value) => {
    setFilters((prev) => {
      const list = prev[field];
      return {
        ...prev,
        [field]: list.includes(value)
          ? list.filter((v) => v !== value)
          : [...list, value],
      };
    });
  };

  const handleChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      regions: [],
      genders: [],
      categories: [],
      payments: [],
      tags: "",
      ageMin: "",
      ageMax: "",
      dateFrom: "",
      dateTo: "",
      sortBy: "",
      limit: 100,
    });
  };

  // ✅ LOAD ALL 100 RECORDS (NO FILTERS)
  const loadAllRecords = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchSales({ limit: 100 });
      setItems(data.items || []);
      setTotal(data.total || 0);
      clearFilters();
    } catch (err) {
      setError("Failed to load sales");
    } finally {
      setLoading(false);
    }
  };

  // ✅ APPLY FILTERS
  const applyFilters = async () => {
    try {
      setLoading(true);
      setError("");

      const params = {
        search: filters.search || undefined,
        regions: filters.regions,
        genders: filters.genders,
        categories: filters.categories,
        payments: filters.payments,
        tags: filters.tags || undefined,
        ageMin: filters.ageMin || undefined,
        ageMax: filters.ageMax || undefined,
        dateFrom: filters.dateFrom || undefined,
        dateTo: filters.dateTo || undefined,
        sortBy: filters.sortBy || undefined,
        limit: 100,
      };

      const data = await fetchSales(params);
      setItems(data.items || []);
      setTotal(data.total || 0);
    } catch (err) {
      setError("Failed to apply filters");
    } finally {
      setLoading(false);
    }
  };

  // ✅ LOAD ALL ON PAGE LOAD
  useEffect(() => {
    loadAllRecords();
  }, []);

  return (
    <div style={{ padding: "24px" }}>
      <h1>Sales Management System</h1>

      {/* FILTERS */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <div>
          <strong>Region</strong>
          {REGIONS.map((r) => (
            <div key={r}>
              <input
                type="checkbox"
                checked={filters.regions.includes(r)}
                onChange={() => toggleInArray("regions", r)}
              />{" "}
              {r}
            </div>
          ))}
        </div>

        <div>
          <strong>Gender</strong>
          {GENDERS.map((g) => (
            <div key={g}>
              <input
                type="checkbox"
                checked={filters.genders.includes(g)}
                onChange={() => toggleInArray("genders", g)}
              />{" "}
              {g}
            </div>
          ))}
        </div>

        <div>
          <strong>Category</strong>
          {CATEGORIES.map((c) => (
            <div key={c}>
              <input
                type="checkbox"
                checked={filters.categories.includes(c)}
                onChange={() => toggleInArray("categories", c)}
              />{" "}
              {c}
            </div>
          ))}
        </div>

        <div>
          <strong>Payment</strong>
          {PAYMENTS.map((p) => (
            <div key={p}>
              <input
                type="checkbox"
                checked={filters.payments.includes(p)}
                onChange={() => toggleInArray("payments", p)}
              />{" "}
              {p}
            </div>
          ))}
        </div>

        <div>
          <strong>Tags</strong>
          <input
            type="text"
            value={filters.tags}
            onChange={(e) => handleChange("tags", e.target.value)}
            placeholder="fashion,casual"
          />
        </div>

        <div>
          <strong>Age</strong>
          <input
            type="number"
            placeholder="Min"
            value={filters.ageMin}
            onChange={(e) => handleChange("ageMin", e.target.value)}
            style={{ width: "60px" }}
          />
          {" - "}
          <input
            type="number"
            placeholder="Max"
            value={filters.ageMax}
            onChange={(e) => handleChange("ageMax", e.target.value)}
            style={{ width: "60px" }}
          />
        </div>

        <div>
          <strong>Search</strong>
          <input
            type="text"
            placeholder="Name / Phone"
            value={filters.search}
            onChange={(e) => handleChange("search", e.target.value)}
          />
        </div>
      </div>

      {/* BUTTONS */}
      <div style={{ margin: "16px 0" }}>
        <button onClick={applyFilters}>Apply Filters</button>{" "}
        <button onClick={loadAllRecords}>Load all records</button>{" "}
        <span>Total records: {total}</span>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* TABLE */}
      {items.length > 0 && (
        <table border="1" cellPadding="6" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Transaction</th>
              <th>Date</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Region</th>
              <th>Category</th>
              <th>Tags</th>
              <th>Payment</th>
              <th>Final Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((row) => (
              <tr key={row.transactionId}>
                <td>{row.transactionId}</td>
                <td>{row.date}</td>
                <td>{row.customerName}</td>
                <td>{row.phoneNumber}</td>
                <td>{row.customerRegion}</td>
                <td>{row.productCategory}</td>
                <td>{row.tags}</td>
                <td>{row.paymentMethod}</td>
                <td>{row.finalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
