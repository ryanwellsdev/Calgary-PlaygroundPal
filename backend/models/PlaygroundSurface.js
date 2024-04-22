import mongoose from "mongoose";

const Schema = mongoose.Schema;

const GeoSchema = new Schema({
  type: {
    type: String,
    enum: ["MultiPolygon"],
    required: true,
  },
  coordinates: {
    type: [[[[Number]]]],
    required: true,
  },
});

const PlaygroundSurfaceSchema = new Schema({
  ASSET_CD: { type: String, unique: true, required: true },
  the_geom: {
    type: GeoSchema,
    required: true,
  },
});

PlaygroundSurfaceSchema.index({ the_geom: "2dsphere" });

const PlaygroundSurface = mongoose.model(
  "PlaygroundSurface",
  PlaygroundSurfaceSchema
);

export default PlaygroundSurface;
