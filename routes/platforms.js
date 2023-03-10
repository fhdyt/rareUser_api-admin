const express = require('express')
const router = express.Router()

const PlatformsController = require('../controllers/Platforms')

router.post('/:id', PlatformsController.post)
router.delete('/:id/:id_platform', PlatformsController.removePlatform)
module.exports = router