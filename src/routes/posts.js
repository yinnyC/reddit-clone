
const express = require('express')
const router = express.Router()

const postController = require('../controllers/posts')

router.post('/new', postController.newPost)
router.get('/new', postController.newPostForm)

module.exports = router

