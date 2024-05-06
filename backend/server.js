const express = require('express')
const { errorHandler } = require('./middleware/errorMiddleware')
require ('dotenv').config()
const colors = require("colors")
const { connectDb } = require('./config/db')

const app = express()

const PORT=process.env.PORT||5000

//Database connection
connectDb()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/", (req,res)=>{
    res.send("please register")
})

app.use('/api/user', require("./routes/userRoutes"))

//ticket routes
app.use('/api/ticket', require("./routes/ticketRoutes"))

//errorhandling
app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log(`server is running on port: ${PORT}`)
})