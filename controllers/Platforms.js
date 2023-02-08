const express = require('express');
const Influencer = require('../models/Influencer');
const Platforms = require('../models/Platforms');
const mongoose = require('mongoose')

const post = async (req, res) => {
    const platformItem = new Platforms({
        platform: req.body.platform,
        username: req.body.username,
        link: req.body.link,
    })
    try {
        const platformInfluencer = await Influencer.findByIdAndUpdate(
            req.params.id,
            { $push: { platforms: platformItem } },
        );
        res.status(200);
        res.json({ platformInfluencer })
    }
    catch (err) {
        res.json({ "status": err })
    }
}

const removePlatform = async (req, res) => {
    console.log(req.params.id)
    console.log(req.params.id_platform)
    try {
        const platformInfluencer = await Influencer.findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(req.params.id) },
            {
                $pull:
                {
                    platforms: { _id: mongoose.Types.ObjectId(req.params.id_platform) }
                }
            },
        );
        res.status(200);
        res.json(platformInfluencer)
    }
    catch (err) {
        res.json({ "status": err })
    }
}



module.exports = { post, removePlatform }