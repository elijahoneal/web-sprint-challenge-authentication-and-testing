const jwt = require('jsonwebtoken')
const {jwtToken} = require('../../config/secret')

const restricted = (req, res, next) => {
    const token = req.headers.authorization

    if(!token){
        res.status(401).json('Token Required')
    } else {
        jwt.verify(token , jwtToken , (err , decoded) ) => {
            if(err){
                res.status(401).json("Token is bad:" + err.message)
            } else {
                req.decodedToken = decoded
                next()
            }
        }
    }
}