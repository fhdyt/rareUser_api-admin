const express = require('express');
const SocialMedia = require('../models/SocialMedia');

const list = async (req, res) => {
    try {
        const sosial_media = await SocialMedia.find()
        res.status(200);
        res.json(sosial_media)
    }
    catch (err) {
        res.json(err)
    }
}

const post = async (req, res) => {
    const countryItem = new SocialMedia({
        name: req.body.name,
    })
    try {
        const postSocialMedia = await countryItem.save()
        res.status(200);
        res.json(postSocialMedia)
    }
    catch (err) {
        res.json({ "status": err })
    }
}

const removeData = async (req, res) => {
    console.log(req.params.id)
    try {
        const postsSocialMedia = await SocialMedia.findOneAndRemove(
            { _id: req.params.id },
        );
        res.status(200);
        res.json({ status: "ok" })
    }
    catch (err) {
        res.json({ "status": err })
    }
}


module.exports = { post, removeData, list }