const express = require('express');
const Influencer = require('../models/Influencer');
const Posts = require('../models/Posts');
const mongoose = require('mongoose')

const post = async (req, res) => {
    const postItem = new Posts({
        url: req.body.url,
        source: req.body.source,
        file: req.file.destination + "" + req.file.filename,
    })
    console.log(req.body)
    console.log(req.body.source)
    try {
        const postsInfluencer = await Influencer.findByIdAndUpdate(
            req.params.id,
            { $push: { posts: postItem } },
        );
        res.status(200);
        res.json({ postsInfluencer })
    }
    catch (err) {
        res.json({ "status": err })
    }
}

const removePosts = async (req, res) => {
    console.log(req.params.id)
    console.log(req.params.id_post)
    try {
        const postsInfluencer = await Influencer.findOneAndUpdate(
            req.params.id,
            {
                $pull:
                {
                    posts: { _id: mongoose.Types.ObjectId(req.params.id_post) }
                }
            },
        );
        res.status(200);
        res.json({ status: "ok" })
    }
    catch (err) {
        res.json({ "status": err })
    }
}


module.exports = { post, removePosts }