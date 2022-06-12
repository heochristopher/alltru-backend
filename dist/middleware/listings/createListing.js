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
exports.createListing = void 0;
const Organization_1 = require("../../models/Organization");
const Role_1 = require("../../models/enums/Role");
const Listing_1 = require("../../models/Listing");
const createListing = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.payload.role === Role_1.Role.Student) {
        return res.status(400).json('Students cannot create events');
    }
    console.log(req.body);
    if (req.body.remote) {
        req.body.location = null;
        req.body.zip = null;
    }
    if (req.body.zip != null) {
        if (req.body.zip.toString().length != 5)
            return res.status(200).json(`${req.body.zip} is not a valid zip code.`);
    }
    try {
        const listing = new Listing_1.Listing({
            org: req.body.payload,
            position: req.body.position,
            type: req.body.type,
            date: Date.now(),
            remote: req.body.remote,
            location: req.body.location,
            zip: req.body.zip,
            description: req.body.description,
            tags: req.body.tags
        });
        yield listing.save();
        yield Organization_1.Org.findOneAndUpdate({
            _id: req.body.payload._id
        }, { $push: { listings: listing } });
        res.status(200).send(listing);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.createListing = createListing;
