const {Schema,model} = require('mongoose')


const User = new Schema({
    userName:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true
    },
    email:{
        type:String,
        trim:true,
        lowercase: true,
        unique: true
    },
    favorites:{
        type:Object,
    }
})

module.exports = model('User',User)