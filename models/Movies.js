const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const movieSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    genre: {
        type: [String],
        required: true
    },
})

const Movies = model('Movies', movieSchema)
module.exports = Movies
