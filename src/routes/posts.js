
const express = require('express')
const router = express.Router()

const postController = require('../controllers/posts')

router.post('/new', postController.newPost)
router.get('/new', postController.newPostForm)
router.get('/:id',postController.postDetails)
module.exports = router

