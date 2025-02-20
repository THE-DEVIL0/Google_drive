import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength : [3, 'Username must be at least 3 characters long']
    },
    email:{
        type: String,
        required: true,
        unique : true,
        trim: true,
        lowercase: true,
        minlenght: [6, 'Email must be at least 6 characters long']
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: [6, 'Password must be at least 6 characters long']
    }
})

const userModel = mongoose.model('user', userSchema)

export default userModel