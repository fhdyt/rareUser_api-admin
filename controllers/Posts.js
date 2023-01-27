const express = require('express');
const Influencer = require('../models/Influencer');
const Posts = require('../models/Posts');
const mongoose = require('mongoose')

const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffprobePath = require('@ffprobe-installer/ffprobe').path;

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);


const allPost = async (req, res) => {
    try {
        const postsInfluencer = await Influencer.find({}, { "posts": 1 })
        // let newData = [];

        // postsInfluencer.forEach(item => {
        //     item.posts.forEach(post => {
        //         newData.push(post);
        //     });
        // });
        const flattenedData = postsInfluencer.flatMap(user =>
            user.posts.map(post => ({ ...post, user_id: user._id }))
        );
        res.status(200);
        res.json(flattenedData)
    }
    catch (err) {
        res.json({ status: err })

    }
}
const post = async (req, res) => {

    try {
        ffmpeg(req.file.destination + "" + req.file.filename)
            .on('filenames', function (filenames) {
                console.log('Will generate ' + filenames.join(', '))

            })
            .on('end', function (filenames) {
                console.log('Screenshoot has taken')
            })
            .on('error', function (err) {
                console.log(err)
            })
            .screenshot({
                count: 1,
                folder: './uploads/thumb',
                size: '320x?',
                filename: 'thumb-%b'
            })
        const thumName = req.file.filename.toLowerCase().split(".")
        const postItem = new Posts({
            url: req.body.url,
            source: req.body.source,
            file: req.file.destination + "" + req.file.filename,
            thumbnail: req.file.destination + "thumb/thumb-" + thumName[0] + ".png",
        })

        const postsInfluencer = await Influencer.findByIdAndUpdate(
            req.params.id,
            { $push: { posts: postItem } },
        );


        res.status(200);
        res.json(postItem)
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


module.exports = { post, removePosts, allPost }