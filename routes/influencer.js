const express = require('express')
const router = express.Router()

const Influencer = require('../models/Influencer')
const InfluencerController = require('../controllers/Influencer')
const upload = require('../middlewares/upload')

router.get('/', InfluencerController.list)
router.get('/:id', InfluencerController.detail)
router.patch('/:id', upload.single('pic'), InfluencerController.update)
router.post('/', upload.single('pic'), InfluencerController.post)

module.exports = router