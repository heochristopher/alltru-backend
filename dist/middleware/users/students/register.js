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
const schemas_1 = require("../schemas");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = require("../../../models/User");
const Role_1 = require("../../../models/enums/Role");
const mail_1 = require("../../services/mail");
dotenv_1.default.config();
const studentRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield schemas_1.studentJoi.validateAsync(req.body);
        //find an existing user
        let doesExist = yield User_1.User.findOne({ email: req.body.email });
        if (doesExist)
            return res.status(400).send("Student already registered.");
        const student = new User_1.User(req.body);
        student.password = yield bcryptjs_1.default.hash(req.body.password, 10);
        student.role = Role_1.Role.Student;
        yield student.save();
        const payload = {
            _id: student._id,
            email: student.email,
            firstName: student.firstName,
            lastName: student.lastName,
            role: student.role,
            affiliation: student.affiliation,
            avatar: student.avatar,
            birthday: student.birthday
        };
        const userToken = jsonwebtoken_1.default.sign(payload, process.env.PRIVATEKEY);
        if (req.cookies['auth-token']) {
            res.clearCookie('auth-token');
        }
        res.cookie('auth-token', userToken, {
            //lasts 2 weeks
            expires: new Date(new Date().getTime() + 60 * 60 * 24 * 7 * 1000 * 2),
            secure: true,
            sameSite: 'none',
            httpOnly: true
        }).status(200).json(`Welcome to Alltru, ${student.firstName}`);
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: student.email,
            subject: `Welcome to Alltru, ${student.firstName}`,
            html: `We're so excited to have you on board, ${student.firstName}. Opportunities await <a href="www.alltru.app/listings">here</a>`
        };
        mail_1.transport.sendMail(mailOptions, (error) => {
            if (error) {
                return console.log(error);
            }
            return console.log('sent');
        });
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.studentRegister = studentRegister;
