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
exports.closeListing = void 0;
const Role_1 = require("../../models/enums/Role");
const Status_1 = require("../../models/enums/Status");
const Listing_1 = require("../../models/Listing");
const closeListing = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.payload.role === Role_1.Role.Student) {
        return res.status(400).json('Students cannot close listings');
    }
    try {
        const listing = yield Listing_1.Listing.findByIdAndUpdate(req.params.id, { $set: { status: Status_1.Status.Closed } });
        res.status(200).json('Successfully closed listing');
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.closeListing = closeListing;
