const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'please fill name']
    },

    email: {
        type: String,
        required: [true, 'please enter email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'enter password']
    },
    // isAdmin :{
    //     type:Boolean,
    //     required:false,
    //    deafault:false
    //}
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)