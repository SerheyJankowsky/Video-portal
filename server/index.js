require('dotenv').config()
const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const user = require('./Routs/UserRout')
const cors = require('cors')






const app = express()
const PORT = process.env.PORT || 3000
const DB = process.env.DB_URI

app.use(cors())
app.use(express.json())
app.use('/api', user)



const start = async ()=>{
    try {
        await mongoose.connect(DB, { useNewUrlParser: true,  useUnifiedTopology: true,  useFindAndModify: false })
        app.listen(PORT,()=>{
            console.log(`Server created at port:${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()





