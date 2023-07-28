const { createGig, deleteGig, getGig, getGigs } = require('../controllers/gig.controller')
const { verifyToken } = require('../middlewares/verifyToken')

const router = require('express').Router()

router.post('/', verifyToken, createGig)
router.delete('/:id', verifyToken, deleteGig)
router.get('/find/:id', verifyToken, getGig)
router.get('/', verifyToken, getGigs)

module.exports = router
