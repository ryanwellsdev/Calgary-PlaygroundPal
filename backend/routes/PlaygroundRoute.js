import express from "express";
const router = express.Router();

import PlaygroundSurface from "../models/PlaygroundSurface.js";
import PlaygroundEquipment from "../models/PlaygroundEquipments.js";
import PlaygroundName from "../models/PlaygroundName.js";

router.get("/:assetCd", async (req, res) => {
  try {
    const { assetCd } = req.params;
    const surfaceData = await PlaygroundSurface.findOne({ ASSET_CD: assetCd });
    const equipmentData = await PlaygroundEquipment.findOne({
      ASSET_CD: assetCd,
    });
    const nameData = await PlaygroundName.findOne({ ASSET_CD: assetCd });

    const playgroundData = {
      surface: surfaceData,
      equipment: equipmentData,
      name: nameData,
    };

    res.json(playgroundData);
  } catch (error) {
    console.error("Error fetching playground data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const allPlaygrounds = await PlaygroundEquipment.aggregate([
      {
        $lookup: {
          from: "playgroundnames",
          localField: "ASSET_CD",
          foreignField: "ASSET_CD",
          as: "name",
        },
      },
      {
        $lookup: {
          from: "playgroundsurfaces",
          localField: "ASSET_CD",
          foreignField: "ASSET_CD",
          as: "surface",
        },
      },
      {
        $unwind: { path: "$name", preserveNullAndEmptyArrays: true },
      },
      {
        $unwind: { path: "$surface", preserveNullAndEmptyArrays: true },
      },
    ]);

    res.json(allPlaygrounds);
  } catch (error) {
    console.error("Error aggregating playgrounds:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
