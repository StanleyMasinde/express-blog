const passport = require('passport')
const User = require('../app/models/user')

const router = require('express').Router()

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: false,
    userProperty: 'user',
}))

router.post('/register', async (req, res) => {
    // TODO add validation
    try {
        const result = await new User().create(req.body)
        res.status(result.status).json(result.message)
    } catch (error) {
        res.status(500).json(error)
    }

})

module.exports = router
