"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const upload_1 = __importDefault(require("../config/upload"));
const file_model_1 = __importDefault(require("../models/file.model"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const axios_1 = __importDefault(require("axios"));
const uploader = (0, multer_1.default)({ storage: multer_1.default.diskStorage({}) });
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.render('index');
});
router.get('/home', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userFiles = yield file_model_1.default.find({
        user: req.user.userId
    });
    res.render('Home', {
        files: userFiles
    });
}));
router.post('/upload-file', auth_1.default, uploader.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.file;
        const id = req.user.userId;
        if (!file || !file.path) {
            return res.status(400).json({ errors: 'Please provide a valid file' });
        }
        const result = yield (0, upload_1.default)(file.path);
        if (!result || !result.secure_url) {
            return res.status(500).json({ errors: 'File upload failed', result });
        }
        const newFile = yield file_model_1.default.create({
            file_url: result.secure_url,
            file_name: file.originalname,
            user: id
        });
        return res.status(200).json({
            success: true,
            msg: "File uploaded successfully",
            url: newFile
        });
    }
    catch (error) {
        console.error('Error uploading file:', error);
        return res.status(500).json({ errors: error.message });
    }
}));
router.get('/download/:url', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loggedInUser = req.user.userId;
    const fileUrl = req.params.url;
    const file = yield file_model_1.default.findOne({
        user: loggedInUser,
        file_url: fileUrl
    });
    if (!file) {
        return res.status(404).json({
            message: "Unauthorized"
        });
    }
    // Fetch the file from Cloudinary (or another storage)
    const response = yield axios_1.default.get(file.file_url, { responseType: 'stream' });
    // Set headers for file download
    res.setHeader('Content-Disposition', `attachment; filename="${file.file_name}"`);
    res.setHeader('Content-Type', response.headers['content-type']);
    // Stream the file to the client
    response.data.pipe(res);
}));
exports.default = router;
