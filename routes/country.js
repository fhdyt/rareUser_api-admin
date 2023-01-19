const express = require('express')
const router = express.Router()

const CountryController = require('../controllers/Country')

router.post('/', CountryController.post)
router.get('/', CountryController.list)
router.delete('/:id/', CountryController.removeData)

module.exports = router