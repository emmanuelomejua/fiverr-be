const mongoose = require('mongoose');
const { model, Schema } = mongoose

const gigSchema = new Schema({

    userId: {type: String, required: true},

    title: {type: String, required: true},

    desc: {type: String, required: true },

    totalStars: {type: Number, default: 0 },

    images: {
        type: [String]
    },

    starNum: {type: Number, default: 0 },

    cat:  {type: String, required: true },

    price: {type: Number, required: true },

    cover: {type: String, required: true },
    
    shortTitle: String,
    
    shortDesc: String,

    deliveryTime: {type: Date, required: false},

    revisionNum: {type: Number, required: true },

    features:  {type: [String], required: true },

    sale: {type: Number, default: 0}

}, {
    timestamps: true
})

const Gigs = model('Gigs', gigSchema)
module.exports = Gigs
