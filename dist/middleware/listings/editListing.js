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
exports.editListing = void 0;
const Role_1 = require("../../models/enums/Role");
const Listing_1 = require("../../models/Listing");
const editListing = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.payload.role === Role_1.Role.Student) {
        return res.status(400).json('Students cannot close listings');
    }
    try {
        if (req.body.description) {
            yield Listing_1.Listing.findByIdAndUpdate(req.body.id, { $set: { description: req.body.description } });
        }
        if (req.body.supplementals.length) {
            // req.body.supplementals.forEach(async(e: any) => {
            //     await Listing.findOneAndUpdate({'_id': req.body.id, 'supplementals': {$elemMatch: {'identifier': e.identifier}}},
            //     {$set: {'supplementals.$.prompt': {
            //         answer: e.prompt,
            //         identifier: e.identifier
            //     }}})
            // });
            yield Promise.all(req.body.supplementals.map((change) => __awaiter(void 0, void 0, void 0, function* () {
                yield Listing_1.Listing.findOneAndUpdate({ '_id': req.body.id, 'supplementals': { $elemMatch: { 'identifier': change.identifier } } }, { $set: { 'supplementals.$.prompt': {
                            answer: change.prompt,
                            identifier: change.identifier
                        } } });
            })));
        }
        res.status(200).json('Successfully edited listing');
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.editListing = editListing;
