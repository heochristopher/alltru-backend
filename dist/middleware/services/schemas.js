"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userJoi = void 0;
const joi_1 = __importDefault(require("joi"));
// const studentJoi = Joi.object(
//     {
//         firstName: Joi.string().required(),
//         lastName: Joi.string().required(),
//         email: Joi.string().required().email(),
//         school: Joi.string().required(),
//         grade: Joi.string().required(),
//         password: Joi.string().min(6).required()
//     }
// )
// const orgJoi = Joi.object(
//     {
//         name: Joi.string().required(),
//         email: Joi.string().required().email(),
//         password: Joi.string().min(6).required()
//     }
// )
// const adminJoi = Joi.object(
//     {
//         firstName: Joi.string().required(),
//         lastName: Joi.string().required(),
//         email: Joi.string().required().email(),
//         password: Joi.string().min(6).required()
//     }
// )
exports.userJoi = joi_1.default.object({
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    email: joi_1.default.string().required().email(),
    password: joi_1.default.string().min(6).required()
});
