const mongoose = require('mongoose');
const { model, Schema } = mongoose

const msgSchema = new Schema({
    conversationId: {type: String, required: true},
    
    userId:  {type: String, required: true},
    
    desc:  {type: String, required: true},
    
}, {
    timestamps: true
})

const Message = model('Message', msgSchema)
module.exports = Message
