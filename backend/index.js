import express from "express";
import cors from "cors";
import { getEquipmentByPlayground } from "./playgrounds.js";

const app = express();

// Enable CORS so frontend (e.g. on Netlify) can make requests
app.use(cors());

// Optional: Middleware to log all requests
app.all("*", (req, res, next) => {
  console.log("Path:", req.path);
  next();
});

// Example dynamic route
app.get("/api/:id", (req, res) => {
  const id = req.params.id;
  res.send(`API route for ID: ${id}`);
});

// Equipment API route
app.get("/api/equipment/:id", async (req, res) => {
  const id = req.params.id;
  console.log("Equipment ID:", id);

  try {
    const equipment = await getEquipmentByPlayground(id);
    res.json(equipment);
  } catch (error) {
    console.error("Error fetching equipment:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Use dynamic port for hosting, fallback to 3000 locally
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
