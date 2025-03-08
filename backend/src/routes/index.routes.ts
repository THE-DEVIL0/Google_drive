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
    res.render('Home',{
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

router.get('/download/:url',auth, async (req: CustomRequest, res: Response): Promise<any> =>{
   const loggedInUser = req.user.userId;
   const fileUrl= req.params.url;
   const file = await fileModel.findOne({
    user: loggedInUser,
    file_url: fileUrl
   }) 

   if(!file){
    return res.status(404).json({
        message: "Unauthorized"
    })
   }

     // Fetch the file from Cloudinary (or another storage)
     const response = await axios.get(file.file_url, { responseType: 'stream' });

     // Set headers for file download
     res.setHeader('Content-Disposition', `attachment; filename="${file.file_name}"`);
     res.setHeader('Content-Type', response.headers['content-type']);

     // Stream the file to the client
     response.data.pipe(res);



})
export default router;
