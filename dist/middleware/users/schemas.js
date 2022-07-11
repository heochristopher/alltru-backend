"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminJoi = exports.orgJoi = exports.studentJoi = void 0;
const joi_1 = __importDefault(require("joi"));
const studentJoi = joi_1.default.object({
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    email: joi_1.default.string().required().email(),
    affiliation: joi_1.default.string().required(),
    birthday: joi_1.default.date().required(),
    password: joi_1.default.string().min(6).required()
});
exports.studentJoi = studentJoi;
const orgJoi = joi_1.default.object({
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    email: joi_1.default.string().required().email(),
    password: joi_1.default.string().min(6).required(),
    affiliation: joi_1.default.string().required(),
});
exports.orgJoi = orgJoi;
const adminJoi = joi_1.default.object({
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    email: joi_1.default.string().required().email(),
    password: joi_1.default.string().min(6).required()
});
exports.adminJoi = adminJoi;
