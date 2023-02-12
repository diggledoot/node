require("dotenv").config()

const pino = require("pino")
const fs = require("fs")
const path = require("path")

//Create log folder if not exists
const log_dir = path.join(__dirname, "..", process.env.LOG_DIR || "logs")

if (!fs.existsSync(log_dir)) {
    fs.mkdirSync(log_dir)
}

//Create daily log file if not exists
const current_date = new Date()
const file_name = `${current_date.getFullYear()}-${(current_date.getMonth() + 1).toString().padStart(2, '0')}-${current_date.getDate().toString().padStart(2, '0')}.log`

const log_file = path.join(log_dir, file_name)

if (!fs.existsSync(log_file)) {
    fs.writeFileSync(log_file, "")
}

//Create stream object for logger to append data to
const stream = fs.createWriteStream(log_file, { flags: 'a' })

module.exports = pino({
    timestamp: () => `,"time":${new Date().toISOString()}`,
    level: process.env.LOG_LEVEL || "info",
    formatters: {
        level: (label, number) => {
            return { level: label }
        },
    }
}, stream)
