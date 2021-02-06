const express = require('express')
const postRoutes = require('./post.js')
const mainRoutes = require('./main.js')
const router = express.Router()

router.use('/', mainRoutes)
router.use('/posts', postRoutes)

module.exports = router