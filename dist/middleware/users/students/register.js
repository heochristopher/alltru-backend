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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRegister = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const schemas_1 = require("../../schemas");
const dotenv_1 = __importDefault(require("dotenv"));
const Student_1 = require("../../../models/Student");
const User_1 = require("../../../models/User");
const Role_1 = require("../../../models/enums/Role");
dotenv_1.default.config();
const studentRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield schemas_1.studentJoi.validateAsync(req.body);
        //find an existing user
        let doesExist = yield Student_1.Student.findOne({ email: req.body.email });
        if (doesExist)
            return res.status(400).send("Student already registered.");
        const student = new Student_1.Student(req.body);
        student.password = yield bcryptjs_1.default.hash(req.body.password, 10);
        yield student.save();
        // save in shared collection
        const user = new User_1.User({ email: req.body.email, password: student.password, role: Role_1.Role.Student });
        yield user.save();
        res.status(200).json(`Welcome, ${student.firstName}`);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.studentRegister = studentRegister;
