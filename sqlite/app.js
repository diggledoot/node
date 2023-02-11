const database = require("./utils/database")

database.serialize(() => {
    // create the table
    database.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age INTEGER NOT NULL
    )`);

    // insert data
    database.run(`INSERT INTO users (name, age) VALUES ('John Doe', 25), ('Jane Doe', 30)`);

    // query the data
    database.all(`SELECT * FROM users`, (err, rows) => {
        if (err) throw err;
        console.log(rows);
    });
});



// Close the database
// database.close((err) => {
//     if (err) {
//         return console.error(err.message);
//     }
//     console.log('Close the database connection.');
// });
