
import mongoose from "mongoose";
import { comparePassoword, hashPassword } from "../utils/bycrypt";

export interface UserDocument extends mongoose.Document{
    username: string;
    email: string;
    password: string;
    verified: boolean;
    createdat: Date;
    updatedat: Date;
    comparePassword(val:string): Promise<boolean>

    
}

const userSchema = new mongoose.Schema<UserDocument>({
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
    },
    verified:{
        type:Boolean,
        default: false,
        required: true
    } },
    {
        timestamps:true
    }
)

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
    this.password = await hashPassword(this.password)
    next()
})

userSchema.methods.comparePassword = async function(password:string){
return comparePassoword(password, this.password)
}

const userModel = mongoose.model<UserDocument>('user', userSchema)

export default userModel