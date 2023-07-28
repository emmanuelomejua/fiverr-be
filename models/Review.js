const mongoose = require('mongoose');
const { model, Schema } = mongoose

const  reviewSchema = new Schema({
    gigId: {type: String, required: true},
    userId: {type: String, required: true},
    star: {type: Number, enum: [1, 2, 3, 4, 5], required},
    desc: {type: String, required: true}
}, {
    timestamps: true
})

const Review = model('Review',  reviewSchema)
module.exports =  Review
