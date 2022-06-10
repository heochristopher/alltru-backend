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
exports.orgLogin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Organization_1 = require("../../../models/Organization");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
const Role_1 = require("../../../models/enums/Role");
dotenv_1.default.config();
const orgLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const existingUser = yield Organization_1.Org.findOne({ email });
        if (!existingUser) {
            return res.status(400).json('There is no user registered under this email. Meant to register?');
        }
        const validPassword = bcryptjs_1.default.compareSync(password, existingUser.password);
        if (!validPassword) {
            return res.status(400).json('Invalid Password');
        }
        const payload = {
            _id: existingUser._id,
            email: existingUser.email,
            name: existingUser.name,
            role: Role_1.Role.Org,
            avatar: existingUser.avatar,
            biography: existingUser.biography
        };
        const userToken = jsonwebtoken_1.default.sign(payload, process.env.PRIVATEKEY);
        if (req.cookies['auth-token']) {
            res.clearCookie('auth-token');
        }
        res.cookie('auth-token', userToken, {
            expires: new Date(new Date().getTime() + 60 * 60 * 24 * 7 * 1000),
            secure: true,
            sameSite: 'none',
            httpOnly: true
        }).json(`Welcome, ${payload.name}`);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.orgLogin = orgLogin;
