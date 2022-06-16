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
exports.sendOther = void 0;
const User_1 = require("../../models/User");
const sendOther = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield User_1.User.findById(req.params.id);
        const user = {
            _id: existingUser._id,
            email: existingUser.email,
            birthday: existingUser.birthday,
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            role: existingUser.role,
            avatar: existingUser.avatar,
            affiliation: existingUser.affiliation,
            contact: existingUser.contact,
            biography: existingUser.biography,
            resume: existingUser.resume,
            createdListings: existingUser.createdListings,
        };
        res.json(user);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.sendOther = sendOther;
