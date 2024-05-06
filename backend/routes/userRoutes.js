const express = require("express")
const { registerUser, loginUser, getMe } = require("../controllers/userController")
const { protect } = require("../middleware/authmiddleware")
const router =express.Router()

router.post("/", registerUser)
router.post("/login", loginUser)
router.post("/me", protect , getMe)

module.exports=router