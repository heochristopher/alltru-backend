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
exports.apply = void 0;
const Role_1 = require("../../models/enums/Role");
const User_1 = require("../../models/User");
const Listing_1 = require("../../models/Listing");
const apply = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.payload.role !== Role_1.Role.Student) {
        return res.status(400).json('You cannot apply to listings');
    }
    try {
        const user = req.body.payload;
        const applicant = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            affiliation: user.affiliation,
            email: user.email,
            grade: user.grade,
            role: user.role,
            avatar: user.avatar,
            note: req.body.note
        };
        yield User_1.User.findByIdAndUpdate(user._id, { $push: { appliedListings: req.params.id } });
        yield Listing_1.Listing.findByIdAndUpdate(req.params.id, { $push: { applicants: applicant } });
        res.status(200).send("Application Submitted");
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.apply = apply;
