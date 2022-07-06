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
exports.validateToken = void 0;
const User_1 = require("../../models/User");
const validateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findById(req.body.payload._id);
        const payload = {
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            affiliation: user.affiliation,
            avatar: user.avatar,
            role: user.role,
        };
        res.send(payload);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.validateToken = validateToken;
