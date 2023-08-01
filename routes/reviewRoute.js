const { verifyToken } = require('../middlewares/verifyToken')
const { createReview, getReview, deleteReview } = require('../controllers/review. controller')
const router = require('express').Router()

router.post('/', verifyToken, createReview)

router.get('/:id', verifyToken, getReview)

router.delete('/:id', verifyToken, deleteReview)

module.exports = router
