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
exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
const schema_1 = require("./schema");
const User_1 = require("../../models/User");
dotenv_1.default.config();
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield schema_1.userJoi.validateAsync(req.body);
        //find an existing user
        let doesExist = yield User_1.User.findOne({ email: req.body.email });
        if (doesExist)
            return res.status(400).send("User already registered.");
        const user = new User_1.User(req.body);
        user.password = yield bcryptjs_1.default.hash(req.body.password, 10);
        yield user.save();
        res.status(200).json(`Welcome, ${user.firstName}`);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.register = register;
