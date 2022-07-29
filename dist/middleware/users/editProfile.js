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
exports.editProfile = void 0;
const User_1 = require("../../models/User");
const editProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.biography) {
            yield User_1.User.findByIdAndUpdate(req.body.payload._id, { biography: req.body.biography });
        }
        if (req.body.website) {
            yield User_1.User.findByIdAndUpdate(req.body.payload._id, { website: req.body.website });
        }
        if (req.body.linkedIn || req.body.github) {
            const user = yield User_1.User.findById(req.body.payload._id);
            if (req.body.linkedIn && !req.body.github) {
                yield User_1.User.findByIdAndUpdate(req.body.payload._id, { contact: { linkedIn: req.body.linkedIn, github: user.contact.github } });
            }
            else if (req.body.github && !req.body.linkedIn) {
                yield User_1.User.findByIdAndUpdate(req.body.payload._id, { contact: { github: req.body.github, linkedIn: user.contact.linkedIn } });
            }
            else if (req.body.github && req.body.linkedIn) {
                yield User_1.User.findByIdAndUpdate(req.body.payload._id, { contact: { github: req.body.github, linkedIn: req.body.linkedIn } });
            }
        }
        res.status(200).json('Successfully updated profile');
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.editProfile = editProfile;
