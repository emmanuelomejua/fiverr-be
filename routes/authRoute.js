const { Register, Login, Logout } = require('../controllers/auth.controller');
const Router = require('express');
const router = Router()

//login
router.post('/login', Login);

//register
router.post('/register', Register);

//logout
router.post('/logout', Logout)

module.exports = router
