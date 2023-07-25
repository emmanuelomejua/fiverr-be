const mongoose = require('mongoose');
const { model, Schema } = mongoose

const orderSchema = new Schema({
    gigId: {type: String, required},
    img: String,
    title: String,
    pricel: {type: Number, required},
    buyerId: {type: String, required},
    sellerId: {type: String, required},
    isCompleted: {type: Boolean, default: false},
    payment_intent: {type: String, required}
},{
    timestamps: true
})

const Order = model('Order', orderSchema)
module.exports = Order
