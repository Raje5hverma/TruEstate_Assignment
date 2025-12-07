import { parseQuery } from "../utils/parseQuery.js";
import { getSales } from "../services/sales.service.js";

export function getSalesHandler(req, res) {
  try {
    const query = parseQuery(req.query);
    const result = getSales(query);
    res.json(result);
  } catch (err) {
    console.error("Error in getSalesHandler:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}
