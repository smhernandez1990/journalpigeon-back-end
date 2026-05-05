const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    email: String,
    phoneNumber: String,
    address: String
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.hashedPassword
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User