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
exports.resetPassword = exports.verifyResetCode = exports.requestNewPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = require("../../models/User");
const mail_1 = require("./mail");
dotenv_1.default.config();
//route must be protected — can only be accessed if verification code matches
//? route for password change request
// once user requests password change, send them an email with random 6-digit verification code
// this verification code should create a new object in the user model that is stored like {code: 123456, verified: false}
// this may be called again if user didn't receive their verification code — in this case, update the reset password object instead of creating a new one, with a new verification code
//? route for verification
// user inputs the code — if it matches, change verified to true
//? route for resetting password
// can only be accessed if reset password object exists & verified is true
// takes in new password with requirements (6 character minimum)
//update user's password
//set verification code to null and verified to false
const requestNewPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body.payload;
        const verificationCode = Math.floor(100000 + Math.random() * 900000);
        const hashedCode = yield bcryptjs_1.default.hash(verificationCode.toString(), 10);
        yield User_1.User.findByIdAndUpdate(user._id, {
            $set: {
                resetPassword: {
                    code: hashedCode,
                    verified: false
                }
            }
        });
        res.status(200).json('You have received an email with a verification code');
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: req.body.email,
            subject: `${verificationCode} is your Alltru password reset code`,
            html: `We've received a request to reset your password.

            Enter the following password reset code:

            ${verificationCode}

            Don't know where to enter the code? Click <a href="www.alltru.app/listings">here</a>

            If you didn't make this request, just ignore this message.

            Thanks,
            The Alltru team
            `
        };
        mail_1.transport.sendMail(mailOptions);
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.requestNewPassword = requestNewPassword;
const verifyResetCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body.payload;
        const existingUser = yield User_1.User.findById(user._id);
        const validCode = bcryptjs_1.default.compareSync(req.body.code.toString(), existingUser.resetPassword.code);
        if (!validCode) {
            return res.status(400).json('Invalid code');
        }
        yield User_1.User.findByIdAndUpdate(user._id, {
            $set: {
                resetPassword: {
                    code: existingUser.resetPassword.code,
                    verified: true
                }
            }
        });
        res.status(200).json();
    }
    catch (error) {
        console.log('asdf');
        res.status(400).json(error);
    }
});
exports.verifyResetCode = verifyResetCode;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body.payload;
        if (req.body.password1 !== req.body.password2) {
            return res.status(400).json('Passwords do not match.');
        }
        if (req.body.password1.length < 6) {
            return res.status(400).json('Your password must be at least 6 characters long.');
        }
        const existingUser = yield User_1.User.findById(user._id);
        if (!existingUser.resetPassword.verified) {
            return res.status(400).json('You do not have access to this service.');
        }
        const hashedPassword = yield bcryptjs_1.default.hash(req.body.password1, 10);
        yield User_1.User.findByIdAndUpdate(user._id, {
            $set: {
                password: hashedPassword,
                resetPassword: {
                    code: null,
                    verified: false
                }
            }
        });
        res.status(200).json('Your password has successfully been reset.');
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.resetPassword = resetPassword;
