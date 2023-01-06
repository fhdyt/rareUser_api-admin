const mongoose = require('mongoose')

const PlatformsSchema = mongoose.Schema({
    platform: {
        type: String,
    },
    username: {
        type: String,
    },
    link: {
        type: String,
    },

})
PlatformsSchema.set('timestamps', true)
module.exports = mongoose.model('Platforms', PlatformsSchema)