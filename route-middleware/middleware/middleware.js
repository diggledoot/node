//Load user
function loadUser(users) {
    return (req, res, next) => {
        let user = users[req.params.id]
        if (user) {
            req.user = user
            next()
        } else {
            next(new Error(`Failed to load user` + req.params.id))
        }
    }
}

//Check if authenticated user is current user
function andRestrictToSelf(req, res, next) {
    if (req.authenticatedUser.id === req.user.id) {
        next()
    } else {
        next(new Error(`Unauthorized`))
    }
}

//Check if user has authenticated role
function andRestrictTo(role) {
    return (req, res, next) => {
        if (req.authenticatedUser.role === role) {
            next()
        } else {
            next(new Error(`Unauthorized`))
        }
    }
}

module.exports = { loadUser, andRestrictTo, andRestrictToSelf }
