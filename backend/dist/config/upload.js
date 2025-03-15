import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const uploadFile = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: 'auto', // Automatically detect the file type (image, video, raw)
            unique_filename: true
        });
        console.log(result);
        return result;
    }
    catch (error) {
        console.error('Error uploading file to Cloudinary:', error);
        throw new Error('File upload failed');
    }
};
export default uploadFile;
