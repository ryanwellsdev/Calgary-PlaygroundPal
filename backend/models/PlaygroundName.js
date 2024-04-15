import mongoose from "mongoose";

const playgroundNameSchema = new mongoose.Schema({
  ASSET_CD: { type: String, unique: true },
  SITE_NAME: String,
  COMMUNITY_NAME: String,
});
const PlaygroundName = mongoose.model("PlaygroundName", playgroundNameSchema);

export default PlaygroundName;
