router.get("/", async (req, res) => {
  try {
    const equipmentData = await PlaygroundEquipment.find({}).lean();
    const nameData = await PlaygroundName.find({}).lean();
    const surfaceData = await PlaygroundSurface.find({}).lean();

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
