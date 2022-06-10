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
exports.sendOtherStudent = void 0;
const Role_1 = require("../../../models/enums/Role");
const Student_1 = require("../../../models/Student");
const sendOtherStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield Student_1.Student.findById(req.params.id);
        const student = {
            _id: user._id,
            email: user.email,
            grade: user.grade,
            firstName: user.firstName,
            lastName: user.lastName,
            role: Role_1.Role.Student,
            avatar: user.avatar,
            school: user.school,
            contact: user.contact,
            biography: user.biography,
            resume: user.resume,
        };
        res.json(student);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.sendOtherStudent = sendOtherStudent;
