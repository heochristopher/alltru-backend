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
exports.queryApplicants = void 0;
const Role_1 = require("../../../models/enums/Role");
const Listing_1 = require("../../../models/Listing");
const User_1 = require("../../../models/User");
const queryApplicants = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.payload.role !== Role_1.Role.Org) {
            return res.status(400).json('Access denied.');
        }
        const listing = yield Listing_1.Listing.findById(req.params.id);
        if (listing.org._id !== req.body.payload._id) {
            return res.status(400).json('Access denied.');
        }
        const users = yield User_1.User.find({
            '_id': {
                $in: listing.applicants
            }
        });
        res.json(users);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.queryApplicants = queryApplicants;
