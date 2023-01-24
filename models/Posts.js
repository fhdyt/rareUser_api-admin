const mongoose = require('mongoose')

const PostsSchema = mongoose.Schema({
    url: {
        type: String,
    },
    source: {
        type: String,
    },
    file: {
        type: String,
    },
    thumbnail: {
        type: String,
    },

})
PostsSchema.set('timestamps', true)
module.exports = mongoose.model('Posts', PostsSchema)