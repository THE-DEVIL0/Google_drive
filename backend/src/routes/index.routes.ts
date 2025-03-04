import express, { Request, Response } from 'express';
import multer from 'multer';
import uploadFile from '../config/upload';
import fileModel from '../models/file.model';

const uploader = multer({ storage: multer.diskStorage({}) });

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.render('index');
});

router.get('/home', (req: Request, res: Response) => {
    res.render('Home');
});

router.post('/upload-file', uploader.single('file'), async (req: Request, res: Response): Promise<any> => {
    try {
        const file = req.file;
        if (!file || !file.path) {
            return res.status(400).json({ errors: 'Please provide a valid file' });
        }

        const result = await uploadFile(file.path);
        if (!result || !result.secure_url) {
            return res.status(500).json({ errors: 'File upload failed',result });
            
        }

        const newFile = await fileModel.create({ file_url: result.secure_url });

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

export default router;
