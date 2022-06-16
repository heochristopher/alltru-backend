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
exports.sendUser = void 0;
const Role_1 = require("../../models/enums/Role");
const User_1 = require("../../models/User");
const sendUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body.payload;
        const user = yield User_1.User.findById(payload._id);
        if (user.role === Role_1.Role.Student) {
            const student = {
                _id: user._id,
                email: user.email,
                birthday: user.birthday,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                avatar: user.avatar,
                affiliation: user.affiliation,
                contact: user.contact,
                biography: user.biography,
                resume: user.resume,
                savedListings: user.savedListings,
                appliedListings: user.appliedListings
            };
            return res.json(student);
        }
        else if (user.role === Role_1.Role.Org) {
            const org = {
                _id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                avatar: user.avatar,
                affiliation: user.affiliation,
                contact: user.contact,
                biography: user.biography,
                resume: user.resume,
                listings: user.listings
            };
            return res.json(org);
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.sendUser = sendUser;
