import { createError } from './createError';

const jwt = require('jsonwebtoken')

export const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;
    if(!token){
        return next(createError(401, 'You are not authenticated '))
    } else {
        jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
            if(err){
                return next(createError(401, 'Token is not valid'))
            } else {
                req.userId = payload.id;
                req.isSeller = payload.isSeller
                next()
            }
        })
    }
}
