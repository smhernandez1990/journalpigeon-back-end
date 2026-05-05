const router = require('express').Router()
const Post = require('../models/post')
const verifyJwt = require('../middleware/verify-jwt')



module.exports = router