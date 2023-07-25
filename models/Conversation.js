const mongoose = require('mongoose');
const { model, Schema } = mongoose

const conversationSchema = new model({
    id: {type: String, required, unique: true},
    sellerId: {type: String, required },
    buyerId:  {type: String, required },
    readBySeller: {type: Boolean, required},
    readByBuyer: {type: Boolean, required},
    lastMessage: String
}, {
    timestamps: true
})

const Conversation = model('Conversation', conversationSchema)
module.exports = Conversation
