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
exports.uploadSupplemental = void 0;
const Role_1 = require("../../models/enums/Role");
const Listing_1 = require("../../models/Listing");
const cloudinary_1 = require("cloudinary");
const Status_1 = require("../../models/enums/Status");
const uploadSupplemental = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.payload.role !== Role_1.Role.Student) {
        return res.status(400).json('You cannot apply to listings');
    }
    try {
        const query = req.params.query.split('-');
        const listing = yield Listing_1.Listing.findById(query[0]);
        if (listing.status === Status_1.Status.Closed) {
            return res.status(400).json('This listing is already closed');
        }
        cloudinary_1.v2.uploader.upload_stream({
            folder: 'documents',
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
                yield Listing_1.Listing.findOneAndUpdate({ '_id': query[0], 'applicants': { $elemMatch: { 'student': req.body.payload._id } } }, { $push: { 'applicants.$.supplementals': {
                            answer: image,
                            identifier: parseInt(query[1])
                        } } });
                res.status(200).json('uploaded');
            });
        }
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.uploadSupplemental = uploadSupplemental;
