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
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadResume = void 0;
const User_1 = require("../../../models/User");
const cloudinary_1 = require("cloudinary");
const uploadResume = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findById(req.body.payload._id);
        const imageFile = req.file.path;
        const result = yield cloudinary_1.v2.uploader.upload(imageFile, {
            folder: 'profiles',
            format: 'jpg',
            quality: 'auto',
            fetch_format: 'auto',
            width: 150,
            height: 150,
            radius: 'max',
            crop: 'fill',
            gravity: 'face'
        });
        const image = result.secure_url;
        yield User_1.User.updateOne({ '_id': req.body.payload._id }, { $set: { avatar: image } });
        res.json(result);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.uploadResume = uploadResume;
