const User = require('../Models/User')

class UserService{
    async LogIn(userName){
        const user =await User.findOne(userName)
        return user
    }
    async SignIn(userName,hashPassword,email){
        const newUser = User.create({userName, password:hashPassword, email})
        return newUser
    }
}

module.exports = new UserService()