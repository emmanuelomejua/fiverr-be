const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;
    if(!token){
        return res.status(401).json('Requires authentication ')
    } 

    jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
        if(err){
            return res.status(401).json('Token is not valid')
        } 
        req.userId = payload.id;
        req.isSeller = payload.isSeller
        next()
        
    })
    
}


module.exports = { verifyToken }
