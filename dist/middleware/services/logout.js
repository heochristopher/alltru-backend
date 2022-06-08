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
exports.logout = void 0;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies['auth-token'];
        if (!token)
            return res.status(400).json('You are not signed in');
        res.clearCookie('auth-token').status(200).json('You have successfully logged out');
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.logout = logout;
