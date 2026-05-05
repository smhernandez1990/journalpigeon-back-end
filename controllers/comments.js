const router = require('express').Router()
const Comment = require('../models/comment')
const verifyJwt = require('../middleware/verify-jwt')



module.exports = router