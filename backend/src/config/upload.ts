import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadFile = async (filePath: string) => {
    try {
        const ext = path.extname(filePath).toLowerCase();
        const isImage = ['.png', '.jpg', '.jpeg', '.webp', '.gif'].includes(ext);
        const resourceType = isImage ? 'image' : 'raw';

        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: resourceType,
            unique_filename: true
        });

        return result;
    } catch (error) {
        console.error('Error uploading file to Cloudinary:', error);
        throw new Error('File upload failed');
    }
};

export default uploadFile;
