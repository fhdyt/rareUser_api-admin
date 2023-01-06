const express = require('express');
const Comments = require('../models/Comments');
const mongoose = require('mongoose')


const get = async (req, res) => {
    try {
        const influencer = await Comments.find().populate('influencer').exec()
        res.status(200);
        res.json(influencer)
    }
    catch (err) {
        console.log(err)
        res.json({ "status": err })
    }
}

const post = async (req, res) => {
    const commentItem = new Comments({
        comment: req.body.comment,
        influencer: req.params.id,
    })

    try {
        const postInfluencer = await commentItem.save()
        res.status(200);
        res.json(postInfluencer)
    }
    catch (err) {
        res.json({ "status": err })
    }
}



module.exports = { post, get }