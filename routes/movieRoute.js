const { getMovies } = require('../controllers/movies.controller')
const {Router} = require('express')

const router = Router()


router.get('/', getMovies)

module.exports = router
