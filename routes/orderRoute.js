const { createOrder, getOrder } = require('../controllers/order.controlller')
const { verifyToken } = require('../middlewares/verifyToken')

const router = require('express').Router()

//create an order
router.post('/:gigId',  verifyToken, createOrder)

//get an order
router.get('/', verifyToken, getOrder)

module.exports = router
