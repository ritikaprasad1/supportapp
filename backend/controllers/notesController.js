const asyncHandler = require('express-async-handler')
const User = require("../models/userModel")
const Ticket = require("../models/ticketModels")
const Note = require("../models/notesmodel")

const getNotes = asyncHandler(async(req, res)=>{
    
    //get user ffrom jwt
    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error("user not found")
    }
    const ticket = await Ticket.findById(req.params.ticketId)

    if(!ticket){
        res.status(404)
        throw new Error("ticket not found")
    }
    if(ticket.user.toString()!== req.user.id){
        res.status(401)
        throw new Error("user not auth")
    }
    const notes = await Note.find({ticket: req.params.ticketId})
    res.status(200).json({notes})
 })


 const addNote = asyncHandler(async(req,res)=>{
    //get user ffrom jwt
    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error("user not found")
    }
    const ticket = await Ticket.findById(req.params.ticketId)

    if(!ticket){
        res.status(404)
        throw new Error("ticket not found")
    }
    if(ticket.user.toString()!== req.user.id){
        res.status(401)
        throw new Error("user not auth")
    }

    const note =  await Note.create({
        text : req.body.text,
        isstaff : false,
        ticket : req.params.ticketId,
        user : req.user.id
    })

    res.status(201).json(note)
 })
 module.exports = {getNotes, addNote}