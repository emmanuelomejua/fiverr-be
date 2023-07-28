const { createOrder, getOrder } = require('../controllers/order.controlller')
const { verifyToken } = require('../middlewares/verifyToken')
const router = require('express').Router()

router.post('/:gigId',  verifyToken,createOrder)
router.get('/', verifyToken, getOrder)

module.exports = router
