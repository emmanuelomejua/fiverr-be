const createError = require('./createError')

const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;
    if(!token){
        // return next(createError(401, 'You are not authenticated '))
        res.status(401).json('You are not authenticated ')
    } else {
        jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
            if(err){
                // return next(createError(403, 'Token is not valid'))
                res.status(401).json('Token is not valid')
            } else {
                req.userId = payload.id;
                req.isSeller = payload.isSeller
                next()
            }
        })
    }
}


module.exports = { verifyToken }
