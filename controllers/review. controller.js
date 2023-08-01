const { createError } = require('../middlewares/createError')
const Gigs = require('../models/Gigs')
const Review = require('../models/Review')

const createReview = async (req, res, next) => {

    if(req.isSeller) return next(createError(403, 'Seller cannot create review'))

    const newReview = Review.create({
        userId: req.userId,
        gigId: req.body.userId,
        desc: req.body.desc,
        star: req.body.star
    })

    try {
        const review = await Review.findOne({
            gigId: req.body.gigId,
            userId: req.userId
        })
        if(review) {
            return next(createError(403, 'You have created review already'))
        } else {
            const savedReview = await newReview.save()

            await Gigs.findByIdAndUpdate(req.body.gigId, {
                $inc: { totalStars: req.body.star, starNum: 1 }
            })
            res.status(201).json(savedReview)

        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const getReview = async (req, res, next) => {

    try {
        const reviews = await Review.find({gigId: req.body.gigId})
        res.status(200).json(reviews)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const deleteReview = async (req, res, next) => {
    try {
        
    } catch (error) {
        res.status(500).json(error.message)
    }
}


module.exports = { createReview, getReview, deleteReview }
