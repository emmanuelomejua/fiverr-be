const { verifyToken } = require('../middlewares/verifyToken')

const { deleteUser } = require('../controllers/user.controller')

const router = require('express').Router()

router.delete('/:id', verifyToken, deleteUser)

module.exports = router
