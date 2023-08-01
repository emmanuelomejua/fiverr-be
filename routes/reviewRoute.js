const { verifyToken } = require('../middlewares/verifyToken')
const { createReview, getReview, deleteReview } = require('../controllers/review. controller')
const router = require('express').Router()

router.post('/', createReview)

router.get('/:id', getReview)

router.delete('/:id', deleteReview)

module.exports = router
