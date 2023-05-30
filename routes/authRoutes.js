const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')

//controller

router.get('/login',AuthController.login)
router.get('/register',AuthController.register)

module.exports = router