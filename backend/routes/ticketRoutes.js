const express = require('express')
const route = express.Router()
const { protect } = require("../middleware/authmiddleware")
const { getTickets, getTicket, createTicket, updateTicket, deleteTicket } = require('../controllers/ticketController')
const router = require('./userRoutes')
const noteRouter = require("./notesRoutes")

router.route('/create').get(protect, getTickets).post(protect, createTicket);

router
    .route("/:id")
    .get(protect, getTicket)
    .put(protect, updateTicket)
    .delete(protect, deleteTicket);


    //reroute into notes router
router.use("/:ticketId/notes", noteRouter)

module.exports = router