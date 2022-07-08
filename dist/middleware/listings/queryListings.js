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
exports.queryListings = void 0;
const Listing_1 = require("../../models/Listing");
const User_1 = require("../../models/User");
const queryListings = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let listings = yield Listing_1.Listing.find().sort({ _id: -1 });
        // const data: ListingAttributes[] = listings.map((history) => {
        //     const {accepted, applicants, ... listing} = history
        //     console.log(listing)
        //     return listing
        // })
        const data = yield Promise.all(listings.map((listing) => __awaiter(void 0, void 0, void 0, function* () {
            const { _id, position, type, date, remote, location, tags, description, status } = listing;
            const user = yield User_1.User.findById(listing.org);
            const userData = {
                _id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                affiliation: user.affiliation,
                avatar: user.avatar,
                role: user.role,
            };
            return { _id, org: userData, position, type, date, remote, location, tags, description, status };
        })));
        res.json(data);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.queryListings = queryListings;
