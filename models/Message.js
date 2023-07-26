const mongoose = require('mongoose');
const { model, Schema } = mongoose

const msgSchema = new Schema({
    conversationId: {type: String, required},
    userId:  {type: String, required},
    desc:  {type: String, required},
}, {
    timestamps: true
})

const Message = model('Message', msgSchema)
module.exports = Message
