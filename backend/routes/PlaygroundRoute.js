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
    const equipmentData = await PlaygroundEquipment.find({});

    const nameData = await PlaygroundName.find({});

    const surfaceData = await PlaygroundSurface.find({});

    const allPlaygrounds = equipmentData.map((equipment) => {
      const assetCd = equipment.ASSET_CD;
      const name = nameData.find((name) => name.ASSET_CD === assetCd);
      const surface = surfaceData.find(
        (surface) => surface.ASSET_CD === assetCd
      );

      return {
        ASSET_CD: assetCd,
        equipment,
        name,
        surface,
      };
    });

    res.json(allPlaygrounds);
  } catch (error) {
    console.error("Error fetching all playgrounds:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/paginated", async (req, res) => {
  try {
    let { page, limit } = req.query;
    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 10;
    const skip = (page - 1) * limit;

    const equipmentData = await PlaygroundEquipment.find({})
      .skip(skip)
      .limit(limit);

    const playgrounds = await Promise.all(
      equipmentData.map(async (equipment) => {
        const assetCd = equipment.ASSET_CD;
        const nameData = await PlaygroundName.findOne({ ASSET_CD: assetCd });
        const surfaceData = await PlaygroundSurface.findOne({
          ASSET_CD: assetCd,
        });

        return {
          ASSET_CD: assetCd,
          equipment,
          name: nameData,
          surface: surfaceData,
        };
      })
    );

    const totalCount = await PlaygroundEquipment.countDocuments({});
    const totalPages = Math.ceil(totalCount / limit);

    res.json({
      playgrounds,
      currentPage: page,
      totalPages,
      totalCount,
      limit,
    });
  } catch (error) {
    console.error("Error fetching paginated playgrounds:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
