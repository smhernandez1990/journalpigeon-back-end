const router = require('express').Router()
const User = require('../models/user')
const verifyJwt = require('../middleware/verify-jwt')

router.get('/', async (req, res) => {
    try {
        const users = await User.find({}, 'username')
        return res.json(users)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

router.get('/me', verifyJwt, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        return res.status(200).json({ user })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

module.exports = router