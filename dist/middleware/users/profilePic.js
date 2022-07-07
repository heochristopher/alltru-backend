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
exports.profilePic = void 0;
const User_1 = require("../../models/User");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cloudinary_1 = require("cloudinary");
const profilePic = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileTypes = ['jpg', 'jpeg', 'png', 'heic', 'pdf'];
        if (!fileTypes.includes(req.file.mimetype.split('/')[1])) {
            return res.status(400).json('Please upload a .jpg, .jpeg, .heic, .pdf or .png file only');
        }
        cloudinary_1.v2.uploader.upload_stream({
            folder: 'profiles',
            format: 'jpg',
            quality: 'auto',
            fetch_format: 'auto',
            width: 150,
            height: 150,
            radius: 'max',
            crop: 'fill',
            gravity: 'face'
        }, upload).end(req.file.buffer);
        function upload(error, result) {
            return __awaiter(this, void 0, void 0, function* () {
                if (error) {
                    return res.status(400).json('Server Error');
                }
                const image = result.secure_url;
                yield User_1.User.findByIdAndUpdate(req.body.payload._id, { $set: { avatar: image } });
                res.status(200).json('Successfully updated profile picture');
            });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.profilePic = profilePic;
