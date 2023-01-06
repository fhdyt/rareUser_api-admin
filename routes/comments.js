const express = require('express')
const router = express.Router()

const CommentsController = require('../controllers/Comments')
const upload = require('../middlewares/upload')

router.get('/', CommentsController.get)
router.post('/:id', CommentsController.post)
// router.delete('/:id/:id_comment', CommentsController.removeComments)

module.exports = router