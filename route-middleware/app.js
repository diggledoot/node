//Imports
const express = require('express')
const middleware = require('./middleware/middleware')

//Initialize express app
const app = express()
const port = process.env.PORT || 3000

// Dummy users
let users = [
    { id: 0, name: 'tj', email: 'tj@vision-media.ca', role: 'member' }
    , { id: 1, name: 'ciaran', email: 'ciaranj@gmail.com', role: 'member' }
    , { id: 2, name: 'aaron', email: 'aaron.heckmann+github@gmail.com', role: 'admin' }
];

//Initialize authenticated user for demo
app.use((req, res, next) => {
    req.authenticatedUser = users[2]
    next()
})

app.get('/', (req, res) => {
    res.redirect('/user/0')
})

app.get('/user/:id', middleware.loadUser(users), (req, res) => {
    res.send(`Viewing user ${req.user.name}`)
})

app.get('/user/:id/edit', middleware.loadUser(users), middleware.andRestrictToSelf, (req, res) => {
    res.send(`Editing user ${req.user.name}`)
})

app.delete('/user/:id', middleware.loadUser(users), middleware.andRestrictTo('admin'), (req, res) => {
    res.send(`Delete user ${req.user.name}`)
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
