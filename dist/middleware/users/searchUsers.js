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
exports.searchUsers = void 0;
const Listing_1 = require("../../models/Listing");
const searchUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = req.params.query;
        const users = yield Listing_1.Listing.aggregate([
            {
                $search: {
                    index: 'users',
                    text: {
                        query: params,
                        path: "affiliation"
                    }
                }
            }
        ]);
        res.json(users);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.searchUsers = searchUsers;
