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
exports.filterListings = void 0;
const Listing_1 = require("../../models/Listing");
const User_1 = require("../../models/User");
const filterListings = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params.q === 'all') {
            const listings = yield Listing_1.Listing.find().sort({ _id: -1 });
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
            return res.json(data);
        }
        const params = req.params.q.split('&');
        const searchQuery = [];
        params.forEach((param) => {
            const arg = param.split('=');
            if (arg[1] === 'true') {
                arg[1] = true;
            }
            if (arg[1] === 'false') {
                arg[1] = false;
            }
            const option = {};
            option[arg[0]] = arg[1];
            searchQuery.push(option);
        });
        const listings = yield Listing_1.Listing.find({
            $and: searchQuery
        }).sort({ _id: -1 });
        if (listings.length === 0)
            return res.status(400).json('We could not find any listings matching your options');
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
exports.filterListings = filterListings;
