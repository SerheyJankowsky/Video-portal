require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = function(user,password){
    const payload = {
        user,
        password,
    }
    return jwt.sign(payload,process.env.SECRET,{expiresIn:'24h'})
}