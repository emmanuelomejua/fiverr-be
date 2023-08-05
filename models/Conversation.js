const mongoose = require('mongoose');
const { model, Schema } = mongoose

const conversationSchema = new model({
    id: {
        type: String, 
        required: true, 
        unique: true
    },
    sellerId: {
        type: String, 
        required: true
    },
    buyerId:  {
        type: String, 
        required : true
    },
    readBySeller: {
        type: Boolean, 
        required: true
    },
    readByBuyer: {
        type: Boolean, 
        required: true
    },
    lastMessage: String
}, {
    timestamps: true
})

const Conversation = model('Conversation', conversationSchema)
module.exports = Conversation
