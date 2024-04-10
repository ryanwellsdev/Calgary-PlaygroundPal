import express from "express"
import { getEquipmentByPlayground } from "./playgrounds.js";

const app = express()

app.all("*", (req, res, next) => {
    console.log("path is", req.path);
    next();
});

app.get("/api/:id", (req, res ) => {res.send(`api, route ${id}`)})

app.get("/api/equipment/:id", async (req, res ) => {
    const id= req.params.id
    console.log(id)
    const equipment = await getEquipmentByPlayground(id) 
    res.send(equipment)
})

app.listen(3000, () =>console.log("listening on port 3000"))