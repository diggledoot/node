require("dotenv").config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

/**
 * This is a simple route signature => app.METHOD(PATH, HANDLER)
 */

app.get('/get', (req, res) => {
    res.send('GET method called')
})

app.post('/post', (req, res) => {
    res.send('POST method called')
})

app.delete('/delete', (req, res) => {
    res.send('DELETE method called')
})


app.listen(port, () => {
    console.log("Server started!")
})
