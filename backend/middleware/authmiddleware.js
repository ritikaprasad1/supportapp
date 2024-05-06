const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const dUser = require("../models/userModel")

const protect = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //get token from bearer
            token = req.headers.authorization.split(" ")[1]
            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRECT)
            //get user from token
            req.user = await dUser.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.log("error")
            res.status(401)
            throw new Error("not authorized")
        }
    } else {
        res.status(401)
        throw new Error("not authorized")
    }

})


module.exports = {protect}