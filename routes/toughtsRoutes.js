const express = require('express')
const Tought = require('../models/Tought')
const router = express.Router()
const ToughtsController = require('../controllers/ToughtsController')

//controller

router.get('/',ToughtsController.showToughts)

module.exports = router