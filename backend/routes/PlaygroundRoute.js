router.get("/", async (req, res) => {
  try {
    const equipmentData = await PlaygroundEquipment.find({}).lean();
    const nameData = await PlaygroundName.find({}).lean();
    const surfaceData = await PlaygroundSurface.find({}).lean();

    if (!equipmentData.length) {
      return res.status(404).json({ error: "No equipment data found" });
    }

    const allPlaygrounds = equipmentData.map((equipment) => {
      const assetCd = equipment.ASSET_CD;

      const name = nameData.find((n) => n.ASSET_CD === assetCd) || {};
      const surface = surfaceData.find((s) => s.ASSET_CD === assetCd) || {};

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
