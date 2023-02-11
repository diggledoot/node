const express = require("express")
const app = express()
const port = 3000

app.get("/", (req, res) => {
    res.send("hello money!")
})

app.listen(port, () => {
    console.log("Example app is running!")
})
