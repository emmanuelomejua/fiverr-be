const { createGig, deleteGig, getGig, getGigs } = require('../controllers/gig.controller')
const { verifyToken } = require('../middlewares/verifyToken')

const router = require('express').Router()

//create gig
router.post('/', verifyToken, createGig)

//delete gig
router.delete('/:id', verifyToken, deleteGig)

//get gig
router.get('/find/:id', verifyToken, getGig)

//fetch all gigs
router.get('/', verifyToken, getGigs)

module.exports = router
