const mongoose = require('mongoose');
const { model, Schema } = mongoose

const userSchema = new Schema({
    username: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true, 
        unique: true
    },
    password:  {
        type: String, 
        required: true, 
        min: 4
    },
    img: {
        type: String, 
        // required: true
    },
    country: String,
    phone: Number,
    desc: String,
    isSeller: {
        type: Boolean, 
        default: false
    },
}, {
    timestamps: true
})

const User = model('User', userSchema)
module.exports = User
