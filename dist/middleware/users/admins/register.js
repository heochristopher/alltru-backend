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
exports.adminRegister = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const schemas_1 = require("../schemas");
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = require("../../../models/User");
const Role_1 = require("../../../models/enums/Role");
dotenv_1.default.config();
const adminRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield schemas_1.adminJoi.validateAsync(req.body);
        //find an existing user
        let doesExist = yield User_1.User.findOne({ email: req.body.email });
        if (doesExist)
            return res.status(400).send("User already registered.");
        const admin = new User_1.User(req.body);
        admin.password = yield bcryptjs_1.default.hash(req.body.password, 10);
        admin.role = Role_1.Role.Admin;
        yield admin.save();
        res.status(200).json(`Welcome, Admin ${admin.firstName}`);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.adminRegister = adminRegister;
