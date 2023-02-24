const mongoose = require('mongoose')

const SocialMediaSchema = mongoose.Schema({
    name: {
        type: String,
    },

})
SocialMediaSchema.set('timestamps', true)
module.exports = mongoose.model('SocialMedia', SocialMediaSchema)