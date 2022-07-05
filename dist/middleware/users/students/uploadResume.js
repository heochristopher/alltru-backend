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
exports.uploadResume = void 0;
const User_1 = require("../../../models/User");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cloudinary_1 = require("cloudinary");
const Role_1 = require("../../../models/enums/Role");
const uploadResume = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.payload.role !== Role_1.Role.Student) {
        return res.status(400).json('Only students can upload resumes');
    }
    try {
        if (req.file.mimetype.split('/')[1] !== 'pdf') {
            return res.status(400).json('Please upload a .pdf file only');
        }
        cloudinary_1.v2.uploader.upload_stream({
            folder: 'resumes',
            format: 'pdf',
            quality: 'auto',
            fetch_format: 'auto',
        }, upload)
            .end(req.file.buffer);
        function upload(error, result) {
            return __awaiter(this, void 0, void 0, function* () {
                if (error) {
                    return res.status(400).json('Server Error');
                }
                const image = result.secure_url;
                yield User_1.User.findByIdAndUpdate(req.body.payload._id, { $set: { resume: image } });
                res.status(200).json(result);
            });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.uploadResume = uploadResume;
