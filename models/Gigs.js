const mongoose = require('mongoose');
const { model, Schema } = mongoose

const gigSchema = new Schema({
    userId: {type: String, required: true},
    desc: {type: String, required },
    totalStars: {type: Number, default: 0 },
    starNum: {type: Number, default: 0 },
    cat:  {type: String, required },
    price: {type: Number, required },
    cover: {type: String, required },
    images:  {type: [String], required: false },
    shortTitle: String,
    shortDesc: String,
    deliveryTime: {type: date, required},
    revisionNum: {type: Number, required },
    features:  {type: [String], required },
    sale: {type: Number, default: 0}
}, {
    timestamps: true
})

const Gigs = model('Gigs', gigSchema)
module.exports = Gigs
