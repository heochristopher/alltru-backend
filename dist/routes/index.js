"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
//* IMPORTS
//? services
const requiresAuth_1 = require("../middleware/services/requiresAuth");
const logout_1 = require("../middleware/services/logout");
const sendUser_1 = require("../middleware/services/sendUser");
//? users
//admins
//organizations
//students
//* ROUTES
//? GET REQUESTS
router.get('/sendUser', requiresAuth_1.requiresAuth, sendUser_1.sendUser);
//? POST REQUESTS
router.post('logout', logout_1.logout);
