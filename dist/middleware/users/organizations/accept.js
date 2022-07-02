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
exports.accept = void 0;
const Role_1 = require("../../../models/enums/Role");
const Listing_1 = require("../../../models/Listing");
const User_1 = require("../../../models/User");
const accept = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.payload.role !== Role_1.Role.Student) {
        return res.status(400).json('You cannot access this resource');
    }
    try {
        // const user = User.findById(req.body.payload._id)
        const params = req.params.q.split('&');
        const student = yield User_1.User.findById(params[1]);
        yield Listing_1.Listing.findByIdAndUpdate(params[0], {
            $push: { accepted: student }
        });
        res.status(200).send(`Accepted student ${student.firstName} ${student.lastName}`);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.accept = accept;
