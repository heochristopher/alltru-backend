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
exports.findStudent = void 0;
const User_1 = require("../../../models/User");
const findStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = req.params.query.split(' ');
        if (params.length === 0) {
            return res.status(400).json('Invalid search');
        }
        if (params.length === 1) {
            let users = yield User_1.User.find({
                firstName: params[0]
            });
            return res.json(users);
        }
        let users = yield User_1.User.find({
            $and: [
                { firstName: params[0] },
                { lastName: params[1] }
            ]
        });
        return res.json(users);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.findStudent = findStudent;
