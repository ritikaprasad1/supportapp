const mongoose =require("mongoose")
const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected".cyan.underline)
    } catch (error) {
        console.log(error.red.underline)
    }
}

module.exports = {connectDb}