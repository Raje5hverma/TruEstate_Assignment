import express from "express";
import cors from "cors";
import salesRouter from "./routes/sales.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// allow frontend (5173) to call backend (3000)
app.use(cors());
app.use(express.json());

// simple test route
app.get("/", (req, res) => {
  res.send("API running");
});

// main sales API
app.use("/api/sales", salesRouter);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
