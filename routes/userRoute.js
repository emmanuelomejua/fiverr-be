const { verifyToken } = require('../middlewares/verifyToken')

const { deleteUser, getUser } = require('../controllers/user.controller')

const router = require('express').Router()

router.delete('/:id', verifyToken, deleteUser);

router.get('/:id', verifyToken, getUser);

module.exports = router
