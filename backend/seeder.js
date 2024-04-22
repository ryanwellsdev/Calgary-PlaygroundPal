import mongoose from "mongoose";
import dotenv from "dotenv";
import playgroundName from "./models/PlaygroundName.js";
import playgroundEquipment from "./models/PlaygroundEquipments.js";
import playgroundSurface from "./models/PlaygroundSurface.js";
import PlaygroundNames from "./data/PlaygroundNames.js";
import PlaygroundSurfaces from "./data/PlaygroundSurfaces.js";
import PlaygroundPalEquipments from "./data/PlaygroundPalEquipments.js";
import PlaygroundPalSurface from "./data/PlaygroundPalSurface.js";
import { connectDB } from "./config/db.js";
import wellknown from "wellknown";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await playgroundName.deleteMany();
    await playgroundEquipment.deleteMany();
    await playgroundSurface.deleteMany();

    const samplePlaygroundsEquipment = PlaygroundPalEquipments.map(
      (equipment) => ({ ...equipment })
    );
    await playgroundEquipment.insertMany(samplePlaygroundsEquipment);

    const samplePlaygroundsSurface = PlaygroundSurfaces.map((surface) => {
      const geoJSON = wellknown.parse(surface.the_geom);
      return { ...surface, the_geom: geoJSON };
    });
    await playgroundSurface.insertMany(samplePlaygroundsSurface);

    const samplePlaygroundsName = PlaygroundNames.map((name) => ({ ...name }));
    await playgroundName.insertMany(samplePlaygroundsName);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await playgroundName.deleteMany();
    await playgroundEquipment.deleteMany();
    await playgroundSurface.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
