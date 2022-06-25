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
const Role_1 = require("../../../models/enums/Role");
const User_1 = require("../../../models/User");
const findStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const param = req.params.q;
        const student = yield User_1.User.findById(param);
        if (student.role !== Role_1.Role.Student) {
            return res.status(400).json('This user is not a student');
        }
        res.json(student);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.findStudent = findStudent;
