require("dotenv").config()

//Imports
const express = require("express")
const logger = require("./utils/logger")
const db = require("./utils/database") //insert logger and db as dependency

db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL
)`, (err) => {
    if (err) {
        console.log(`${err}`)
        process.exit(1)
    }
    logger.info("User table created")
});

//Initialize variables
const app = express()
const port = process.env.PORT || 3000

//Endpoints
app.get('/endpoint-check', (req, res) => {
    res.send("Endpoint pre-flight check green")
})

//Create user

//Retrieve user(s)

//Update user

//Delete user

app.listen(port, () => {
    console.log(`Server running on port ${port}~`)
})
