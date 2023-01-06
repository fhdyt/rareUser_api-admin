const mongoose = require('mongoose')
const Influencer = require('./Influencer')

const CommentsSchema = mongoose.Schema({
    userId: {
        type: String,
    },
    comment: {
        type: String,
    },
    influencer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Influencer'
    },

})
CommentsSchema.set('timestamps', true)
module.exports = mongoose.model('Comments', CommentsSchema)