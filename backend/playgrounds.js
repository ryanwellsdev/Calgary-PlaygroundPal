import mongoose, { Schema } from "mongoose";

// Use connection string from environment variable
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/PlaygroundPal";

try {
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB connected.");
} catch (error) {
  console.error("MongoDB connection error:", error);
}

const PlaygroundSchema = new Schema({
  SITE_NAME: String,
  ASSET_CD: String,
});

const EquipmentSchema = new Schema({
  TYPE_DESCRIPTION: String,
  ASSET_CD: String,
});

const Equipment = mongoose.model("Equipment", EquipmentSchema, "Equipments");
const Playground = mongoose.model(
  "PlaygroundName",
  PlaygroundSchema,
  "PlaygroundNames"
);

// Exported query function
export async function getEquipmentByPlayground(assetCd) {
  return await Equipment.find({ ASSET_CD: assetCd });
}
