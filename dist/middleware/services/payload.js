"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.payloadType = void 0;
const Role_1 = require("../../models/enums/Role");
function payloadType(user) {
    if (user.role === Role_1.Role.Student) {
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
    else if (user.role === Role_1.Role.Org) {
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
    else if (user.role === Role_1.Role.Admin) {
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
exports.payloadType = payloadType;
