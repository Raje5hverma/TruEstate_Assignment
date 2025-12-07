import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export async function fetchSales(params = {}) {
  const res = await api.get("/sales", { params });
  return res.data; // { items, total, page, limit, totalPages }
}
