const express = require('express')
const Tought = require('../models/Tought')
const router = express.Router()
const ToughtsController = require('../controllers/ToughtsController')

//helpers
const checkAuth = require('../helpers/auth').checkAuth

router.get('/',ToughtsController.showToughts)

router.get('/add', checkAuth, ToughtsController.create)
router.get('/edit/:id', checkAuth, ToughtsController.edit)
router.post('/edit', checkAuth, ToughtsController.editPost)
router.post('/add', checkAuth, ToughtsController.createPost)
router.get('/dashboard', checkAuth, ToughtsController.dashboard)
router.get('/remove/:id',ToughtsController.removeTought)
module.exports = router