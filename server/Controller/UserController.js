const bcrypt = require('bcrypt')
const createToken = require('../Libary/token')
const UserServices = require('../Servisec/UserServices')


class UserController {
    async SignIn(req,res){
        try {
            const {userName,password,email} = req.body
            const hashPassword =await bcrypt.hashSync(password,7)
            const user =await UserServices.SignIn(userName,hashPassword,email)
            await user.save()
            const token = createToken(user.name,user.password)
            return res.json({token})
        } catch (e) {
            console.log(e)
        }
    }
    async LogIn(req,res){
        try {
            const {userName,password} = req.body
            const user = await UserServices.LogIn({userName})
            if(!user){ 
                res.status(400).json('Wrong Username')
            }
            const validPassword =await bcrypt.compareSync(password,user.password)
            if(!validPassword){
                res.status(400).json('Wrong Password')
            }
            const token = createToken(user.name,user.password)
            return res.json({token})
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new UserController()