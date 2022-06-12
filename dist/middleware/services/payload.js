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
exports.payloadType = void 0;
const Admin_1 = require("../../models/Admin");
const Role_1 = require("../../models/enums/Role");
const Organization_1 = require("../../models/Organization");
const Student_1 = require("../../models/Student");
function payloadType(existingUser) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (existingUser.role === Role_1.Role.Student) {
                const user = yield Student_1.Student.findOne({ email: existingUser.email });
                const payload = {
                    _id: user._id,
                    email: user.email,
                    grade: user.grade,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: Role_1.Role.Student,
                    avatar: user.avatar
                };
                return payload;
            }
            else if (existingUser.role === Role_1.Role.Org) {
                const user = yield Organization_1.Org.findOne({ email: existingUser.email });
                const payload = {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                    role: Role_1.Role.Org,
                    avatar: user.avatar,
                    biography: user.biography
                };
                return payload;
            }
            else if (existingUser.role === Role_1.Role.Admin) {
                const user = yield Admin_1.Admin.findOne({ email: existingUser.email });
                const payload = {
                    _id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: Role_1.Role.Admin,
                    avatar: user.avatar,
                };
                return payload;
            }
        }
        catch (error) {
            return error;
        }
    });
}
exports.payloadType = payloadType;
