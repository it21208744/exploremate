
// import  'express-async-handler'
import expressAsyncHandler from 'express-async-handler'
import  Jwt  from 'jsonwebtoken'
// const { Error } = require('mongoose')
// require('dotenv').config()

const validateToken = expressAsyncHandler(async (req, res, next) => {
  let token
  let authHeader = req.headers.authorization

  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1]
    Jwt.verify(token, process.env.JWTPRIVATEKEY, (err, decoded) => {
      if (err) {
        throw new Error('user is not authorized')
      }

      const { iat, exp, ...newDecode } = decoded
      // console.log(newDecode)
      req.user = newDecode // Set decoded value to req.user
      

      next() // Call next() after setting req.user
    })
  } else {
    // throw new Error('Bearer token not found in Authorization header')
    res.send('something went wrong')
  }
})


export default validateToken
