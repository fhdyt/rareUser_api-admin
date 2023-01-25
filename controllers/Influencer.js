const express = require('express');
const { count } = require('../models/Influencer');
const Influencer = require('../models/Influencer')
const Country = require('../models/Country')

const list = async (req, res) => {
    console.log(process.env.BASE_URL)
    try {

        // const influencer = await Influencer.find()
        const influencer = await Influencer.find().populate('country', 'name country_id').exec()
        res.status(200);
        // res.json(influencer)
        res.json(influencer.map(doc => {
            return {
                _id: doc._id,
                name: doc.name,
                pic: process.env.BASE_URL + "/" + doc.pic,
                desc: doc.desc,
                country: doc.country,
                gender: doc.gender,
                tags: doc.tags,
            }
        }))
    }
    catch (err) {
        res.json(err)
    }
}

const detail = async (req, res) => {
    try {
        const influencer = await Influencer.find({ "_id": req.params.id }).populate('country', 'name country_id')
        res.status(200);
        res.json(influencer.map(doc => {
            return {
                _id: doc._id,
                name: doc.name,
                pic: process.env.BASE_URL + "/" + doc.pic,
                desc: doc.desc,
                country: doc.country,
                gender: doc.gender,
                tags: doc.tags,
                posts: doc.posts.map(post => {
                    return {
                        url: post.url,
                        source: post.source,
                        file: process.env.BASE_URL + "/" + post.file,
                        thumbnail: process.env.BASE_URL + "/" + post.thumbnail,
                    }

                }),
                platforms: doc.platforms,
            }
        }))
    }
    catch (err) {
        console.log(err)
        res.json({ "status": err })
    }
}

const post = async (req, res) => {
    if (req.file == null) {
        var name_file = "";
    }
    else {
        var name_file = req.file.destination + "" + req.file.filename
    }

    try {
        const country = await Country.findOne({ country_id: req.body.country })
        try {
            const influencer = new Influencer({
                name: req.body.name,
                pic: name_file,
                desc: req.body.desc,
                gender: req.body.gender,
                country: country,
                tags: req.body.tags.toLowerCase().split(" ")
            })
            const postInfluencer = await influencer.save()
            res.status(200);
            res.json(influencer)
        }
        catch (err) {
            res.json({ "error": err })
        }
    }
    catch (err) {
        console.log(err)
        res.json({ "error": err })
    }
}

const update = async (req, res) => {
    try {
        const country = await Country.findOne({ country_id: req.body.country })
        try {
            if (req.file == null) {
                var name_file = "";
            }
            else {
                var name_file = req.file.destination + "" + req.file.filename
            }
            const postInfluencer = await Influencer.updateOne(
                { _id: req.params.id },
                {
                    $set: {
                        name: req.body.name,
                        pic: name_file,
                        desc: req.body.desc,
                        gender: req.body.gender,
                        country: country,
                        tags: req.body.tags.toLowerCase().split(" ")
                    }
                }
            )
            res.status(200);
            res.json(postInfluencer)
        }
        catch (err) {
            res.json({ "status": err })
        }
    }
    catch (err) {
        res.json({ "status": err })
    }

}


module.exports = { list, post, update, detail }