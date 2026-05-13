const router = require('express').Router()
const User = require('../models/user')
const verifyJwt = require('../middleware/verify-jwt')

router.get('/', async (req, res) => {
    try {
        const users = await User.find({}, 'username')
        res.json(users)
    } catch (error) {
        throw new Error('Error: ', error.message)
        res.status(500).redirect('/error')
    }
})


//will be used for personalized dashboard
router.get('/me', verifyJwt, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        res.status(200).json({ user })
    } catch (error) {
        throw new Error('Error: ', error.message)
        res.status(500).redirect('/error')
    }
})

module.exports = router