const mongoose = require('mongoose');
const { model, Schema } = mongoose

const gigSchema = new Schema({
    userId: {type: String, required: true},
    desc: {type: String, required: true },
    totalStars: {type: Number, default: 0 },
    starNum: {type: Number, default: 0 },
    cat:  {type: String, required: true },
    price: {type: Number, required: true },
    cover: {type: String, required: true },
    images:  {type: [String] },
    shortTitle: String,
    shortDesc: String,
    deliveryTime: {type: Date, required: true},
    revisionNum: {type: Number, required: true },
    features:  {type: [String], required: true },
    sale: {type: Number, default: 0}
}, {
    timestamps: true
})

const Gigs = model('Gigs', gigSchema)
module.exports = Gigs
