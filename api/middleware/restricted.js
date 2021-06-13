module.exports = (req, res, next) => {
  const jwt = require('jsonwebtoken')
  const {jwtToken} = require('../../config/secret')
  
  const restricted = (req, res, next) => {
      const token = req.headers.authorization
  
      if(!token){
          res.status(401).json('Token Required')
      } else {
          jwt.verify(token , jwtToken , (err , decoded)=> {
              if(err){
                  res.status(401).json("Token is bad:" + err.message)
              } else {
                  req.decodedToken = decoded
                  next()
              }
          } ) 
      }
  }
  /*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */
};
