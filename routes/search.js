const express = require('express')
const router = express.Router()

const SearchController = require('../controllers/Search')
const upload = require('../middlewares/upload')

router.get('/:id', SearchController.findDoc)
router.get('/tags/all', SearchController.all_tags)
router.get('/tags/:id', SearchController.tags)
router.get('/country/:id', SearchController.country)
router.get('/social_media/:id', SearchController.social_media)
router.get('/influencer/top', SearchController.top_list)
router.get('/influencer/top-all', SearchController.top_all_list)

module.exports = router