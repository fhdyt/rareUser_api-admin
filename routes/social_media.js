const express = require('express')
const router = express.Router()

const SocialMediaController = require('../controllers/SocialMedia')

router.post('/', SocialMediaController.post)
router.get('/', SocialMediaController.list)
router.delete('/:id/', SocialMediaController.removeData)

module.exports = router