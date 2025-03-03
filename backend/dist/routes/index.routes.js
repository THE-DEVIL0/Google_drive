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
const upload_1 = __importDefault(require("../config/upload"));
const multer_1 = __importDefault(require("multer"));
const file_model_1 = __importDefault(require("../models/file.model"));
const uploader = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({}),
    limits: { fileSize: 1000000 },
});
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.render('index');
});
router.get('/home', (req, res) => {
    res.render('Home');
});
router.post('/upload-file', uploader.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.file;
        if (!file) {
            res.status(400).json({
                errors: 'Please provide a file'
            });
            return;
        }
        const result = yield (0, upload_1.default)(file.path);
        const newFile = yield file_model_1.default.create({
            file_url: result === null || result === void 0 ? void 0 : result.secure_url
        });
        res.send({ success: true, msg: "File uploaded successfully", url: newFile });
    }
    catch (error) {
        console.log(error.message);
    }
}));
exports.default = router;
