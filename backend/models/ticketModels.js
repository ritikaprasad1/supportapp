const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }, product: {
        type: String,
        required: [true, 'please select product'],
        enum: ['iphone', 'macbook', 'ipad', 'imac']
    }, description: {
        type: String,
        required: [true, 'please enter a description']
    }, status: {
        type: String,
        required: true,
        enum: ['new', 'open', 'closed'],
        default: 'new'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Ticket', ticketSchema)