import express, { Request, Response } from 'express';
import multer from 'multer';
import uploadFile from '../config/upload.js';
import fileModel from '../models/file.model.js';
import auth from '../middlewares/auth.js';
import axios from "axios"
import { v2 as cloudinary } from 'cloudinary';

interface CustomRequest extends Request{
    user?: any
}

const uploader = multer({ storage: multer.diskStorage({}) });

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.render('index');
});
router.get('/privacy', (req: Request, res : Response)=>{
    res.render('Legal/privacy')
})

router.get('/terms', (req: Request, res : Response)=>{
    res.render('Legal/terms')
})

router.get('/practice' , (req,res)=>{
    res.render('practice')
})

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

        res.redirect('/home')
    } catch (error : any) {
        console.error('Error uploading file:', error);
        return res.status(500).json({ errors: error.message });
    }
});

router.get('/download', auth, async (req:any, res:any) => {
    try {
        const loggedInUser = req.user.userId;
        const fileUrl = req.query.url as string;

        if (!fileUrl) {
            return res.status(400).json({ message: 'Missing file URL' });
        }

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

        // ✅ If the file is a PDF and wrongly stored in /image/, fix to /raw/
        let actualFileUrl = file.file_url;
        if (
            file.file_url.includes('/image/upload/') &&
            file.file_name.toLowerCase().endsWith('.pdf')
        ) {
            actualFileUrl = file.file_url.replace('/image/upload/', '/raw/upload/');
        }

        const cloudinaryResponse = await axios.get(actualFileUrl, {
            responseType: 'stream'
        });

        res.setHeader('Content-Disposition', `attachment; filename="${file.file_name}"`);
        res.setHeader('Content-Type', cloudinaryResponse.headers['content-type'] || 'application/octet-stream');

        cloudinaryResponse.data.pipe(res);

        cloudinaryResponse.data.on('error', (streamError: any) => {
            console.error('Stream error:', streamError);
            if (!res.headersSent) {
                res.status(500).json({
                    success: false,
                    message: 'Error occurred while streaming the file.'
                });
            }
        });

    } catch (error: any) {
        console.error('Error during file download:', error);

        if (axios.isAxiosError(error)) {
            return res.status(500).json({
                success: false,
                message: 'Error fetching the file from the remote server.',
                details: error.message
            });
        }

        return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred while processing your request.',
        });
    }
});



router.post('/delete', auth, async (req: any, res: any) => {
  try {
    const userId = req.user.userId;
    const fileUrl = req.body.url;

    if (!fileUrl) {
      return res.status(400).json({ message: 'Missing file URL' });
    }

    const file = await fileModel.findOne({ user: userId, file_url: fileUrl });

    if (!file) {
      return res.status(404).json({ message: 'File not found or unauthorized.' });
    }

    // Extract public_id from URL
    const fileName = file.file_url.split('/').pop()?.split('.')[0]; // without extension
    const isRaw = ['pdf', 'docx', 'zip'].includes(file.file_name.split('.').pop()?.toLowerCase() || '');
    const resourceType = isRaw ? 'raw' : 'image';

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(`upload/${fileName}`, {
      resource_type: resourceType,
    });

    // Delete from MongoDB
    await fileModel.deleteOne({ _id: file._id });

    res.redirect('/home');
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: 'Error deleting file.' });
  }
});


router.post('/logout', (req, res) => {
    res.clearCookie('token'); // Clear JWT cookie
    res.redirect('/');
  });
  
export default router;
