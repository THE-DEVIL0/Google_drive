import mongoose from "mongoose";
const fileSchema = new mongoose.Schema({
    file_url: {
        type: String,
        required: true
    },
    file_name: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
});
const fileModel = mongoose.model('File', fileSchema);
export default fileModel;
