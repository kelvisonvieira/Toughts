const express = require('express')
const Tought = require('../models/Tought')
const router = express.Router()
const ToughtsController = require('../controllers/ToughtsController')

//helpers
const checkAuth = require('../helpers/auth').checkAuth

router.get('/',ToughtsController.showToughts)

router.get('/add', checkAuth, ToughtsController.create)
router.post('/add', checkAuth, ToughtsController.createPost)
router.get('/dashboard', checkAuth, ToughtsController.dashboard)

module.exports = router