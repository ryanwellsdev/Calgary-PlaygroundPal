import express from "express"

const app = express()

app.get("/api/:id", (req, res ) => {res.send(`api, route ${id}`)})

app.listen(3000, () =>console.log("listening on port 3000"))