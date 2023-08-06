

const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;
    if(!token){

        res.status(401).json('Requires authentication ')
    } else {
        jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
            if(err){

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
