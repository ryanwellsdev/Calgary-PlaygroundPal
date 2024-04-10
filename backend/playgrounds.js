import mongoose, { Schema } from "mongoose"

await mongoose.connect('mongodb://localhost:27017/PlaygroundPal')

const PlaygroundSchema = new Schema({
    SITE_NAME: String,
    ASSET_CD: String
})

const EquipmentSchema = new Schema({
    TYPE_DESCRIPTION: String,
    ASSET_CD: String
})

const Equipment = mongoose.model("Equipment", EquipmentSchema, "Equipments")
const Playground = mongoose.model("PlaygroundName", PlaygroundSchema, "PlaygroundNames")

export async function getEquipmentByPlayground(assetCd){
    return await Equipment.find({ASSET_CD: assetCd})
}
// console.log(await getEquipmentByPlayground("FLN752"))