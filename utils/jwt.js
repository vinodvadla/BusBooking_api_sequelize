const jwt = require('jsonwebtoken')
require('dotenv').config()

let generateToken = (id) => {
    let token = jwt.sign({ id }, process.env.SECRET)
    return token
}

const verifyToken = (token) => {
    let payload = jwt.verify(token, process.env.SECRET)
    return payload
}


module.exports = { generateToken, verifyToken }
