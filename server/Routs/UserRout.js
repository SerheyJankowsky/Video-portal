const Router = require('express')
const UserController = require('../Controller/UserController')


const rout = new Router

rout.post('/user/login',UserController.LogIn)
rout.post('/user/signin',UserController.SignIn)


module.exports = rout