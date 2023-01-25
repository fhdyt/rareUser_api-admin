const express = require('express')
const router = express.Router()

const SearchController = require('../controllers/Search')
const upload = require('../middlewares/upload')

router.get('/:id', SearchController.findDoc)
router.get('/tags/:id', SearchController.tags)
router.get('/country/:id', SearchController.country)

module.exports = router