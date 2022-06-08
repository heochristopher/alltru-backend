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
exports.userJoi = void 0;
const joi_1 = __importDefault(require("joi"));
const userJoi = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const joiSchema = joi_1.default.object({
        firstName: joi_1.default.string().required(),
        lastName: joi_1.default.string().required(),
        email: joi_1.default.string().required().email(),
        password: joi_1.default.string().min(6).required()
    });
    try {
        yield joiSchema.validateAsync(req.body);
        next();
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.userJoi = userJoi;
