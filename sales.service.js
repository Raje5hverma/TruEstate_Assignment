import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, "..", "data", "salesData.json");

const salesData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

function matchesMultiSelect(value, list) {
  if (!list.length) return true;
  if (!value) return false;
  return list.includes(String(value));
}

function matchesTags(rowTagsStr, filterTags) {
  if (!filterTags.length) return true;

  const rowTags = (rowTagsStr || "")
    .toLowerCase()
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  if (!rowTags.length) return false;
  return filterTags.every((t) => rowTags.includes(t));
}

function inDateRange(dateStr, from, to) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return false;

  if (from && d < new Date(from)) return false;
  if (to && d > new Date(to)) return false;
  return true;
}

function filterRow(row, q) {
  const name = (row.customerName || "").toLowerCase();
  const phone = (row.phoneNumber || "").toLowerCase();

  if (q.search) {
    if (!name.includes(q.search) && !phone.includes(q.search)) return false;
  }

  if (!matchesMultiSelect(row.customerRegion, q.regions)) return false;
  if (!matchesMultiSelect(row.gender, q.genders)) return false;
  if (!matchesMultiSelect(row.productCategory, q.categories)) return false;
  if (!matchesMultiSelect(row.paymentMethod, q.payments)) return false;

  if (!matchesTags(row.tags, q.tags)) return false;

  const age = Number(row.age);
  if (q.ageMin !== null && age < q.ageMin) return false;
  if (q.ageMax !== null && age > q.ageMax) return false;

  if (!inDateRange(row.date, q.dateFrom, q.dateTo)) return false;

  return true;
}

function sortRows(rows, sortBy) {
  if (!sortBy) return rows;
  const arr = [...rows];

  if (sortBy === "date") {
    arr.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (sortBy === "quantity") {
    arr.sort(
      (a, b) => Number(b.quantity || 0) - Number(a.quantity || 0)
    );
  } else if (sortBy === "name") {
    arr.sort((a, b) =>
      (a.customerName || "").localeCompare(b.customerName || "")
    );
  }

  return arr;
}

export function getSales(q) {
  const filtered = salesData.filter((row) => filterRow(row, q));
  const sorted = sortRows(filtered, q.sortBy);

  const total = sorted.length;
  const page = q.page < 1 ? 1 : q.page;
  const limit = q.limit || 10;
  const start = (page - 1) * limit;
  const end = start + limit;

  const items = sorted.slice(start, end);
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return { items, total, page, limit, totalPages };
}
