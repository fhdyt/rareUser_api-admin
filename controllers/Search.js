const express = require('express');
const Influencer = require('../models/Influencer');
const mongoose = require('mongoose')

const tags = async (req, res) => {
    console.log(req.params.id)
    try {
        const influencer = await Influencer.find({ tags: { $elemMatch: { $eq: req.params.id } } }).populate('country', 'name country_id');

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
            }
        }))
    }
    catch (err) {
        res.json(err)
    }
}

module.exports = { tags }