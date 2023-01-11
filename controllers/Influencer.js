const express = require('express')
const Influencer = require('../models/Influencer')


const detail = async (req, res) => {
    try {
        const influencer = await Influencer.find({ "_id": req.params.id }).populate({
            path: 'comments',
            model: 'Comments',
        }).exec()
        res.status(200);
        res.json(influencer)
    }
    catch (err) {
        console.log(err)
        res.json({ "status": err })
    }
}

const list = async (req, res) => {
    try {
        const influencer = await Influencer.find()
        res.status(200);
        res.json(influencer)
        // res.json(influencer.map(doc => {
        //     return {
        //         _id: doc._id,
        //         avatar: process.env.BASE_URL + "/" + doc.avatar
        //     }
        // }))
    }
    catch (err) {
        res.json(err)
    }
}

const post = async (req, res) => {
    console.log(req.file)
    const influencer = new Influencer({
        name: req.body.name,
        pic: req.file.destination + "" + req.file.filename,
        desc: req.body.desc,
        gender: req.body.gender,
        country: req.body.country,
        tags: req.body.tags.toLowerCase().split(" ")
    })

    try {
        const postInfluencer = await influencer.save()
        res.status(200);
        res.json(postInfluencer)
    }
    catch (err) {
        res.json({ "status": err })
    }
}

const update = async (req, res) => {
    try {

        const postInfluencer = await Influencer.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    name: req.body.nama,
                    pic: req.file.destination + "" + req.file.filename,
                    desc: req.body.desc,
                    tags: req.body.tags.split(" ")
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


module.exports = { list, post, update, detail }