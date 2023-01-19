const mongoose = require('mongoose')

const CountrySchema = mongoose.Schema({
    name: {
        type: String,
    },
    country_id: {
        type: String,
    },

})
CountrySchema.set('timestamps', true)
module.exports = mongoose.model('Country', CountrySchema)