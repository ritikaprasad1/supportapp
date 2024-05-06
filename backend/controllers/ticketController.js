const asyncHandler = require("express-async-handler")
const User = require('../models/userModel')
const Ticket = require("../models/ticketModels")

const getTickets = asyncHandler(async (req, res) => {

    //get user from jwt
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error("user not found")
    }
    const tickets = await Ticket.find({ user: req.user.id })
    res.status(200).json(tickets)
    //res.send("all tickets")
})

const getTicket = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error("user not found")
    }
    const ticket = await Ticket.findById(req.params.id)
    if (!ticket) {
        res.status(404)
        throw new Error('ticket not found')
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("not auth")
    }
    //res.send("single ticket")
})

const createTicket = asyncHandler(async (req, res) => {

    const { product, description } = req.body

    if (!product || !description) {
        res.status(400)
        throw new Error("please fill details")
    }

    //get user id from jwt 
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error("user not found")
    }

    const ticket = await Ticket.create({
        user: req.user.id,
        product,
        description,
        status: 'new'
    })
    res.status(202).json(ticket)
})

const deleteTicket = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error("user not found")
    }
    const ticket = await Ticket.findById(req.params.id)
    if (!ticket) {
        res.status(404)
        throw new Error('ticket not found')
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("not auth")
    }
    await Ticket.findByIdAndDelete(req.params.id)
    res.status(200).json({ deleted })

    //res.send("delete ticket")
})



const updateTicket = asyncHandler(async (req, res) => {
    if (!user) {
        res.status(401)
        throw new Error("user not found")
    }
    const ticket = await Ticket.findById(req.params.id)
    if (!ticket) {
        res.status(404)
        throw new Error('ticket not found')
    }

    const updatedTicket = await Ticket.findById(req.params.id, req.body, { new: true });
    //res.send("update ticket")
})

module.exports = { getTicket, getTickets, createTicket, deleteTicket, updateTicket }
