import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import PlaygroundRoute from "./routes/PlaygroundRoute.js";
import cors from "cors";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.get("/api", (req, res) => {
  res.json({
    message: "Hello World, this is the playground",
  });
});

app.use("/api/playground", PlaygroundRoute);

const Port = process.env.Port || 8000;
app.listen(Port, () => console.log(`listening on port : ${Port}`));
