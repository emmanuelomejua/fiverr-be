const Gigs = require('../models/Gigs')
const Order = require('../models/Order')


//create an order
const createOrder = async (req, res) => {
    try {
        const gig = await Gigs.findById(req.params.gigId)

        if(!gig){

            res.status(404).json('Gig not found!')

        } else {

            const order = await Order.create({
                gigId: gig._id,
                img: gig.cover,
                title: gig.title,
                buyerId: req.userId,
                sellerId: gig.userId,
                price: gig.price,
                payment_intent: 'temporary'
            })
    
            await order.save()
            res.status(200).json('Succesful!')
           
        }

    } catch (error) {
        res.status(500).json(error.message)
    }
}


//get an order
const getOrder = async (req, res) => {
    try {
        const order = await Order.find({
            ...(req.sellerId ? {sellerId: buyerId} : {buyerId: req.userId}), isCompleted: true
        })

        res.status(200).json(order)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports = { createOrder, getOrder }
