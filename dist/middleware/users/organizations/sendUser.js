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
exports.sendUserOrg = void 0;
const Role_1 = require("../../../models/enums/Role");
const Organization_1 = require("../../../models/Organization");
const sendUserOrg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body.payload;
        const user = yield Organization_1.Org.findById(payload._id);
        const org = {
            _id: user._id,
            email: user.email,
            name: user.name,
            role: Role_1.Role.Org,
            avatar: user.avatar,
            biography: user.biography,
            listings: user.listings
        };
        res.json(org);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.sendUserOrg = sendUserOrg;
