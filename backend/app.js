require("dotenv").config()

//Imports
const express = require("express")
const logger = require("./utils/logger")
const db = require("./utils/database") //insert logger and db as dependency
const bodyParser = require('body-parser');

//Create user table TODO: Refactor these create scripts into a separate file
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

//parse forms
app.use(bodyParser.urlencoded({ extended: false }))

//parse json
app.use(bodyParser.json())

//Endpoints

//Create user
app.post('/user', (req, res) => {
    let body = req.body

    let name = body.name
    let age = body.age

    db.run(`INSERT INTO users (name,age) VALUES ('${name}',${age})`, (err) => {
        if (err) {
            logger.error(`${err}`)
            res.status(500).send(`Error creating new user! Error message : ${err}`)
        }

        res.send(`Successfully created new user!`)
    })
})

//Retrieve users
app.get('/users', (req, res) => {
    db.all(`SELECT * FROM users`, (err, row) => {
        if (err) {
            logger.error(`${err}`)
            res.status(500).send(err)
        }

        if (row.length <= 0) {
            res.send(`No records at all!`)
        }

        res.json(row)
    })
})

//Retrieve user by id
app.get('/user/:id', (req, res) => {
    let id = req.params.id

    db.get(`SELECT * FROM users where id = ${id}`, (err, row) => {
        if (err) {
            logger.error(`${err}`)
            res.status(500).send(err)
        }

        if (row.length <= 0) {
            res.send(`Record of id ${id} is not found!`)
        }

        if (row) {
            res.json(row)
        }

    })
})

//Update user by id
app.put('/user/:id', (req, res) => {

    let body = req.body
    let params = req.params

    let id = params.id
    let name = body.name
    let age = body.age

    db.run(`UPDATE users SET name = ?, age = ? WHERE id = ?`, [name, age, id], (err) => {
        if (err) {
            logger.error(`Error updating record with id ${id}`, `${err}`)
            res.status(500).send(`Error updating record with id ${id}`)
        }

        res.send(`Record updated!`)
    })
})

//Delete user by id
app.delete('/user/:id', (req, res) => {
    let params = req.params

    let id = params.id

    db.run(`DELETE FROM users WHERE id = ?`, [id], (err) => {
        if (err) {
            logger.error(`${err}`)
            res.status(500).send(`Error deleting record: ${err}`)
        }

        res.send(`Successfully deleted record!`)
    })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}~`)
})
