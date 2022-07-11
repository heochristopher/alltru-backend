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
exports.deleteResume = void 0;
const User_1 = require("../../../models/User");
const Role_1 = require("../../../models/enums/Role");
const deleteResume = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.payload.role !== Role_1.Role.Student) {
        return res.status(400).json('Only students can delete resumes');
    }
    try {
        yield User_1.User.findByIdAndUpdate(req.body.payload._id, { $set: { resume: null } });
        res.status(200).json('Successfully deleted resume');
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.deleteResume = deleteResume;
