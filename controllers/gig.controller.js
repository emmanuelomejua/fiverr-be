const createError = require('../middlewares/createError')
const Gig = require('../models/Gigs')

const createGig = async (req, res, next) => {
    try {

        if(!req.isSeller){
            return next(createError(403, 'Sorry, only sellers can create gig'))
        } else {
            const newGig = await Gig.create({
                userId: req.userId,
                ...req.body
            })
            try {
                const gig = await newGig.save()
                res.status(200).json(gig)
            } catch (error) {
                res.status(500).json(error.message)
            }
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const getGig = async (req, res) => {
    try {
        const gig = await Gig.findById(req.params.id)
        if(!gig){
            return next(createError(404, 'Gig not found'))
        } else {
            res.status(200).json(gig)
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const deleteGig = async (req, res, next) => {
    try {
        const gig = await Gig.findById(req.params.id)
        if(gig.userId !== req.userId){
            return next(createError(403, 'You can only delete your gig'))
        } else {
            await Gig.findByIdAndDelete(req.params.id)
            res.status(200).json('Gig has been deleted!')
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const getGigs = async (req, res) => {

    const q = req.query;

    const filters = {
        ...(q.userId &&  {userId: q.userId}),
        ...(q.cat && {cat: q.cat}),
        ...((q.min || q.max) && {price: {...(q.min && {$gt: q.min}), ...(q.max && {$lt: q.max})}}),

        ...(q.search && {title: { $regex: q.search, $option: 'i' }})
    }

    try {
        const gig = await Gig.find(filters)
        res.status(200).json(gig)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports = { createGig, deleteGig, getGig, getGigs }
