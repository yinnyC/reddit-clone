const express = require('express')
const router = express.Router()

const authController = require('../controllers/auth')

router.get('/sign-up',authController.signupForm)
router.post('/sign-up',authController.signupUser)

module.exports = router