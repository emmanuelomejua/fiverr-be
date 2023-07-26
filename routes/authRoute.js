const { Register, Login, Logout } = require('../controllers/auth.controller');
const Router = require('express');
const router = Router()


router.post('/login', Login);
router.post('/register', Register);
router.post('/logout', Logout)

module.exports = router
