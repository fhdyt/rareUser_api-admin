const express = require('express');
const Influencer = require('../models/Influencer');
const mongoose = require('mongoose')

const findDoc = async (req, res) => {
    console.log(req.params.id)
    try {
        let search = {
            $or: [
                { name: req.params.id },
                { desc: req.params.id },
                { gender: req.params.id },
                {
                    tags: {
                        $elemMatch: { $eq: req.params.id }
                    }
                },
            ],

        }

        const influencer = await Influencer.find(search).populate('country', 'name country_id');

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
const all_tags = async (req, res) => {
    try {
        const influencer = await Influencer.find();
        const tags = influencer.map(doc => {
            return {
                tags: doc.tags,
            }
        })
        const result = [...new Set(tags.reduce((acc, cur) => [...acc, ...cur.tags], []))];

        res.status(200);
        res.json(result)

        res.json()
    }
    catch (err) {
        res.json(err)
    }
}

const country = async (req, res) => {
    console.log(req.params.id)
    try {
        const influencer = await Influencer.find({ country: req.params.id }).populate('country', 'name country_id');

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

module.exports = { tags, findDoc, country, all_tags }