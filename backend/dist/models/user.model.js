import mongoose from "mongoose";
import { comparePassoword, hashPassword } from "../utils/bycrypt.js";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters long']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlenght: [6, 'Email must be at least 6 characters long']
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [6, 'Password must be at least 6 characters long']
    },
    verified: {
        type: Boolean,
        default: false,
        required: true
    }
}, {
    timestamps: true
});
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await hashPassword(this.password);
    next();
});
userSchema.methods.comparePassword = async function (password) {
    return comparePassoword(password, this.password);
};
const userModel = mongoose.model('user', userSchema);
export default userModel;
