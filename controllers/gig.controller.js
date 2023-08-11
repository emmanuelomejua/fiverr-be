const createError = require('../middlewares/createError')
const Gig = require('../models/Gigs')


const createGig = async (req, res) => {
    try {

        if(!req.isSeller){

            res.status(403).json('Sorry, only sellers can create gig')
            
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


//get single gig
const getGig = async (req, res) => {
    try {
        const gig = await Gig.findById(req.params.id)

        if(!gig){

            res.status(404).json('Gig not found')

        } else {
            res.status(200).json(gig)
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}


//delete a gig
const deleteGig = async (req, res) => {
    try {
        const gig = await Gig.findById(req.params.id)

        if(!gig){

            res.status(404).json('Gig does not exist or has already been deleted')
            
        } else {
            
            if(gig.userId !== req.userId){
            
                res.status(403).json('You are not allowed to do this')
            
            } else {
            
                await Gig.findByIdAndDelete(req.params.id)
                        
                res.status(200).json('Gig has been deleted!')
            }

        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}


//get gigs
const getGigs = async (req, res) => {

    const q = req.query;

    const filters = {
        ...(q.userId &&  {userId: q.userId}),
        ...(q.cat && {cat: q.cat}),
        ...((q.min || q.max) && {price: {...(q.min && {$gt: q.min}), ...(q.max && {$lt: q.max})}}),

        ...(q.search && {title: { $regex: q.search, $option: 'i' }})
    }

    try {
        const gig = await Gig.find(filters).sort({_id: -1})
        res.status(200).json(gig)
    } catch (error) {
        res.status(500).json(error.message)
    }
}



module.exports = { createGig, deleteGig, getGig, getGigs }
