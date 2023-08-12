const Converstaion = require('../models/Conversation')



const createConversation = async (req, res) => {

    const newConversation = new Converstaion({

        id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
        sellerId: req.sellerId ? req.userId : req.body.to,
        buyerId: req.isSeller ? req.body.to : req.userId,
        readBySeller: req.isSeller,
        readByBuyer: !readBySeller
    })

    try {
      const conversation = await newConversation.save()

      res.status(200).json(conversation)
    } catch (error) {
        res.status(500).json(error.message)
    }
}



const getConverstaions = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json(error.message)
    }
}



const getConverstaion = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json(error.message)
    }
}



const updateConverstaion = async (req, res) => {
    try {
        const updated = await Converstaion.findOneAndUpdate({id: req.params.id}, {
            $set: {
                readBySeller: req.isSeller,
                readByBuyer: !req.isSeller
            }
        }, {
            new: true
        })

        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json(error.message)
    }
}


module.exports = { createConversation, getConverstaion, getConverstaions, updateConverstaion }
