const mongoose = require("mongoose")
const notesSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
    ticket:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'ticket'
    },
    text:{
        type: String,
        required:[true,"please add description"]
    },
    isStaff:{
        type: Boolean,
        default: false
    },
    staffId:{
        type: String,
    }
},{
    timestamps: true
})

module.exports = mongoose.model("Note", notesSchema)