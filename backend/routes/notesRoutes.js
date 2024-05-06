const express = require('express')
const router = express.Router({mergeParams: true})
const {protect} = require("../middleware/authmiddleware")
const { getNotes, addNote } = require('../controllers/notesController')

router.route('/').get(protect, getNotes).post(protect , addNote)

//api/ticket/:ticketId/notes
// merge params coz as a id na consider kare



module.exports = router