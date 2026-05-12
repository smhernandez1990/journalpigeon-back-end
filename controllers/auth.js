const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


router.post('/sign-in', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
         if (
           !user ||
           !bcrypt.compareSync(req.body.password, user.hashedPassword)
         ) {
           return res.status(401).json({ error: "Invalid Credentials" });
         }

        const token = jwt.sign(
            { user: { _id: user._id, username: user.username } }, 
            process.env.SECRET_KEY
        )
        res.status(200).json({ token })
    } catch (error) {
        res.status(500).json({error: error.message}).redirect('/error')
        
    }
})
    

router.post('/sign-up', async (req, res) => {
    try {
        const foundUser = await User.findOne({
          username: req.body.username,
        });
        if (foundUser) {
          return res
            .status(400)
            .json({ err: `Username ${req.body.username} already exists` });
        }

        const user = await User.create({
          ...req.body,
          hashedPassword: bcrypt.hashSync(req.body.password, 12),
        });

        const token = jwt.sign(
          { user: { _id: user._id, username: user.username } },
          process.env.SECRET_KEY,
        );
        res.status(201).json({ token })
    } catch (error) {
        res.status(500).json({err: error.message})
    }
})

module.exports = router