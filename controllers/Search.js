const express = require('express');
const Influencer = require('../models/Influencer');
const mongoose = require('mongoose')

const tags = async (req, res) => {
    console.log(req.params.id)
    try {
        const country = await Influencer.find({ tags: { $elemMatch: { $eq: req.params.id } } }).populate('country', 'name country_id');

        res.status(200);
        res.json(country)
    }
    catch (err) {
        res.json(err)
    }
}

module.exports = { tags }