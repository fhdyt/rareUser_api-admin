const express = require('express')
const router = express.Router()

const PostsController = require('../controllers/Posts')
const upload = require('../middlewares/upload')

router.post('/:id', upload.single('file'), PostsController.post)
router.delete('/:id/:id_post', PostsController.removePosts)
// router.patch('/:id', upload.single('upload'), PostsController.update)

module.exports = router