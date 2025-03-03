
import mongoose from "mongoose";



const fileSchema = new mongoose.Schema({

    file_url:{
        type: String,
        required: true
    }
})

const fileModel = mongoose.model('File', fileSchema)

export default fileModel

