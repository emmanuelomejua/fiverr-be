const mongoose = require('mongoose');
const { model, Schema } = mongoose

const orderSchema = new Schema({
    gigId: {type: String, required: true},
    img: String,
    title: String,
    pricel: {type: Number, required: true},
    buyerId: {type: String, required: true},
    sellerId: {type: String, required: true},
    isCompleted: {type: Boolean, default: false},
    payment_intent: {type: String, required: true}
},{
    timestamps: true
})

const Order = model('Order', orderSchema)
module.exports = Order
