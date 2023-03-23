const express = require('express')
const router = express.Router()

const Influencer = require('../models/Influencer')
const InfluencerController = require('../controllers/Influencer')
const upload = require('../middlewares/upload')

router.get('/', InfluencerController.list)
router.get('/:id', InfluencerController.detail)
router.get('/related/:id', InfluencerController.related)
router.patch('/:id', upload.single('pic'), InfluencerController.update)
router.patch('/pic/:id', upload.single('pic'), InfluencerController.update_pic)
router.patch('/score/:id', InfluencerController.update_score)
router.patch('/tags/:id', InfluencerController.update_tags)
router.post('/', upload.single('pic'), InfluencerController.post)

module.exports = router