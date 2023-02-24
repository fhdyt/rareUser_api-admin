require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParses = require('body-parser')

app.use(bodyParses.urlencoded({ extended: false }))
app.use(bodyParses.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization")
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST,PATCH,DELETE,GET')
    }
    next()
})
app.get('/', (req, res) => {
    // res.json({ status: "Server Running", baseUrl: process.env.BASE_URL })
})

const authRoute = require('./routes/auth')
const countryRoute = require('./routes/country')
const social_mediaRoute = require('./routes/social_media')
const influencerRoute = require('./routes/influencer')
const postsRoute = require('./routes/posts')
const platformsRoute = require('./routes/platforms')
const commentsRoute = require('./routes/comments')
const searchRoute = require('./routes/search')



app.use('/auth', authRoute)

app.use('/influencer', influencerRoute)
app.use('/posts', postsRoute)
app.use('/platforms', platformsRoute)
app.use('/comments', commentsRoute)
app.use('/search', searchRoute)
app.use('/country', countryRoute)
app.use('/social_media', social_mediaRoute)

app.use('/uploads', express.static('uploads'))
app.use('/uploads/thumb', express.static('uploads/thumb'))

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true })
mongoose.connection.on('error', (error) => console.error(error))
mongoose.connection.once('open', () => console.log('Connected to Database'))

app.listen(3000)