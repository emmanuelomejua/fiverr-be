const { createConversation, getConverstaions, getConverstaion, updateConverstaion } = require('../controllers/conversation.controller')


const { verifyToken } = require('../middlewares/verifyToken')

const router = require('express').Router()

//create Converstaion
router.post('/',  verifyToken, createConversation)

//get Converstaions
router.get('/', verifyToken, getConverstaions)


router.get('/find/:id', verifyToken, getConverstaion)


router.patch('/:id', verifyToken, updateConverstaion)

module.exports = router
