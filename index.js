const express = require('express')
const app = express()
const mongoose = require('mongoose').set('debug',true)
const dotenv = require('dotenv')
dotenv.config()

mongoose.connect(process.env.DB_URL,{useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>{
	console.log("Connected to database.")
}).catch((err)=>{
	console.log("Something went wrong.")
	console.log(err)
})

app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/public',express.static('public'))
// routes
const userRoutes = require('./routes/user')
const eventRoutes = require('./routes/event')
const landingRoutes = require('./routes/landing')
app.use('/',userRoutes)

app.use('/new',eventRoutes)


app.get("*",(req,res)=>{
	res.send("Error")
})

app.listen(process.env.PORT,()=>{
	console.log("Server has started at port",process.env.PORT)
})