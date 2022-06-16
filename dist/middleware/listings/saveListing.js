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
exports.saveListing = void 0;
const Role_1 = require("../../models/enums/Role");
const User_1 = require("../../models/User");
const saveListing = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.payload.role !== Role_1.Role.Student) {
        return res.status(400).json('You cannot save listings');
    }
    try {
        yield User_1.User.findByIdAndUpdate(req.body.payload._id, { $push: { savedListings: req.params.id } });
        res.status(200).send("Saved listing.");
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.saveListing = saveListing;
