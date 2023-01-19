const express = require('express');
const Influencer = require('../models/Influencer');
const Country = require('../models/Country');
const mongoose = require('mongoose')

const list = async (req, res) => {
    try {
        const country = await Country.find()
        res.status(200);
        res.json(country)
    }
    catch (err) {
        res.json(err)
    }
}

const post = async (req, res) => {
    const countryItem = new Country({
        name: req.body.name,
        country_id: req.body.country_id,
    })
    try {
        const postCountry = await countryItem.save()
        res.status(200);
        res.json(postCountry)
    }
    catch (err) {
        res.json({ "status": err })
    }
}

const removeData = async (req, res) => {
    console.log(req.params.id)
    try {
        const postsInfluencer = await Country.findOneAndRemove(
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