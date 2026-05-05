const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


router.post('/sign-in', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) throw new Error(`Username ${req.body.username} does not exist`)
        const isValidPW = bcrypt.compareSync(req.body.password, user.hashedPassword)
        if (!isValidPW) throw new Error('Invalid Credentials')
        const token = jwt.sign({ user: user }, process.env.SECRET_KEY)
        res.status(200).json({ token })
    } catch (error) {
        res.json({err: error.message})
    }
})
    

router.post('/sign-up', async (req, res) => {
    try {
        const foundUserInDB = await User.findOne({ username: req.body.username })
        if(foundUserInDB) throw new Error (`Username ${req.body.username} already exists`)
        const user = await User.create({
            ...req.body,
            hashedPassword: bcrypt.hashSync(req.body.password, 12)
        })
        const token = jwt.sign({user}, process.env.SECRET_KEY)
        res.status(201).json({ token })
    } catch (error) {
        res.json({err: error.message})
    }
})

module.exports = router