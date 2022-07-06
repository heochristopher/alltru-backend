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
exports.findListing = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Listing_1 = require("../../models/Listing");
const User_1 = require("../../models/User");
const findListing = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const param = req.params.q;
        const listing = yield Listing_1.Listing.findById(param);
        const org = yield User_1.User.findById(listing.org);
        const orgData = {
            _id: org._id,
            email: org.email,
            firstName: org.firstName,
            lastName: org.lastName,
            affiliation: org.affiliation,
            avatar: org.avatar,
            role: org.role,
        };
        if (!req.cookies['auth-token']) {
            const data = {
                _id: listing._id,
                org: orgData,
                position: listing.position,
                type: listing.type,
                date: listing.date,
                remote: listing.remote,
                tags: listing.tags,
                description: listing.description,
                location: listing.location
            };
            return res.json(data);
        }
        const user = jsonwebtoken_1.default.verify(req.cookies['auth-token'], process.env.PRIVATEKEY);
        if (user._id !== org._id.toString()) {
            const data = {
                _id: listing._id,
                org: orgData,
                position: listing.position,
                type: listing.type,
                date: listing.date,
                remote: listing.remote,
                tags: listing.tags,
                description: listing.description,
                location: listing.location
            };
            return res.json(data);
        }
        else if (user._id === org._id.toString()) {
            const data = {
                _id: listing._id,
                org: org,
                position: listing.position,
                type: listing.type,
                date: listing.date,
                remote: listing.remote,
                tags: listing.tags,
                description: listing.description,
                location: listing.location,
                applicants: listing.applicants,
                accepted: listing.accepted,
            };
            return res.json(data);
        }
        res.json(listing);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.findListing = findListing;
