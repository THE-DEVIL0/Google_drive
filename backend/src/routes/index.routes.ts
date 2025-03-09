import express, { Request, Response } from 'express';
import multer from 'multer';
import uploadFile from '../config/upload';
import fileModel from '../models/file.model';
import auth from '../middlewares/auth';
import axios from 'axios';

interface CustomRequest extends Request{
    user?: any
}

const uploader = multer({ storage: multer.diskStorage({}) });

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.render('index');
});

router.get('/home',auth, async (req: CustomRequest, res: Response) => {
    const userFiles = await fileModel.find({
        user:req.user.userId
    })
    res.render('home',{
        files:userFiles
    });
});

router.post('/upload-file',auth, uploader.single('file'), async (req: CustomRequest, res: Response): Promise<any> => {
    try {
        const file = req.file;
        const id = req.user.userId;
        if (!file || !file.path) {
            return res.status(400).json({ errors: 'Please provide a valid file' });
        }

        const result = await uploadFile(file.path);
        if (!result || !result.secure_url) {
            return res.status(500).json({ errors: 'File upload failed',result });
            
        }

        const newFile = await fileModel.create({
             file_url: result.secure_url,
             file_name: file.originalname,
             user: id
             });

        return res.status(200).json({
            success: true,
            msg: "File uploaded successfully",
            url: newFile
        });
    } catch (error : any) {
        console.error('Error uploading file:', error);
        return res.status(500).json({ errors: error.message });
    }
});

router.get('/download/:url', auth, async (req: CustomRequest, res: Response): Promise<any> => {
    try {
        const loggedInUser = req.user.userId;
        const fileUrl = req.params.url;

        // Find the file in the database
        const file = await fileModel.findOne({
            user: loggedInUser,
            file_url: fileUrl
        });

        if (!file) {
            return res.status(404).json({
                success: false,
                message: "File not found or unauthorized access."
            });
        }

        // Fetch the file from the remote server (e.g., Cloudinary)
        const response = await axios.get(file.file_url, { responseType: 'stream' });

        // Set headers for file download
        res.setHeader('Content-Disposition', `attachment; filename="${file.file_name}"`);
        res.setHeader('Content-Type', response.headers['content-type']);

        // Stream the file to the client
        response.data.pipe(res);

        // Handle stream errors
        response.data.on('error', (streamError) => {
            console.error('Stream error:', streamError);
            return res.status(500).json({
                success: false,
                message: 'Error occurred while streaming the file.'
            });
        });

    } catch (error: any) {
        console.error('Error during file download:', error);

        // Handle Axios-specific errors
        if (axios.isAxiosError(error)) {
            return res.status(500).json({
                success: false,
                message: 'Error fetching the file from the remote server.',
                details: error.message
            });
        }

        // Generic fallback for unexpected errors
        return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred while processing your request.',
        });
    }
});

export default router;
