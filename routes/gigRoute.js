const { createGig, deleteGig, getGig, getGigs } = require('../controllers/gig.controller')
const { verifyToken } = require('../middlewares/verifyToken')

const router = require('express').Router()

//create gig
router.post('/', verifyToken, createGig)

//delete gig
router.delete('/:id', verifyToken, deleteGig);

//fetch all gigs
router.get('/', getGigs)

//get gig
router.get('/find/:id', getGig)


module.exports = router
