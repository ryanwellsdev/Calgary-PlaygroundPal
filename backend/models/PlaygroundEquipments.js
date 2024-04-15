import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema({
  MAINT_INFO: String,
  TYPE_DESCRIPTION: String,
  MINORTYPE: String,
  EQUIPMENT_AGE_CLASS: String,
  POINT: String,
});

const playgroundSchema = new mongoose.Schema({
  ASSET_CD: { type: String, unique: true },
  equipment: [equipmentSchema],
});

const Playground = mongoose.model("PlaygroundEquipment", playgroundSchema);
export default Playground;
