const mongoose = require('mongoose')

const IncluencerSchema = mongoose.Schema({
    name: {
        type: String,
    },
    pic: {
        type: String
    },
    desc: {
        type: String
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country'
    },
    gender: {
        type: String
    },
    tags: {
        type: Object
    },
    posts: {
        type: Object
    },
    platforms: {
        type: Object
    },
    comments: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments'
    },
    score: {
        type: mongoose.Decimal128,
        default: 0.0
    }
})
IncluencerSchema.set('timestamps', true)
module.exports = mongoose.model('Influencer', IncluencerSchema)