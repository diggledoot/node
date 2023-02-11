require("dotenv").config()

const sqlite3 = require('sqlite3').verbose()
const logger = require("./logger")
const path = require("path")
const fs = require("fs")

const databasePath = path.join(__dirname, "..", process.env.DB_NAME || "test.db")

if (!fs.existsSync(databasePath)) {
    fs.open(databasePath, 'w', (err, fd) => {
        if (err) throw err;
        fs.close(fd, (err) => {
            if (err) throw err;
            logger.info(`The database has been created~`)
        });
    });
}

const database = new sqlite3.Database(databasePath, (err) => {
    if (err) {
        console.error(err.message)
    } else {
        logger.info('Connected to the in memory SQlite database.')
    }
})

module.exports = database
