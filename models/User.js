const mongoose = require('mongoose')

const Userschema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isSeller: {
        type: Boolean,
        required: true
    }
})

module.exports = User = mongoose.model('user', Userschema)